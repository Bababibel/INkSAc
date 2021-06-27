import React, {useEffect, useState} from 'react'
import { ScrollView, View, Text, Platform, StyleSheet, TextInput } from 'react-native';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

import constants from '../assets/globals/constants';
import { globalColors } from '../assets/globals/globalStyles';
import List from '../assets/classes/List';
import GoBackModule from '../assets/modules/GoBackModule';

function MyProfileScreen({ navigation, route }) {

    let user = constants.globalUser; // for shorter name...

    const [lists, setLists] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        getLists();
      }, [null]);

    useEffect(() => {
        if (!user.lists) setTextInput(lists[0]);
        else setTextInput(user.lists[0]);
    }, [lists]);

    useEffect(() => {
        console.log("coucou update")
        user.lists[0] = textInput;
        user.updateInDb();
    }, [textInput])

    const getLists = () => {
        console.log("coucou")
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let lists = [];
                let data = response.data.data;
                data.forEach(e => {
                    lists.push(new List(e.id, e.name, e.theorical_count, e.creation_date, e.location));
                });
                setLists(lists);
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
        return null;
    }

    const inputList = () => {
        if (Platform.OS === "web") return (
            <FormControl>
                <Select
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}>
                    {lists.map(l => {
                        return <MenuItem key={l.id} value={l.name}>{l.name}</MenuItem>
                    })}
                    
                </Select>
            </FormControl>
        )
        else return (
            <TextInput 
                style={styles.textInput}
                onChangeText={setTextInput}
                value={textInput}
            />
        )
    }


    return (
        <ScrollView style={styles.scrollView}>
            <GoBackModule navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.bigText}>Prénom: {user.first_name}</Text>
                    <Text style={styles.bigText}>Nom: {user.last_name}</Text>
                </View>
                <Text style={styles.text}>Email: {user.email}</Text>
                {inputList()}
                <View style={styles.row}>
                    <Text style={styles.text}>Statut: {user.role}</Text>
                    <Text style={styles.text}>Campus: {user.location}</Text>
                </View>
                <Text style={styles.text}>Dernière connexion le: {user.last_login_date}</Text>
                <Text style={styles.text}>Date d'inscription: {user.creation_date}</Text>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'darkgrey',
        maxWidth: 600,
        minHeight: 60,
        backgroundColor: globalColors.secondary,
        padding: 15,
    },
    row: {
        marginVertical: 10,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        fontSize: 18,
    },
    scrollView: {
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }

})

export default MyProfileScreen;
