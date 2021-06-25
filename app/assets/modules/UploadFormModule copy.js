/*
##########################################################################
#  Form module to upload files and post a request. WEB compatible ONLY ! #
##########################################################################
*/

// TRIED TO CONVERT IN INTO FUNCTION INSTEAD OF CLASS BUT ITS SHIT

import axios from 'axios';
import React,{Component, useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { globalStyles } from "../styles/global_styles";
import constants from '../globals/constants';
import List from '../classes/List';


const currDate = new Date();

function rien(event) {
    event.target.parentNode.value = event.target.value
}

function print(a) {
    console.log(a);
}

export default function UploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);
    /*const [userLists, setUserLists] = useState([]);
    const [fileName, setFileName] = useState(""); // set by default on file picking
    const [color, setColor] = useState(0);
    const [stapple, setStapple] = useState(0);
    const [recto_verso, setRecto_verso] = useState(1);
    const [format, setFormat] = useState("A4");
    const [nb_per_page, setNb_per_page] = useState(1);
    const [userList, setUserList] = useState("STI");
    const [deadline_date, setDeadline_date] = useState(currDate);
    const [deadline_time, setDeadline_time] = useState("20:00:00");
    const [delivery_date, setDelivery_date] = useState(new Date(currDate.setDate(currDate.getDate() + 7)));
    const [delivery_time, setDelivery_time] = useState("8:00:00");
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [hidden, setHidden] = useState("0");*/
	/*state = {
	    selectedFile: null,
        userLists: [],
        fileName: "Fichier",
        color: 0,
        stapple: 0,
        recto_verso: 1,
        format: "A4",
        nb_per_page: 1,

        userList: "STI",
        deadline_date: currDate,
        deadline_time: "20:00:00",
        delivery_date: new Date(currDate.setDate(currDate.getDate() + 7)),
        delivery_time: "8:00:00",
        comment: "",
        title: "",
        hidden: 0,
	};*/
    // File form properties
    /*handleColorChange = (e) => { setState({color: e.target.value}); console.log("Color: " + color) }
    handleStappleChange = (e) => { setState({stapple: e.target.value}); console.log("State: " + stapple) }
    handleR_VChange = (e) => { setState({recto_verso: e.target.value}); console.log("Recto_verso: " + recto_verso) }
    handleFormatChange = (e) => { setState({format: e.target.value}); console.log("Format: " + format) }
    handleNbPerPageChange = (e) => { setState({nb_per_page: e.target.value}); console.log("Nb_per_page: " + nb_per_page) }
    // Request form properties
    handleListChange = (e) => { setState({userList: e.target.value}); console.log("List: " + userList) }
    handleDeadlineDateChange = (e) => { setState({deadline_date: e.target.value}); console.log("Deadline_date: " + deadline_date) }
    handleDeadlineTimeChange = (e) => { setState({deadline_time: e.target.value}); console.log("Deadline_time: " + deadline_time) }
    handleDeliveryDateChange = (e) => { setState({delivery_date: e.target.value}); console.log("Delivery_date: " + delivery_date) }
    handleDeliveryTimeChange = (e) => { setState({delivery_time: e.target.value}); console.log("Delivery_time: " + delivery_time) }
    handleCommentChange = (e) => { setState({comment: e.target.value}); console.log("Comment: " + comment) }
    handleTitleChange = (e) => { setState({title: e.target.value}); console.log("title: " + Title) }
    handleHiddenChange = (e) => { setState({hidden: e.target.value}); console.log("Hidden: " + hidden) }
    setFileName = (e) => { setState({ fileName: e.target.value }); console.log("File name: " + fileName)}*/

    const getLists = () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let lists = [];
                let data = response.data.data;
                data.forEach(e => {
                    lists.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
                setUserLists(lists)
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
    }

	const onFileChange = event => {
	    setSelectedFile(event.target.files[0]);
	    setFileName(event.target.files[0].name);
	};

    
	
	const onFileUpload = async () => {
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
                console.log(response.data.message);
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        });
	};

    const uploadRequest = async (file_path) => {
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
                        console.log('Internal error. Please try again or contact the support team.');
                        Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])

                    }
                })
            }
            else {
                console.log('Unable to post request and get its id.');
            }
        })
    };

    const linkListToRequest = async (request_id) => {
        let myForm = document.getElementById('requestData');
        console.log(myForm);
        let createRequestFormData = new FormData(myForm);
        let userList = createRequestFormData.get('userList');
        createRequestFormData.append('list_name', userList);
        createRequestFormData.append('request_id', request_id);
        // POSTING LINK BETWEEN LIST AND REQUEST
        axios.post(constants.addListToRequest, createRequestFormData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            console.log(response.data)
            if ('message' in response.data) {
                console.log('Request to link the list sent: ' + response.data.message);
            }
            else {
                console.log('Internal error during the link between the file and the request.');
            }
        })
    };


    const fileForm = () => {
        if (selectedFile) {
            return (
                <div>
                    <form id="fileData" style={styles.fileForm}>
                        <label>Titre du fichier<br/>
                            <input type="text" name="fileName" value={fileName} onChange={setFileName} style={styles.input}/> <br/>
                        </label>
                        <label>Couleur
                            <input type="radio" name="color" value="0" onChange={setColor} checked={color==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="color" value="1" onChange={setColor} checked={color==1}style={styles.smallInput}/><label>Oui</label>
                        </label><br/>

                        <label>Recto verso
                            <input type="radio" name="recto_verso" value="0" onChange={setRecto_verso} checked={recto_verso==0} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="recto_verso" value="1" onChange={setRecto_verso} checked={recto_verso==1} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <label>Format 
                            <select type="text" name="format" list="nbList" style={styles.smallInput} onChange={setFormat}>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="A2">A2</option>
                            </select>
                        </label><br/>
                        <label>Agrafes
                            <input type="radio" name="stapple" value="0" onChange={setStapple} checked={stapple==0} style={styles.smallInput}/><label>0</label>
                            <input type="radio" name="stapple" value="1" onChange={setStapple} checked={stapple==1} style={styles.smallInput}/><label>1</label>
                            <input type="radio" name="stapple" value="2" onChange={setStapple} checked={stapple==2} style={styles.smallInput}/><label>2</label>
                        </label><br/>
                        <label>Nombre d'éléments par page (exemple: 4 diapositives par page)<br/>
                            <select type="text" name="nb_per_page" style={styles.smallInput} onChange={setNb_per_page}>
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

    const requestForm = () => {
        if (selectedFile) {
            return (
                <div>
                    <form id="requestData" style={styles.fileForm}>
                        <h1>Demande une requête</h1>
                        
                        <label>Liste d'élèves concernée<br/>
                            <select type="text" name="userList" style={styles.smallInput}>
                                {userLists.map(l => <option key={l.id} value={l.name} onChange={setUserList}>{l.name}</option>)}
                            </select>
                        </label>
                        <label>Deadline de vote souhaitée<br/>
                        {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd"
                                margin="normal" id="date-picker-inline" label="Date picker inline" value={delivery_date}
                                onChange={setDeadline_date} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            <KeyboardTimePicker
                                margin="normal" id="time-picker" label="Time picker" value={delivery_time} 
                                onChange={setDeadline_time} KeyboardButtonProps={{'aria-label': 'change time'}}/>
            </MuiPickersUtilsProvider>*/}
                        </label>
                        <label>Date d'impression souhaitée<br/>
                            <input type="date" name="delivery_date" value={delivery_date} onChange={setDelivery_date} style={styles.smallInput}/> <br/>
                        </label>

                        <label>Titre de la requête<br/>
                            <input type="text" name="title" value={title} onChange={setTitle} style={styles.smallInput}/> <br/>
                        </label>
                        <label>Commentaire (visible de tous)<br/>
                            <input type="text" name="comment" value={comment} onChange={setComment} style={styles.largeInput}/> <br/>
                        </label>
                        <label>Requête cachée aux élèves
                            <input type="radio" name="hidden" value="0" checked={hidden==0} onChange={setHidden} style={styles.smallInput}/><label>Non</label>
                            <input type="radio" name="hidden" value="1" checked={hidden==1} onChange={setHidden} style={styles.smallInput}/><label>Oui</label>
                        </label><br/>
                        <button onClick={onFileUpload}>Enregistrer la requête</button>
                        {getLists()}

                    </form>
                </div>
                );
            }
        };
    return (
        <View style={globalStyles.container}>
            <form id="file" style={styles.form}>
                <Text style={[globalStyles.titleText, styles.title]}>
                    Formulez une nouvelle demande
                </Text>
                <input type="file" onChange={onFileChange} style={styles.input}/>
            </form>
            {fileForm()}
            {requestForm()}
        </View>
    );
    }


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
        marginLeft: 10,
    },
    title: {
        fontSize: 35,
    }
};
