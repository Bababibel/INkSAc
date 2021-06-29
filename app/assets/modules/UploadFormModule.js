/*
##########################################################################
#  Form module to upload files and post a request. WEB compatible ONLY ! #
##########################################################################
*/

import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { View, Text, Alert, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { MenuItem, Select, FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import { globalColors, globalStyles } from "../globals/globalStyles";
import { computeDateTimeForSql } from '../tools/dateConverter';
import List from '../classes/List';
import constants from '../globals/constants';
import GoBackModule from '../modules/GoBackModule';


const currDate = new Date(new Date().setDate(new Date().getMonth() - 1)); // months start at 0 index, need to correct it for pickers
const futDate = new Date(currDate.setDate(currDate.getDate() + 7));

function UploadForm({navigation}) {

    let deadline = computeDateTimeForSql(currDate, currDate); // computed with date + time
    let delivery = computeDateTimeForSql(futDate, futDate); // computed with date + time

    // File Form
    const [selectedFile, setSelectedFile] = useState(null);
    const [userLists, setUserLists] = useState([]);
    const [fileName, setFileName] = useState("Fichier");
    const [color, handleColorChange] = useState(0);
    const [stapple, handleStappleChange] = useState(0);
    const [recto_verso, handleR_VChange] = useState(1);
    const [format, handleFormatChange] = useState("A4");
    const [nb_per_page, handleNbPerPageChange] = useState(1);
    // Request Form
    const [userList, handleListChange] = useState("");
    const [deadline_date, handleDeadlineDateChange] = useState(currDate);
    const [deadline_time, handleDeadlineTimeChange] = useState(currDate);
    const [delivery_date, handleDeliveryDateChange] = useState(futDate);
    const [delivery_time, handleDeliveryTimeChange] = useState(futDate);
    const [comment, handleCommentChange] = useState("Commentaire publique");
    const [title, handleTitleChange] = useState("Titre");
    const [hidden, handleHiddenChange] = useState(0);
    // Others
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState("");

    
    useEffect(() => {
        deadline = computeDateTimeForSql(deadline_date, deadline_time);
        delivery = computeDateTimeForSql(delivery_date, delivery_time);
        console.log(deadline)
        console.log(delivery)
    }, [deadline_date, deadline_time, delivery_date, delivery_time]);

    const getLists = () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let data = response.data.data;
                handleListChange('Selectionnez une liste')
                data.forEach(e => {
                    let tmpList = new List(e.id, e.name, e.theorical_count, e.creation_date, e.location);
                    setUserLists(userLists => [...userLists, tmpList]);
                });

            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
        return null;
    }

    const formSubmitted = () => {
        /*if (error == "") */navigation.goBack();
        /*else {
            console.log(error)
            setError("Coucou Baptiste, tu as oublié ton cerveau entre deux lignes de Javascript. Si un utilisateur voit ça, vous avez le droit de l'insulter. Cordialement, Baptiste, le 25/06/2021.");
        }*/
        /* No joke, cet easter egg que je m'étais laissé a failli pop le jour de la soutenance...
        Big up au courageux qui me relit, force à toi
        Ce code est tellement dégueux que j'ai plus envie d'y toucher
        Bisous
        */
    }

	const onFileChange = event => {
	    setSelectedFile(event.target.files[0]);
	    setFileName(event.target.files[0].name);
	};

    
	
	const onFileUpload = async () => {
        setError("");
        if (userList === "") {
            setError("Vous n'avez pas sélectionné de liste à affilier à votre demande.")
            return;
        }
        /*if (computeDateTimeForSql(new Date(), new Date()) > deadline || deadline > delivery) {
            console.log("deadline", deadline)
            console.log("delivery", delivery)
            setError("L'ordre chronologique n'est pas respecté (maintenant -> deadline -> livraison).")
            return;
        }*/
        const fileFormData = new FormData();
        // Create the post request to grab data from $_POST['file] in the php server
        fileFormData.append("file",
            selectedFile,
            selectedFile.name,   
        );
        axios.post(constants.uploadUrl, fileFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            // Grab path from return field
            if ('path' in response.data) {
                let path = response.data.path;
                let myForm = document.getElementById('fileData');
                let createFileFormData = new FormData();
                // UPLOADING FILE
                createFileFormData.append('name', selectedFile.name);
                createFileFormData.append('path', path);
                createFileFormData.append('color', color);
                createFileFormData.append('stapple', stapple);
                createFileFormData.append('format', format);
                createFileFormData.append('recto_verso', recto_verso);
                createFileFormData.append('nb_per_page', nb_per_page);
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
                setError(response.data.message);
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        });
	};

    const uploadRequest = async (file_path) => {
        let createRequestFormData = new FormData();
        createRequestFormData.append('delivery_date', delivery);
        createRequestFormData.append('deadline', deadline);
        createRequestFormData.append('author', constants.globalUser.id);
        createRequestFormData.append('title', title);
        createRequestFormData.append('comment', comment);
        createRequestFormData.append('hidden', hidden);
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
                        linkListToRequest(request_id);
                    }
                    else {
                        setError('Internal error. Please try again or contact the support team.');
                        axios.get(constants.deleteRequest, { params: { 'id': request_id }})
                        .then(response => {
                            console.log(response.data)
                        })
                        
                    }
                })
            }
            else {
                setError('Unable to post request and get its id: '+ response.data.message);
            }
        })
    };

    const linkListToRequest = async (request_id) => {
        let myForm = document.getElementById('requestData');
        let createRequestFormData = new FormData(myForm);
        createRequestFormData.append('list_name', userList);
        createRequestFormData.append('request_id', request_id);
        // POSTING LINK BETWEEN LIST AND REQUEST
        axios.post(constants.addListToRequest, createRequestFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            if ('error' in response.data) {
                if (!response.data.error) {
                    formSubmitted()
                }
                else {
                    console.log('Request to link the list sent: ' + response.data.message);
                    setError(response.data.message);
                    console.log(error);
                    axios.get(constants.deleteRequest, { params: { 'id': request_id }})
                    .then(response => {
                        console.log(response.data)
                    })
                }
            }
            else {
                setError('Internal error during the link between the file and the request.');
            }
        })
    };


    const fileForm = () => {
        if (selectedFile) {
            return (
                <div>
                    <form id="fileData" style={styles.fileForm}>
                        <label>Titre du fichier<br/>
                            <input type="text" name="fileName" value={fileName} onChange={e => setFileName(e.target.value)} style={styles.input}/> <br/>
                        </label>
                        <label>Couleur
                            <input type="radio" name="color" value="0" onChange={e => handleColorChange(e.target.value)} checked={color==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="color" value="1" onChange={e => handleColorChange(e.target.value)} checked={color==1}style={styles.smallInput}/><label>Oui</label>
                        </label><br/>

                        <label>Recto verso
                            <input type="radio" name="recto_verso" value="0" onChange={e => handleR_VChange(e.target.value)} checked={recto_verso==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="recto_verso" value="1" onChange={e => handleR_VChange(e.target.value)} checked={recto_verso==1} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <label>Format 
                            <select type="text" name="format" list="nbList" style={styles.smallInput} onChange={e => handleFormatChange(e.target.value)}>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="A2">A2</option>
                            </select>
                        </label><br/>
                        <label>Agrafes
                            <input type="radio" name="stapple" value="0" onChange={e => handleStappleChange(e.target.value)} checked={stapple==0} style={styles.smallInput}/><label>0</label>
                            <input type="radio" name="stapple" value="1" onChange={e => handleStappleChange(e.target.value)} checked={stapple==1} style={styles.smallInput}/><label>1</label>
                            <input type="radio" name="stapple" value="2" onChange={e => handleStappleChange(e.target.value)} checked={stapple==2} style={styles.smallInput}/><label>2</label>
                        </label><br/>
                        <label>Nombre d'éléments par page (ex: 4 diapos par page) 
                            <select type="text" name="nb_per_page" style={styles.smallInput} onChange={e => handleNbPerPageChange(e.target.value)}>
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

    const deadlinePicker = () => {
        if (hidden==0) {
            return (
                <div>
                    <label>Deadline souhaitée (fin de vote pour les élèves)<br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd" style={{marginRight: 30}}
                                margin="normal" id="date-picker-inline-" label="Jour de fin de vote" value={deadline_date}
                                onChange={handleDeadlineDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            <KeyboardTimePicker
                                margin="normal" id="time-picker-" label="Heure de fin de vote" value={deadline_time} 
                                onChange={handleDeadlineTimeChange} KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        </MuiPickersUtilsProvider>
                    </label>
                </div>
            )
        }
        
    }

    const requestForm = () => {
        if (selectedFile) {
            return (
                <View style={styles.requestForm}>
                    <Text style={[globalStyles.titleText, styles.title]}>Formulez votre demande</Text>
                    <form id="requestData" style={styles.fileForm}>
                        <label>Liste d'élèves concernée<br/>
                            <FormControl>
                                <Select
                                    value={userList}
                                    onChange={e => handleListChange(e.target.value)}>
                                    {userLists.map(l => {return <MenuItem key={l.id} value={l.name}>{l.name}</MenuItem>})}
                                </Select>
                            </FormControl>
                        </label>
                        <label>Date de livraison attendue<br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd" style={{marginRight: 30}}
                                margin="normal" id="date-picker-inline" label="Jour de livraison" value={delivery_date}
                                onChange={handleDeliveryDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            <KeyboardTimePicker
                                margin="normal" id="time-picker" label="Heure de livraison" value={delivery_time} 
                                onChange={handleDeliveryTimeChange} KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        </MuiPickersUtilsProvider>
                        </label>
                        <label>Titre de la requête<br/>
                            <input type="text" name="title" value={title} onChange={e => handleTitleChange(e.target.value)} style={styles.smallInput}/> <br/>
                        </label>
                        <label>Commentaire (visible de tous)<br/>
                            <input type="text" name="comment" value={comment} onChange={e => handleCommentChange(e.target.value)} style={styles.largeInput}/> <br/>
                        </label>
                        <label>Requête cachée aux élèves
                            <input type="radio" name="hidden" value="0" checked={hidden==0} onChange={e => handleHiddenChange(e.target.value)} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="hidden" value="1" checked={hidden==1} onChange={e => handleHiddenChange(e.target.value)} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <View>
                            {deadlinePicker()}
                        </View>
                        <Text style={{color: 'red', fontSize: 20, marginVertical: 10}}>{error}</Text>

                        <Button 
                            type="button" 
                            onPress={onFileUpload}
                            title="Envoyer"
                            color={globalColors.primary}
                        />
                    </form>
                </View>
            );
        }
    };



    if (!dataLoaded) {
        <AppLoading
            startAsync={getLists()}
            onFinish={setDataLoaded(true)}
            />
    }
    return (
        <View style={globalStyles.container}>
            <GoBackModule navigation={navigation} />
            <form id="file" style={styles.form}>
                <Text style={[globalStyles.titleText, styles.title]}>
                    Sélectionnez le fichier à joindre
                </Text>
                <input type="file" onChange={onFileChange} style={styles.fileInput}/>
            </form>
            {fileForm()}
            {requestForm()}

        </View>
    );
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
