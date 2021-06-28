import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

import List from '../../assets/classes/List';
import constants from '../../assets/globals/constants';
import UserModule from '../../assets/modules/UserModule';
import GoBackModule from '../../assets/modules/GoBackModule';
import {globalColors} from '../../assets/globals/globalStyles'

// Will contain all users, displayed or not

let globalUserList = [];
function ManageUsersScreen({ navigation, route }) {

    const [userList, setUserList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [lists, setLists] = useState([]);

    const [listFilter, setListFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");


    const loadData = () => {
        setUserList([]);
        globalUserList = [];
        axios.get(constants.getAllUsers)
        .then(response => {
            console.log(response.data.data)
            if ('data' in response.data) {
                response.data.data.map(u => {
                    if (u.id == constants.globalUser.id) return; // dont show myself in the list
                    let tmpUser = [u.id, u.email, u.first_name, u.last_name, u.role, u.creation_date, u.last_login_date, u.location, u.list_names];
                    setUserList(userList => [...userList, tmpUser]);
                    globalUserList.push(tmpUser);
                });
            }
            else if ('message' in response.data) setErrorMsg("Erreur: "+response.message);
            else setErrorMsg("Le serveur ne répond pas");
        })
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                response.data.data.map(l => {
                    let tmpList = new List(l.id, l.name, l.theorical_count, l.creation_date, l.location);
                    setLists(lists => [...lists, tmpList]);
                });
            }
            else if ('message' in response.data) setErrorMsg("Erreur: "+response.message);
            else setErrorMsg("Le serveur ne répond pas");
        })
    }

    useEffect(() => {
        setUserList([]);
        globalUserList.map(u => {
            if ((emailFilter=="" ? true : u[1].match(emailFilter)!== null) &&
                (listFilter=="" ? true : u[8].includes(listFilter)) &&
                (locationFilter=="" ? true : u[7].includes(locationFilter)) &&
                (roleFilter=="" ? true : u[4] == roleFilter)) {
                    setUserList(userList => [...userList, u])
                }
        })
    }, [emailFilter, listFilter, locationFilter, roleFilter])

    const platformHandle = () => {
        if(Platform.OS === 'web'){
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Chercher un utilisateur</Text>
                    <View style={styles.row}>
                        <TextField value={emailFilter} 
                                onChange={e => setEmailFilter(e.target.value)} 
                                label="Email"/>
                        <FormControl >
                            <InputLabel>Rôle</InputLabel>
                            <Select
                                value={roleFilter}
                                onChange={e => setRoleFilter(e.target.value)}>
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={"student"}>Étudiant</MenuItem>
                                <MenuItem value={"teacher"}>Enseignant</MenuItem>
                                <MenuItem value={"reprography"}>Reprographie</MenuItem>
                                <MenuItem value={"admin"}>Administrateur</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel>Liste</InputLabel>
                            <Select
                                value={listFilter}
                                onChange={e => setListFilter(e.target.value)}>
                                <MenuItem value={""}></MenuItem>
                                {lists.map(l => {
                                    return <MenuItem key={Math.random()*1000} value={l.name}>{l.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Campus</InputLabel>
                            <Select
                                value={locationFilter}
                                onChange={e => setLocationFilter(e.target.value)}>
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={"Bourges"}>Bourges</MenuItem>
                                <MenuItem value={"Blois"}>Blois</MenuItem>
                            </Select>
                        </FormControl>
                    </View>
                </View>
            )
        } else {
            return (
                <Text style={styles.title}>Liste des utilisateurs</Text>
            )
        }
    }

    if (dataLoaded) {
        return (
            <ScrollView style={styles.scrollView}>
                <GoBackModule navigation={navigation}/>
                {platformHandle()}
                <Text>{errorMsg}</Text>
                <View>
                    {userList.map(user => {
                        return (
                            <UserModule key={user[0]} userProps={user} setDataLoaded={setDataLoaded}/>
                        )
                    })}
                </View>
            </ScrollView>
        )
    } else {
        return (
            <AppLoading
            startAsync={loadData()}
            onFinish={setDataLoaded(true)}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        textAlign : 'center'
    },
})

export default ManageUsersScreen;
