import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';

import Request from '../classes/Request';
import { Select, FormControl, MenuItem } from '@material-ui/core';
import AlertAskConfirmationOnUserDeleteModule from './AlertAskConfirmationOnUserDeleteModule';


function RequestModule({requestProps, navigation}) {
    // Check if property is a valid array to load a User class
    //if (!Array.isArray(requestProps) || requestProps.length != 9) return (<Text>Given parameter is not a array or request's properties ({typeof(requestProps)}): {requestProps}</Text>);

    const request = new Request (requestProps.id, requestProps.author, requestProps.author_name, requestProps.deadline, requestProps.delivery_date, requestProps.expiration_date, requestProps.title, requestProps.comment, requestProps.hidden, requestProps.state)
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

    const platformHandle = () => {
        if(Platform.OS === 'web'){
            return (
                <FormControl>
                    <Select
                        value={role}
                        onChange={e => setRole(e.target.value)}>
                        <MenuItem value={"student"}>Étudiant</MenuItem>
                        <MenuItem value={"teacher"}>Enseignant</MenuItem>
                        <MenuItem value={"reprography"}>Reprographie</MenuItem>
                        <MenuItem value={"admin"}>Administrateur</MenuItem>
                    </Select>
                </FormControl>
            )
        } else {
            return (
                <Text>{request.role}</Text>
            )
        }
    }
    
    const pressHandle = () => {
        console.log("je suis pressed")
        console.log(request)
        navigation.navigate("ShowFileDetails", { item: request })
    }

    if (isVisible) {
        return (
        <TouchableOpacity onPress={() => pressHandle()}>
            <Text style={styles.X}>X</Text>
            <View onPress={() => console.log("je suis pressed")} style={[styles.container, {backgroundColor: (request.location=="Bourges" ? 'ghostwhite' : 'gainsboro')}]}>
                {generateAlertConfirm()}
                <TouchableOpacity
                    onPress={() => {setIsConfirmOpen(true)}}
                    style={styles.deleteButton}>
                    <Text style={styles.X}>X</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text>{request.title}</Text>
                    
                    {/*platformHandle()*/}
                </View>
                <View style={styles.row}>
                    { /*Ajouter ici la liste des listes de cette requete*/ }
                </View>
                <View style={styles.row}>
                <Text>{request.state}</Text>
                    <Text>{request.deadline}</Text>
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
