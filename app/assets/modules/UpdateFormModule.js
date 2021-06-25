/*
############################################################################
#  Form module to update files and update a request. WEB compatible ONLY ! #
############################################################################
*/

import axios from 'axios';
import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { globalStyles, globalColors } from "../styles/global_styles";
import constants from '../globals/constants';
import { toSqlFormatDate, toSqlFormatTime } from '../tools/dateConverter'
import List from '../classes/List';


const currDate = new Date();

class UpdateForm extends Component {

	state = {
	    selectedFile: null,
        userLists: [],
        fileName: (this.props.params.item.title) ? this.props.params.item.title : "Fichier",
        color: (this.props.params.item.color) ? this.props.params.item.color : 0,
        stapple: (this.props.params.item.stapple) ? this.props.params.item.stapple : 0,
        recto_verso: (this.props.params.item.recto_verso) ? this.props.params.item.recto_verso : 1,
        format: (this.props.params.item.format) ? this.props.params.item.format : "A4",
        nb_per_page: (this.props.params.item.nb_per_page) ? this.props.params.item.nb_per_page : 1,

        userList: "STI",
        deadline: (this.props.params.item.deadline) ? this.props.params.item.deadline : toSqlFormat(currDate),
        delivery_date: (this.props.params.item.delivery_date) ? this.props.params.item.delivery_date : toSqlFormat(new Date(currDate.setDate(currDate.getDate() + 7))),
        comment: this.props.params.item.comment,
        title: "",
        hidden: (this.props.params.item.hidden) ? this.props.params.item.hidden : 0,
	};
    handleColorChange = (e) => { this.setState({color: e.target.value}); console.log("Color: " + thisthis.state.color) }
    handleStappleChange = (e) => { this.setState({stapple: e.target.value}); console.log("State: " + this.state.stapple) }
    handleR_VChange = (e) => { this.setState({recto_verso: e.target.value}); console.log("Recto_verso: " + this.state.recto_verso) }
    handleFormatChange = (e) => { this.setState({format: e.target.value}); console.log("Format: " + this.state.format) }
    handleNbPerPageChange = (e) => { this.setState({nb_per_page: e.target.value}); console.log("Nb_per_page: " + this.state.nb_per_page) }

    handleListChange = (e) => { this.setState({userList: e.target.value}); console.log("List: " + this.state.userList) }
    handleDeadlineChange = (e) => { this.setState({deadline: e.target.value}); console.log("Deadline: " + this.state.deadline) }
    handleDeliveryDateChange = (e) => { this.setState({delivery_date: e.target.value}); console.log("Delivery_date: " + this.state.delivery_date) }
    handleCommentChange = (e) => { this.setState({comment: e.target.value}); console.log("Comment: " + this.state.comment) }
    handleTitleChange = (e) => { this.setState({title: e.target.value}); console.log("title: " + this.state.Title) }
    handleHiddenChange = (e) => { this.setState({hidden: e.target.value}); console.log("Hidden: " + this.state.hidden) }
    setFileName = (e) => { this.setState({ fileName: e.target.value }); console.log("File name: " + this.state.fileName)}

    getLists = () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let lists = [];
                let data = response.data.data;
                let key=1;
                data.forEach(e => {
                    lists.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
                this.setState({ userLists : lists })
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
    }

	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0] });
	    this.setState({ fileName: event.target.files[0].name });
	}

    onNoFileChange = event => {
        this.setState({ selectedFile: true});
	}
	
	onFileUpload = async () => {
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
                let myForm = document.getElementById('fileData');
                let createFileFormData = new FormData(myForm);
                createFileFormData.append('path', path);
                createFileFormData.append('name', this.state.selectedFile.name);
                // Use API to create the File in database with the path
                axios.post(constants.postFile, createFileFormData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })
                .then(response => {
                    if ('message' in response.data) {
                        console.log("File creating request: " + response.data.message);
                        this.uploadRequest(path);
                    }
                    else {
                        console.log('Internal error. Please try again or contact the support team.');
                    }
                })
            }
            else if ('message' in response.data) {
                console.log(response.data.message);
            }
            else {
                console.log('Internal error. Please try again or contact the support team.');
            }
        });
	};

    uploadRequest = async (file_path) => {
        let myForm = document.getElementById('requestData');
        let createRequestFormData = new FormData(myForm);
        let delivery_date = createRequestFormData.get('delivery_date');
        let deadline = createRequestFormData.get('deadline');
        /* Edit date to convert into a correct format */
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 7);
        const deadlineDateFormatted = toSqlFormat(deadlineDate);
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 10);
        const deliveryDateFormatted = toSqlFormat(deliveryDate);
        createRequestFormData.append('delivery_date', deliveryDateFormatted);
        createRequestFormData.append('deadline', deadlineDateFormatted);
        createRequestFormData.append('author', 1);
        axios.post(constants.postRequest, createRequestFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            console.log(response.data)
            if ('id' in response.data) {
                let createLinkToFileData = new FormData();
                createLinkToFileData.append('request_id', response.data.id);
                createLinkToFileData.append('file_path', file_path);
                console.log(file_path);
                axios.post(constants.addFileToRequest, createLinkToFileData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })
                .then(response => {
                    console.log(response.data);
                    navigation.goBack();
                })
            }
            else {
                console.log('Unable to post request and get its id.');
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

    requestForm = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <form id="requestData" style={styles.fileForm}>
                        <h1>Demande une requête</h1>
                        
                        <label>Liste d'élèves concernée<br/>
                            <select type="text" name="userList" style={styles.smallInput}>
                                {this.state.userLists.map(l => <option key={l.id} value={l.name} onChange={this.handleListChange}>{l.name}</option>)}
                            </select>
                        </label>

                        <label>Deadline de vote souhaitée<br/>
                            <input type="datetime-local" name="deadline" value={this.state.deadline.replace(' ', 'T')} onChange={this.handleDeadlineChange} style={styles.smallInput} /><br/>
                        </label>
                        <label>Date d'impression souhaitée<br/>
                            <input type="datetime-local" name="delivery_date" value={this.state.delivery_date.replace(' ', 'T')} onChange={this.handleDeliveryDateChange} style={styles.smallInput}/> <br/>
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
                        <button type='button' onClick={this.onFileUpload}>Enregistrer la requête</button>
                        {this.getLists()}

                    </form>
                </div>
                );
            }
        };
    render() {
        return (
            <View style={globalStyles.container}>
                <form id="file" style={styles.form}>
                    <Text style={[globalStyles.titleText, styles.title]}>
                        Modifiez une demande existante
                    </Text>
                    <input type="file" onChange={this.onFileChange} style={styles.fileInput}/>
                    <button type='button' onClick={this.onNoFileChange} style={styles.fileInput}>Ne pas télécharger de nouveau fichier</button>
                </form>
                {this.fileForm()}
                {this.requestForm()}
            </View>
        );
    }
}

export default UpdateForm;

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: 'ubuntu-regular',
    },
    fileForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        fontFamily: 'ubuntu-regular',
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
    },
    title: {
        fontSize: 35,
    },
    fileInput: {
        backgroundColor: globalColors.fileInput,
        color: globalColors.textDark,
        padding: 15,
        textAlign: 'center',
        fontSize: 16,
        width: '100%',
        marginTop: 10,
    }
};
