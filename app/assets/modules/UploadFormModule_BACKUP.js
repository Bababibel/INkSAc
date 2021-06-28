/*
##########################################################################
#  Form module to upload files and post a request. WEB compatible ONLY ! #
##########################################################################
*/

import axios from 'axios';
import React,{Component, useState} from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { globalColors, globalStyles } from "../globals/globalStyles";
import { computeDateTimeForSql } from '../tools/dateConverter';
import List from '../classes/List';
import constants from '../globals/constants';
import GoBackModule from './GoBackModule';


const currDate = new Date();
const futDate = new Date(currDate.setDate(currDate.getDate() + 7));

class UploadForm extends Component {

    deadline = computeDateTimeForSql(currDate, currDate); // computed with date + time
    delivery = computeDateTimeForSql(futDate, futDate); // computed with date + time

	state = {
	    selectedFile: null,
        userLists: [],
        fileName: "Fichier",
        color: 0,
        stapple: 0,
        recto_verso: 1,
        format: "A4",
        nb_per_page: 1,

        userList: "",
        
        deadline_date: currDate,
        deadline_time: currDate,
        
        delivery_date: futDate,
        delivery_time: futDate,
        comment: "",
        title: "",
        hidden: 0,

        error: "",
	};
    // File form properties
    handleColorChange = (e) => { this.setState({color: e.target.value});}
    handleStappleChange = (e) => { this.setState({stapple: e.target.value});}
    handleR_VChange = (e) => { this.setState({recto_verso: e.target.value});}
    handleFormatChange = (e) => { this.setState({format: e.target.value});}
    handleNbPerPageChange = (e) => { this.setState({nb_per_page: e.target.value});}
    // Request form properties
    handleListChange = (e) => { this.setState({userList: e.target.value}); console.log(this.state.userList)}
    handleDeadlineDateChange = (e) => { this.setState({deadline_date: e}); this.deadline = computeDateTimeForSql(this.state.deadline_date, this.state.deadline_time); console.log(this.deadline)}
    handleDeadlineTimeChange = (e) => { this.setState({deadline_time: e}); this.deadline = computeDateTimeForSql(this.state.deadline_date, this.state.deadline_time);console.log(this.deadline)}
    handleDeliveryDateChange = (e) => { this.setState({delivery_date: e}); this.delivery = computeDateTimeForSql(this.state.delivery_date, this.state.delivery_time);console.log(this.delivery)}
    handleDeliveryTimeChange = (e) => { this.setState({delivery_time: e}); this.delivery = computeDateTimeForSql(this.state.delivery_date, this.state.delivery_time);console.log(this.delivery)}
    handleCommentChange = (e) => { this.setState({comment: e.target.value});}
    handleTitleChange = (e) => { this.setState({title: e.target.value});}
    handleHiddenChange = (e) => { this.setState({hidden: e.target.value});}
    setFileName = (e) => { this.setState({ fileName: e.target.value });}
    setError = (msg) => { this.setState({ error: msg }) }


    
    useGetLists = () => (() => {
        this.getLists();
      }, [null]);

