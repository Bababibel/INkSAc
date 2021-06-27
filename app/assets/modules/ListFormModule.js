import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, Button } from 'react-native';
import { Select, FormControl, MenuItem, TextField } from '@material-ui/core';
import axios from 'axios';

import { globalColors } from '../globals/globalStyles';
import constants from '../globals/constants'

let allowedChars = /^[A-Za-z0-9_-]+$/;

function ListFormModule({reloadData}) {
    
    let list = null;
    const [location, setLocation] = useState("Bourges");
    const [name, setName] = useState("");
    const [theoricalNumber, setTheoricalNumber] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    function handleSubmit() {
        // Verification
        if (!allowedChars.test(name)) {
            setErrorMsg("Les noms de listes ne peuvent contenirs que des lettres, des chiffres ou _, -");
            return;
        }
        let tmpNum = parseInt(theoricalNumber);
        if (!tmpNum || tmpNum <= 0) {
            setErrorMsg("Nombre théorique incorrect ou <= 0");
            return;
        }
        // Correct values, prepare and send to database
        let formData = new FormData();
        formData.append('name', name);
        formData.append('th_count', tmpNum);
        formData.append('location', location)
        console.log(...formData);
        axios.post(constants.createList, formData)
        .then(response => {
            if ('message' in response.data) {
                setErrorMsg(response.data.message);
                reloadData(); // call function from parent to reload the database's content
            }
            else {
                console.log(response.data);
                return("From List class: ERROR NO ANSWER");
            }
        })
        
    }

    


    if(Platform.OS === 'web'){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Créer une nouvelle liste</Text>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
                <View style={styles.row}>
                    <TextField value={name} 
                                onChange={e => setName(e.target.value)} 
                                label="Nom"/>
                    <TextField value={theoricalNumber} 
                                onChange={e => setTheoricalNumber(e.target.value)} 
                                label="Nombre théorique"/>
                    <FormControl>
                        <Select
                            value={location}
                            onChange={e => setLocation(e.target.value)}>
                                <MenuItem value={"Bourges"}>Bourges</MenuItem>
                            <MenuItem value={"Blois"}>Blois</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        onPress={handleSubmit}
                        title="Créer" 
                        color={globalColors.primary}/>
                </View>
            </View>
        )
    } 
    else return null;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        marginHorizontal: 'auto',
        fontFamily: 'ubuntu-regular',
        borderRadius: 5,
        minHeight: 60,
        maxWidth: 700,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: globalColors.secondary,
        marginBottom: 20,
    },
    errorMsg: {
        color: 'red',
    },
    row: {
        marginVertical: 10,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        margin: 10,
    }

})

export default ListFormModule;
