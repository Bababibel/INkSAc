import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { Select, FormControl, MenuItem, TextField } from '@material-ui/core';

import AlertAskConfirmationOnListDeleteModule from './AlertAskConfirmationOnListDeleteModule';
import Request from '../classes/Request';



function RequestModule({requestProps}) {
    // Check if property is a valid array to load a List class
    //if (!Array.isArray(requestProps) || requestProps.length != 5) return (<Text>Given parameter is not a array or request's properties ({typeof(requestProps)}): {requestProps}</Text>);
    
    let request = new Request (requestProps.id, requestProps.author, requestProps.author_name, requestProps.deadline, requestProps.delivery_date, requestProps.expiration_date, requestProps.title, requestProps.comment, requestProps.hidden, requestProps.state)
    const [isVisible, setIsVisible] = useState(true);
    const [isConfirmOpened, setIsConfirmOpen] = useState(false);
    const [title, setLocation] = useState(request.title);
    const [name, setName] = useState(request.title);
    
    // Store the previous Location for the useEffect()
    const prevLocationRef = useRef();
    useEffect(() => {
        prevLocationRef.current = title;
    })
    const prevLocation = prevLocationRef.current;
    // Dont send an Update request if the previous title is the same or was undefined (class instanciation)
    /*useEffect(() => {
        if (prevLocation != title && prevLocation != undefined) {
            request.title = title,
            request.updateInDb()
        }
    }, [title, prevLocation])*/


    const prevNameRef = useRef();
    useEffect(() => {
        prevNameRef.current = name;
    })
    const prevName = prevNameRef.current;
    useEffect(() => {
        if (prevName != name && prevName != undefined) {
            request.name = name,
            console.log(request.name)
            request.updateInDb()
        }
    }, [name, prevName])

    let deleteFunction = () => {
        request.deleteInDb();
        setIsVisible(false);
    }

    let generateAlertConfirm = () => {
        if(isConfirmOpened){
            if (Platform.OS === 'web') {
                return (<AlertAskConfirmationOnListDeleteModule deleteFunction={deleteFunction}/>)
            } else {
                Alert.alert('Supprimer une requeste', 'Etes-vous sûr de vouloir supprimer cette requeste ?', 
                [
                    {
                        text : "Oui",
                        onPress : () => deleteFunction()
                    },
                    {
                        text : "Non",
                        style : "cancel"    
                    }
                ])
            }
        }
    }

    const platformHandle = () => {
        if(Platform.OS === 'web'){
            return(
                <View>
                    <View style={styles.row}>
                        <TextField value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    label="Nom"/>
                        <Text style={styles.biggerText}>Nombre théorique: {request.theoricalCount}</Text>
                        <FormControl>
                            <Select
                                value={title}
                                onChange={e => setLocation(e.target.value)}>
                                    <MenuItem value={"Bourges"}>Bourges</MenuItem>
                                <MenuItem value={"Blois"}>Blois</MenuItem>
                            </Select>
                        </FormControl>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.biggerText}>{request.title}</Text>
                    </View>
                    <View style={styles.row}>
                        
                        <Text>{request.deadline}</Text>
                    </View>
                    <View style={styles.row}>
                    <Text>Etat : {request.state}</Text>
                    </View>
                </View>
            )
        }
    }

    if (isVisible) {
        return (
            <View style={[styles.container, {backgroundColor: (request.id=="Bourges" ? 'ghostwhite' : 'gainsboro')}]}>
                {generateAlertConfirm()}
                <TouchableOpacity
                        onPress={() => {setIsConfirmOpen(true)}}
                        style={styles.deleteButton}>
                    <Text style={styles.X}>X</Text>
                </TouchableOpacity>
                {platformHandle()}
            </View>
        )
    }
    else return null;
}

const styles = StyleSheet.create({
    biggerText: {
        fontSize: 20,
        fontFamily: 'ubuntu-bold',
        marginBottom: 5,
    },
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        marginTop: 5,
        width: '90%',
        marginHorizontal: 'auto',
        fontFamily: 'ubuntu-regular',
        borderRadius: 5,
        maxWidth: 600,
        minHeight: 60,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        backgroundColor: 'red',
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        zIndex: 10,
        padding: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    X: {
        color: 'white',
    },
    row: {
        marginVertical: 1,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
    }

})

export default RequestModule;