    getLists = () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let lists = [];
                let data = response.data.data;
                lists.push(new List(0, 'Selectionnez une liste',0 , computeDateTimeForSql(currDate, currDate), ""));
                data.forEach(e => {
                    lists.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
                this.setState({ userLists : lists })
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
        return null;
    }

    formSubmitted = () => {
        if (this.state.error == "") this.props.navigation.goBack();
        else {
            this.setError("Coucou Baptiste, tu as oublié ton cerveau entre deux lignes de Javascript. Si un utilisateur voit ça, vous avez le droit de l'insulter. Cordialement, Baptiste, le 25/06/2021.")
            console.log(error)
        }
    }

	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0] });
	    this.setState({ fileName: event.target.files[0].name });
	};

    
	
	onFileUpload = async () => {
        this.setError("");
        const fileFormData = new FormData();
        // Create the post request to grab data from $_POST['file] in the php server
        fileFormData.append("file",
            this.state.selectedFile,
            this.state.selectedFile.name,   
        );
        axios.post(constants.uploadUrl, fileFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            // Grab path from return field
            if ('path' in response.data) {
                let path = response.data.path;
                let createFileFormData = new FormData();
                // UPLOADING FILE
                createFileFormData.append('name', this.state.selectedFile.name);
                createFileFormData.append('path', path);
                createFileFormData.append('color', this.state.color);
                createFileFormData.append('stapple', this.state.stapple);
                createFileFormData.append('format', this.state.format);
                createFileFormData.append('recto_verso', this.state.recto_verso);
                createFileFormData.append('nb_per_page', this.state.nb_per_page);
                // Use API to create the File in database with the path
                axios.post(constants.postFile, createFileFormData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })
                .then(response => {
                    if ('message' in response.data) {
                        console.log("File creating request: " + response.data.message);
                        uploadRequest(path);
                    }
                    else {
                        Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
                    }
                })
            }
            else if ('message' in response.data) {
                this.setError(response.data.message);
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        });
	};

    uploadRequest = async (file_path) => {
        let createRequestFormData = new FormData();
        createRequestFormData.append('delivery_date', this.delivery);
        createRequestFormData.append('deadline', this.deadline);
        createRequestFormData.append('author', constants.globalUser.id);
        createRequestFormData.append('title', this.state.title);
        createRequestFormData.append('comment', this.state.comment);
        createRequestFormData.append('hidden', this.state.hidden);
        console.log([...createRequestFormData])
        // POSTING REQUEST
        axios.post(constants.postRequest, createRequestFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            if ('id' in response.data) {
                console.log("Request creation: " + response.data.message);
                let request_id = response.data.id;
                let createLinkToFileData = new FormData();
                createLinkToFileData.append('request_id', request_id);
                createLinkToFileData.append('file_path', file_path);
                // POSTING LINK BEWTEEN FILE AND REQUEST
                axios.post(constants.addFileToRequest, createLinkToFileData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })
                .then(response => {
                    console.log("Link between file and request: " + response.data.message);
                    if ('message' in response.data) {
                        this.linkListToRequest(request_id);
                    }
                    else {
                        this.setError('Internal error. Please try again or contact the support team.');
                        this.setError("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.")

                    }
                })
            }
            else {
                this.setError('Unable to post request and get its id: '+ response.data.message);
            }
        })
    };

    linkListToRequest = async (request_id) => {
        let myForm = document.getElementById('requestData');
        let createRequestFormData = new FormData(myForm);
        createRequestFormData.append('list_name', this.state.userList);
        createRequestFormData.append('request_id', request_id);
        // POSTING LINK BETWEEN LIST AND REQUEST
        axios.post(constants.addListToRequest, createRequestFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            if ('error' in response.data) {
                if (!response.data.error) {
                    this.formSubmitted()
                }
                else {
                    console.log('Request to link the list sent: ' + response.data.message);
                    this.setError(response.data.message)
                    console.log(this.state.error);
                }
            }
            else {
                this.setError('Internal error during the link between the file and the request.');
            }
        })
    };


    fileForm = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <form id="fileData" style={styles.fileForm}>
                        <label>Titre du fichier<br/>
                            <input type="text" name="fileName" value={this.state.fileName} onChange={this.setFileName} style={styles.input}/> <br/>
                        </label>
                        <label>Couleur
                            <input type="radio" name="color" value="0" onChange={this.handleColorChange} checked={this.state.color==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="color" value="1" onChange={this.handleColorChange} checked={this.state.color==1}style={styles.smallInput}/><label>Oui</label>
                        </label><br/>

                        <label>Recto verso
                            <input type="radio" name="recto_verso" value="0" onChange={this.handleR_VChange} checked={this.state.recto_verso==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="recto_verso" value="1" onChange={this.handleR_VChange} checked={this.state.recto_verso==1} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <label>Format 
                            <select type="text" name="format" list="nbList" style={styles.smallInput} onChange={this.handleFormatChange}>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="A2">A2</option>
                            </select>
                        </label><br/>
                        <label>Agrafes
                            <input type="radio" name="stapple" value="0" onChange={this.handleStappleChange} checked={this.state.stapple==0} style={styles.smallInput}/><label>0</label>
                            <input type="radio" name="stapple" value="1" onChange={this.handleStappleChange} checked={this.state.stapple==1} style={styles.smallInput}/><label>1</label>
                            <input type="radio" name="stapple" value="2" onChange={this.handleStappleChange} checked={this.state.stapple==2} style={styles.smallInput}/><label>2</label>
                        </label><br/>
                        <label>Nombre d'éléments par page (exemple: 4 diapositives par page)<br/>
                            <select type="text" name="nb_per_page" style={styles.smallInput} onChange={this.handleNbPerPageChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                            </select>
                        </label>
                    </form>
                </div>
            );
        }
    };

    deadlinePicker = () => {
        if (this.state.hidden==0) {
            return (
                <div>
                    <label>Deadline souhaitée (fin de vote pour les élèves)<br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd"
                                margin="normal" id="date-picker-inline" label="Date picker inline" value={this.state.delivery_date}
                                onChange={this.handleDeliveryDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            <KeyboardTimePicker
                                margin="normal" id="time-picker" label="Time picker" value={this.state.delivery_time} 
                                onChange={this.handleDeliveryTimeChange} KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        </MuiPickersUtilsProvider>
                    </label>
                </div>
            )
        }
        
    }

    requestForm = () => {
        if (this.state.selectedFile) {
            return (
                <View style={styles.requestForm}>
                    <Text style={[globalStyles.titleText, styles.title]}>Formulez votre demande</Text>
                    <form id="requestData" style={styles.fileForm}>
                        
                        <label>Liste d'élèves concernée<br/>
                            <select type="text" name="userList" style={styles.smallInput}  onChange={this.handleListChange}>
                                {this.state.userLists.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                            </select>
                        </label>
                        
                        <label>Date de livraison attendue<br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd"
                                margin="normal" id="date-picker-inline" label="Date picker inline" value={this.state.deadline_date}
                                onChange={this.handleDeadlineDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            <KeyboardTimePicker
                                margin="normal" id="time-picker" label="Time picker" value={this.state.deadline_time} 
                                onChange={this.handleDeadlineTimeChange} KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        </MuiPickersUtilsProvider>
                        </label>
                        <label>Titre de la requête<br/>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} style={styles.smallInput}/> <br/>
                        </label>
                        <label>Commentaire (visible de tous)<br/>
                            <input type="text" name="comment" value={this.state.comment} onChange={this.handleCommentChange} style={styles.largeInput}/> <br/>
                        </label>
                        <label>Requête cachée aux élèves
                            <input type="radio" name="hidden" value="0" checked={this.state.hidden==0} onChange={this.handleHiddenChange} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="hidden" value="1" checked={this.state.hidden==1} onChange={this.handleHiddenChange} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <View>
                            {this.deadlinePicker()}
                        </View>
                        <Button 
                            type="button" 
                            onPress={this.onFileUpload}
                            title="Envoyer"
                            color={globalColors.primary}
                        />
                    </form>
                </View>
            );
        }
    };


    render() {
        if (this.state.userLists.length <= 0) {
            this.getLists();
            return (
                <Text>Chargement des listes depuis le serveur distant...</Text>
            )
        }
        return (
            <View style={globalStyles.container}>
                <GoBackModule navigation={this.props.navigation} />
                <form id="file" style={styles.form}>
                    <Text style={[globalStyles.titleText, styles.title]}>
                        Sélectionnez le fichier à joindre
                    </Text>
                    <input type="file" onChange={this.onFileChange} style={styles.fileInput}/>
                </form>
                {this.fileForm()}
                {this.requestForm()}

                <Text style={{color: 'red', fontSize: 20, marginVertical: 10}}>{this.state.error}</Text>
            </View>
            );
    }
}   

export default UploadForm;

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 5,
        fontFamily: 'ubuntu-regular',
    },
    fileForm: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 2.5,
        gap: 10,
        fontFamily: 'ubuntu-regular',
    },
    requestForm: {
        borderWidth: 1,
        borderColor: 'darkgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: globalColors.secondary,
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 20,
        gap: 10,
        fontFamily: 'ubuntu-regular',
        padding: 15,
    },
    input: {
        width: '100%',
        marginTop: 10,
    },
    largeInput: {
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
        height: 50,
    },
    smallInput: {
        marginLeft: 10,
    },
    title: {
        fontSize: 35,
        marginVertical: 10,
    },
    fileInput: {
        marginBottom: 15,
    },
};
