import React from 'react';
import axios from 'axios';
import { View, Text, Alert, StyleSheet, StatusBar, ScrollView, Dimensions, Platform } from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';

import RequestModule from '../assets/modules/RequestModule';
import GoBackModule from '../assets/modules/GoBackModule';
import constants from '../assets/globals/constants';
import Request from '../assets/classes/Request';
import File from '../assets/classes/File';
import { globalStyles } from '../assets/globals/globalStyles';


export default function DisplayAllRequestsForReprographyScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isData, setIsData] = useState(false);
    const [requests, setRequests] = useState([]);

    const dataLoad = () => {
        axios.get(constants.getAllRequests)
        .then((request) => {
            if ('data' in request.data){
                setIsData(true)
                let tmpRequete = []
                request.data.data.map((item) => {
                    axios.get(constants.getFilesFromRequest, {params: {'request_id': item.id}})
                    .then((file) => {
                        if ('data' in file.data){
                            file.data.data.map((item2) => {
                                console.log(item.list_names)
                                const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id)
                                const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state, item.list_names)
                                newRequete.attachFile(newFile)
                                tmpRequete.push(newRequete)
                                setRequests((prevItem) => {
                                    return [newRequete ,...prevItem];
                                })
                            })
                        }
                        else{
                            const newFile = new File('non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini')
                            const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, 'Pas de fichier', item.comment, item.hidden, item.state)
                            newRequete.attachFile(newFile)
                            tmpRequete.push(newRequete)
                            setRequests((prevItem) => {
                                return [newRequete ,...prevItem];
                            })
                        }
                    })    
                })
            }
        })
    }

    const clickHandle = () => {
        navigation.navigate("DisplayMyRequests", { item: item, modify: "just print" })
    } 

    if (dataLoaded && isData) {
        return (
            <ScrollView>
            <View>
            <GoBackModule navigation={navigation}/>
            <Text style={styles.titleText} >Liste de toutes les requètes</Text>
                {requests.map(request => {
                return (
                  <RequestModule clickHandle={clickHandle} key={request.id} requestProps={request} navigation={navigation}/>
                )
              })}
            </View>
            </ScrollView>
        )
    } else {
        return (
            <View style={globalStyles.container}>
            <GoBackModule navigation={navigation}/>
            <AppLoading
            startAsync={dataLoad} 
            onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
            onFinish={() => setDataLoaded(true)}
            />
            <Text style={globalStyles.modalText}>Il n'y a aucune requète pour le moment</Text>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        textAlign:'center',
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: '100%',
        flex: 1,
        flexBasis: 100,
        marginRight: 5,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 20,
    },
    container: {
        flex: 1,
        flexGrow: 1,
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingLeft: 30,
        paddingRight : 30,
        justifyContent : "center",
        alignItems : "center",
        minWidth : Platform.OS === "web" ? Dimensions.get('window').width / 4 : Dimensions.get('window').width,
    },
    titleText: {
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
  }
  })