import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { Select, FormControl, MenuItem, TextField } from '@material-ui/core';

import List from '../classes/List';
import AlertAskConfirmationOnListDeleteModule from './AlertAskConfirmationOnListDeleteModule';



function ListModule({listProps}) {
    // Check if property is a valid array to load a List class
    if (!Array.isArray(listProps) || listProps.length != 5) return (<Text>Given parameter is not a array or list's properties ({typeof(listProps)}): {listProps}</Text>);
    
    let list = new List(listProps[0], listProps[1], listProps[2], listProps[3], listProps[4]);
    const [isVisible, setIsVisible] = useState(true);
    const [isConfirmOpened, setIsConfirmOpen] = useState(false);
    const [location, setLocation] = useState(list.location);
    const [name, setName] = useState(list.name);
    
    // Store the previous Location for the useEffect()
    const prevLocationRef = useRef();
    useEffect(() => {
        prevLocationRef.current = location;
    })
    const prevLocation = prevLocationRef.current;
    // Dont send an Update request if the previous location is the same or was undefined (class instanciation)
    useEffect(() => {
        if (prevLocation != location && prevLocation != undefined) {
            list.location = location,
            list.updateInDb()
        }
    }, [location, prevLocation])


    const prevNameRef = useRef();
    useEffect(() => {
        prevNameRef.current = name;
    })
    const prevName = prevNameRef.current;
    useEffect(() => {
        if (prevName != name && prevName != undefined) {
            list.name = name,
            list.updateInDb()
        }
    }, [name, prevName])

    let deleteFunction = () => {
        list.deleteInDb();
        setIsVisible(false);
    }

    let generateAlertConfirm = () => {
        if(isConfirmOpened){
            if (Platform.OS === 'web') {
                return (<AlertAskConfirmationOnListDeleteModule deleteFunction={deleteFunction}/>)
            } else {
                Alert.alert('Supprimer une liste', 'Etes-vous s??r de vouloir supprimer cette liste ?', 
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
                <View style={styles.row}>
                    <TextField value={name} 
                                onChange={e => setName(e.target.value)}/>
                    <Text style={styles.biggerText}>Nombre th??orique: {list.theoricalCount}</Text>
                    <FormControl>
                        <Select
                            value={location}
                            onChange={e => setLocation(e.target.value)}>
                                <MenuItem value={"Bourges"}>Bourges</MenuItem>
                            <MenuItem value={"Blois"}>Blois</MenuItem>
                        </Select>
                    </FormControl>
                </View>
            )
        } else {
            return (
                <View style={styles.row}>
                    <Text>Nom : {name}</Text>
                    <Text>Nombre th??orique: {list.theoricalCount}</Text>
                    <Text>{location}</Text>
                </View>
            )
        }
    }

    if (isVisible) {
        return (
            <View style={[styles.container, {backgroundColor: (list.location=="Bourges" ? 'ghostwhite' : 'gainsboro')}]}>
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
    container: {
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        marginTop: 5,
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        fontSize: 18,
    }

})

export default ListModule;
