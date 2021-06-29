import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Alert, Image } from 'react-native';

import Request from '../classes/Request';
import { Select, FormControl, MenuItem } from '@material-ui/core';
import AlertAskConfirmationOnUserDeleteModule from './AlertAskConfirmationOnUserDeleteModule';
import constants from '../globals/constants';
import { convertToString } from '../tools/dateConverter';


function RequestModule({requestProps, goBack, navigation}) {
    // Check if property is a valid array to load a User class
    //if (!Array.isArray(requestProps) || requestProps.length != 9) return (<Text>Given parameter is not a array or request's properties ({typeof(requestProps)}): {requestProps}</Text>);
    const request = new Request (requestProps.request_id, requestProps.author_id, requestProps.author_name, requestProps.deadline, requestProps.delivery_date, requestProps.expiration_date, requestProps.title, requestProps.comment, requestProps.hidden, requestProps.state, requestProps.list)
    request.attachFile(requestProps.files)
    const [role, setRole] = useState(request.role);
    const [isVisible, setIsVisible] = useState(true);
    const [isConfirmOpened, setIsConfirmOpen] = useState(false);
    

    // Store the previous role for the useEffect()
    const prevRoleRef = useRef();
    useEffect(() => {
        prevRoleRef.current = role;
    })
    const prevRole = prevRoleRef.current;
    // Dont send an Update request if the previous role is the same or was undefined (class instanciation)
    useEffect(() => {
        if (prevRole != role && prevRole != undefined) {
            request.role = role,
            request.updateInDb()
        }
    }, [role, prevRole])

    let deleteFunction = () => {
        request.deleteInDb();
        setIsVisible(false);
    }

    const answerRelatedImage = () => {
        if (constants.globalUser.role != 'student') return;
        if (request.files.answer == 0) {
            return (<Image source={require('../printer.png')} style={{width: 32, height: 32, resizeMode: 'stretch', margin: 4}}/>);
        }
        else {
            return (<Image source={require('../files.png')} style={{width: 32, height: 32, resizeMode: 'stretch', margin: 15}}/>);
        }
    }

    let generateAlertConfirm = () => {
        if (isConfirmOpened){
            if (Platform.OS === 'web'){
                return (<AlertAskConfirmationOnUserDeleteModule deleteFunction={deleteFunction}/>)
            }
            else {
                Alert.alert('Supprimer une liste', 'Etes-vous sûr de vouloir supprimer cette liste ?', 
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

    const roleHandle = () => {
        if (constants.globalUser.role != 'student'){
            return (
                <TouchableOpacity
                    onPress={() => {setIsConfirmOpen(true)}}
                    style={styles.deleteButton}>
                    <Text style={styles.X}>X</Text>
                </TouchableOpacity>
            )
        }
    }
    
    const pressHandle = () => {
        navigation.navigate("ShowFileDetails", { item: request, goBack : goBack })
    }

    if (isVisible) {
        return (
        <TouchableOpacity onPress={() => pressHandle()}>
            <Text style={styles.X}>X</Text>
            <View style={[styles.container, {backgroundColor: (request.files.answer == 0 ? 'lightgrey' : 'lightblue')}]}>
                {generateAlertConfirm()}
                {roleHandle()}
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginBottom: 8}}>
                    {answerRelatedImage()}
                    <Text style={{fontWeight: "bold", fontSize: 16}}>{request.title}</Text>
                </View>
                <View style={{flexDirection: "column", marginHorizontal: 16, marginBottom: 8}}>
                    <Text style={{color: constants.states.color[request.state]}}>État: {constants.states.msg[request.state]}</Text>
                    <Text>Deadline de vote: {convertToString(request.deadline)}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        margin: 10,
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        marginTop: -5,
        width: '100%',
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
