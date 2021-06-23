import axios from 'axios';
import React,{Component} from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { globalStyles } from "../styles/global_styles";
import constants from '../globals/constants';


const minDeadline = new Date();
const minDelivery = new Date();
minDeadline.setDate(minDeadline.getDate() + 7);
minDelivery.setDate(minDeadline.getDate() + 7);


function setFileName(value) {
    console.log(value);
}

class UploadForm extends Component {

	state = {
	    selectedFile: null
	};
    


	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0] });
	};
	
	onFileUpload = async () => {
        /*let response = await fetch(constants.uploadUrl, {
            method: 'POST',
            body: new FormData(file)
        });
    
        let result = await response.json();
    
        alert(result.message);*/
        const formData = new FormData();
        formData.append("file",
            this.state.selectedFile,
            this.state.selectedFile.name,   
        );
        
        axios.post(constants.uploadUrl, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
            let path = response.data.path;
            //let newFormData = new FormData();
            //newFormData.append('BITE', 'GROSEXE');
            var myForm = document.getElementById('fileData');
            let newFormData = new FormData(myForm);
            newFormData.append('path', path);
            newFormData.append('name', this.state.selectedFile.name);
            for (var key of newFormData.entries()) {
                console.log(key[0] + ', ' + key[1])
            }
            axios.post(constants.postFile, newFormData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then(response => {
                console.log(response.data.message);
            })

        });
	};
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
        if (this.state.selectedFile) {
            return (
            <div>
                <p>Nom original: {this.state.selectedFile.name}</p>
                <p>Extension: {this.state.selectedFile.type}</p>
            </div>
            );
        }
        else {
            return (
            <div>
                <h4>Choisissez un fichier à imprimer</h4>
            </div>
            );
        }
    };

    requestData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <form id="fileData">
                        <label>Titre du fichier<br/>
                            <input type="text" name="fileName" value={this.state.selectedFile.name} onChange={setFileName} style={styles.input}/> <br/>
                        </label>
                        {/*<label>Deadline souhaitée<br/>
                            <input type="date" name="deadlineDate" min={minDeadline} style={styles.input} /><br/>
                        </label>
                        <label>Date d'impression souhaitée<br/>
                            <input type="date" name="deliveryDate" min={minDelivery} style={styles.input}/> <br/>
                        </label>*/}


                        <label>Couleur
                            <span><input type="radio" name="color" value="0" onChange={setFileName} checked style={styles.smallInput}/><label>Non</label></span>
                            <span><input type="radio" name="color" value="1" onChange={setFileName} style={styles.smallInput}/><label>Oui</label></span>
                        </label><br/>

                        <label>Recto verso
                            <span><input type="radio" name="recto_verso" value="0" onChange={setFileName} style={styles.smallInput}/><label>Non</label></span>
                            <span><input type="radio" name="recto_verso" value="1" onChange={setFileName} checked style={styles.smallInput}/><label>Oui</label></span>
                        </label><br/>
                        <label>Format 
                            <select type="text" name="format" list="nbList" style={styles.smallInput}>
                                <option>A4</option>
                                <option>A3</option>
                                <option>A2</option>
                            </select>
                        </label><br/>
                        <label>Agrafes
                            <span><input type="radio" name="stapple" value="0" onChange={setFileName} checked style={styles.smallInput}/><label>0</label></span>
                            <span><input type="radio" name="stapple" value="1" onChange={setFileName} style={styles.smallInput}/><label>1</label></span>
                            <span><input type="radio" name="stapple" value="2" onChange={setFileName} style={styles.smallInput}/><label>2</label></span>
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
        render() {
        return (
            <View style={[globalStyles.container, styles.maxHeight]}>
                <Text style={[globalStyles.titleText, styles.title]}>
                    Formulez une nouvelle demande
                </Text>
                <form id="file" style={styles.form}>
                    <input type="file" onChange={this.onFileChange} style={styles.input}/>
                </form>
                {this.fileData()}
                {this.requestData()}
                <button onClick={this.onFileUpload}>Enregistrer la requêquête</button>
                <Button title='Fermer sans enregistrer'  onPress={() => navigation.goBack()}/>
            </View>
        );
	}
}

export default UploadForm;

const styles = {
    maxHeight: {
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontFamily: 'ubuntu-regular',
    },
    input: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20
    },
    largeInput: {
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
        height: 50,
    },
    largeInput: {
        height: 10,
        marginBottom: 20,
        marginTop: 10,
        height: 50,
    },
    title: {
        fontSize: 35,
    }
};
