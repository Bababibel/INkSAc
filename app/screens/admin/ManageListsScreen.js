import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

import constants from '../../assets/globals/constants';
import ListModule from '../../assets/modules/ListModule';
import GoBackModule from '../../assets/modules/GoBackModule';
import ListFormModule from '../../assets/modules/ListFormModule';

// Will contain all lists, displayed or not
let globalLists = [];

function ManageListsScreen({ navigation }) {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [lists, setLists] = useState([]);


    const loadData = () => {
        setLists([]);
        globalLists = [];
        axios.get(constants.getAllLists)
        .then(response => {
            if ('data' in response.data) {
                response.data.data.map(l => {
                    let tmpList = [l.id, l.name, l.theorical_count, l.creation_date, l.location];
                    setLists(lists => [...lists, tmpList]);
                });
            }
            else if ('message' in response.data) setErrorMsg("Erreur: "+response.message);
            else setErrorMsg("Le serveur ne répond pas");
        })
    }



    if (dataLoaded) {
        return (
            <ScrollView>
                <GoBackModule navigation={navigation}/>
                <Text style={styles.titleText}>Gérer les listes</Text>
                <Text>{errorMsg}</Text>

                <ListFormModule reloadData={loadData}/>

                <View>
                    {lists.map(list => {
                        return (
                            <ListModule key={list[0]} listProps={list}/>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <AppLoading
            startAsync={loadData()}
            onFinish={setDataLoaded(true)}
            />
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        textAlign:'center',
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: '100%',
        flex: 1,
        flexBasis: 100,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 20,
    },
    titleText: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    }

})

export default ManageListsScreen;
