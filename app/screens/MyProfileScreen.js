import React, {useEffect, useState} from 'react'
import { ScrollView, View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, Button, StatusBar } from 'react-native';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

import constants from '../assets/globals/constants';
import { globalColors } from '../assets/globals/globalStyles';
import List from '../assets/classes/List';
import GoBackModule from '../assets/modules/GoBackModule';

let allLists = [];

function MyProfileScreen({ navigation, route }) {

    //let user = constants.globalUser; // for shorter name...
    const [user, setUser] = useState(constants.globalUser);

    const [lists, setLists] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getLists();
      }, [null]);

    useEffect(() => {
        if (!user.lists) setTextInput(lists[0]);
        else setTextInput(user.lists[0]);
    }, [lists]);

    const getLists = () => {
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                let tmpLists = [];
                allLists = [];
                let data = response.data.data;
                data.map(e => {
                    let tmpList = new List(e.id, e.name, e.theorical_count, e.creation_date, e.location);
                    allLists.push(tmpList);
                    if (!user.lists.includes(e.name)) tmpLists.push(tmpList);
                });
                setLists(tmpLists);
                tmpLists.length > 0 ? setTextInput(tmpLists[0].name) : setTextInput("");
            }
            else {
                Alert.alert("Oups!", "Le serveur ne répond pas, ou a rencontré une erreur.", [{text: 'Ok'}])
            }
        })
        return null;
    }


    const handleSubmit = () => {
        if (!textInput) return;
        let founded = false;
        lists.map(list => {
            if (list.name === textInput) { // if textInput correspond to a "real" list
                if (!user.lists.includes(textInput)) { // and is not contained in user's lists
                    // adding to list
                    user.addToList(list.id, list.name)
                    .then(msg => {
                        console.log(msg);
                        getLists();
                        console.log("List "+list.name+" added!");
                        founded = true;
                    })
                }
                else setErrorMsg("Vous êtes déjà dans cette liste.")
            }
        })
        // async trouble : inscruction is executed BEFORE the psoting request, and will always show the error msg.
        //if (!founded) setErrorMsg("Cette liste n'existe pas. Vous pouvez cependant contacter un membre du support pour la créer.")
    }

    const handleDelete = (list_name) => {
        if (!list_name) return;
        allLists.map(list => {
            if (list.name === list_name) {
                user.removeFromList(list.id, list.name)
                .then(msg => {
                    console.log(msg);
                    getLists()
                    console.log("Removed from list: ", list.name, "id:", list.id);
                })
            }
        })
    }

    const inputList = () => {
        if (lists.length > 0) { // if they are new lists available

            if (Platform.OS === "web") return (
                <View>
                    <FormControl>
                        <Select
                            value={textInput}
                            onChange={e => setTextInput(e.target.value)}
                            >
                            {lists.map(l => {
                                return <MenuItem key={l.id} value={l.name}>{l.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Button
                        title="S'abonner"
                        color={globalColors.primary}
                        onPress={handleSubmit} />
                </View>
            )
            else return (
                <View>
                    <Text style={styles.text}>Ajouter une liste: </Text>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={setTextInput}
                        value={textInput}
                    />
                    <Button
                        title="S'abonner"
                        color={globalColors.primary}
                        onPress={handleSubmit} />
                </View>
            )
        }
        else return null;
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
                <View style={styles.wrapListButtons}>
                    {user.lists.map(list_name => {
                        return (
                            <View key={list_name} style={styles.listButtonContainer}>
                                <Text>{list_name}</Text>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(list_name)}><Text>X</Text></TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
                {inputList()}
                <Text style={styles.errorMsg}>{errorMsg}</Text>
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
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigText: {
        textAlign: 'center',
        fontSize : Platform.OS === "web" ? 24 : 18,
    },
    container: {
        margin: 10,
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
    deleteButton: {
        width: 20,
        height: 20,
        color: 'darkgrey',
        marginLeft: 5,
    },
    errorMsg: {
        fontSize : Platform.OS === "web" ? 20 : 14,
        color: 'red',
    },
    listButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        backgroundColor: globalColors.white,
        borderWidth: 1,
        borderColor: 'darkgrey',
        borderStyle: 'solid',
        borderRadius: 2,
    },
    row: {
        marginVertical: 10,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        fontSize : Platform.OS === "web" ? 18 : 12,
    },
    text: {
        textAlign: 'center',
        fontSize : Platform.OS === "web" ? 20 : 14,
    },
    scrollView: {
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    wrapListButtons: {
        flex: 1,
        flexWrap: 'wrap',
        marginVertical: 10,
    }

})

export default MyProfileScreen;
