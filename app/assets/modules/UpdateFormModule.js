/*
############################################################################
#  Form module to update files and update a request. WEB compatible ONLY ! #
############################################################################
*/

import axios from 'axios';
import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from "../styles/global_styles";
import constants from '../globals/constants';

function setFileName(value) {
    console.log(value);
}

class UpdateForm extends Component {

	state = {
	    selectedFile: null
	};
    
	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0] });
	};
	
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
                            <input type="text" name="fileName" value={this.state.selectedFile.name} onChange={setFileName} style={styles.input}/> <br/>
                        </label>
                        <label>Couleur
                            <span><input type="radio" name="color" value="0" defaultChecked style={styles.smallInput}/><label>Non</label></span>
                            <span><input type="radio" name="color" value="1" style={styles.smallInput}/><label>Oui</label></span>
                        </label><br/>

                        <label>Recto verso
                            <span><input type="radio" name="recto_verso" value="0" style={styles.smallInput}/><label>Non</label></span>
                            <span><input type="radio" name="recto_verso" value="1" defaultChecked style={styles.smallInput}/><label>Oui</label></span>
                        </label><br/>
                        <label>Format 
                            <select type="text" name="format" list="nbList" style={styles.smallInput}>
                                <option>A4</option>
                                <option>A3</option>
                                <option>A2</option>
                            </select>
                        </label><br/>
                        <label>Agrafes
                            <span><input type="radio" name="stapple" value="0" defaultChecked style={styles.smallInput}/><label>0</label></span>
                            <span><input type="radio" name="stapple" value="1" style={styles.smallInput}/><label>1</label></span>
                            <span><input type="radio" name="stapple" value="2" style={styles.smallInput}/><label>2</label></span>
                        </label><br/>
                        <label>Nombre d'éléments par page (exemple: 4 diapositives par page)<br/>
                            <select type="text" name="nb_per_page" list="nbList" style={styles.smallInput}>
                                <option>1</option>
                                <option>2</option>
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
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
                        <label>Deadline de vote souhaitée<br/>
                            <input type="date" name="deadline" style={styles.smallInput} /><br/>
                        </label>
                        <label>Date d'impression souhaitée<br/>
                            <input type="date" name="delivery_date" style={styles.smallInput}/> <br/>
                        </label>

                        <label>Titre de la requête<br/>
                            <input type="text" name="title" style={styles.smallInput}/> <br/>
                        </label>
                        <label>Commentaire (visible de tous)<br/>
                            <input type="text" name="comment" style={styles.largeInput}/> <br/>
                        </label>
                        <label>Requête cachée aux élèves (ex : partiel)
                            <span><input type="radio" name="hidden" value="0" onChange={setFileName} checked style={styles.smallInput}/><label>Non</label></span>
                            <span><input type="radio" name="hidden" value="1" onChange={setFileName} style={styles.smallInput}/><label>Oui</label></span>
                        </label><br/>
                    </form>
                </div>
                );
            }
        };
    render() {
        console.log(this)
    return (
        <View style={[globalStyles.container, styles.maxHeight]}>
            <form id="file" style={styles.form}>
                <Text style={[globalStyles.titleText, styles.title]}>
                    Modifiez une demande existante
                </Text>
                <input type="file" onChange={this.onFileChange} style={styles.input}/>
            </form>
            {this.fileForm()}
            {this.requestForm()}
            <button onClick={this.onFileUpload}>Enregistrer la requête</button>
        </View>
    );
}
}

export default UpdateForm;

const styles = {
    maxHeight: {
        height: '100vh',
    },
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
    }
};
