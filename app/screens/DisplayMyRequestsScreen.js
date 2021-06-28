import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Button
} from "react-native";
import axios from "axios";
import { globalStyles, globalColors } from "../assets/globals/globalStyles";
import AppLoading from "expo-app-loading";

import Request from "../assets/classes/Request";
import File from "../assets/classes/File";
import RequestModule from "../assets/modules/RequestModule";
import constants from "../assets/globals/constants";
import GoBackModule from "../assets/modules/GoBackModule";
import {computeDateTimeForSql} from '../assets/tools/dateConverter';

export default function RequestScreen({ route, navigation }) {
  const id = route

  let now = computeDateTimeForSql(new Date(), new Date())
  let loadRequestsApiUrl = constants.globalUser.role == 'student' ? constants.getRequestsForUser : constants.getRequestsByAuthor;

  const [isData, setIsData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [toPrintRequests, setToPrintRequests] = useState([]);
  const [readyRequests, setReadyRequests] = useState([]);

  const dataLoad = () => {
    axios.get(loadRequestsApiUrl , {params: {'id' : constants.globalUser.id}}, {
      headers: { "Content-Type" : "application/json" }
    })
    .then((request) => {
      if ("data" in request.data){
        let tmpRequete = []
        request.data.data.map((item) => {
          axios.get(constants.getFilesFromRequest , {params: {'request_id' : item.id}}, {
                      headers: { "Content-Type" : "application/json" }
                    })
          .then((files) => {
            if (typeof files.data != 'undefined'){
              files.data.data.map((item2) => {
                if (typeof item2.message == 'undefined') {
                  const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id)
                  const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state, item.list_names)
                  newRequete.attachFile(newFile)
                  tmpRequete.push(newRequete)
                  if (newRequete.deadline > now){ //Pending Requests
                    setIsData(true)
                    setPendingRequests((prevItem) => {
                        return [newRequete ,...prevItem];
                    })
                  } 
                  else if (newRequete.state != 'ready') { //To be printed requests
                    if (constants.globalUser.role != 'student') {setIsData(true)}
                    setToPrintRequests((prevItem) => {
                      return [newRequete ,...prevItem];
                    })
                  }
                  else { //Ready requests
                    if (constants.globalUser.role != 'student') {setIsData(true)}
                    setReadyRequests((prevItem) => {
                      return [newRequete ,...prevItem];
                    })
                  }
                }
              })
            }
          })
        })}
    })
    .done()
  }

  const clickHandle = () => {
      navigation.navigate("DisplayMyRequests", { item: item, modify: "just print" })
    } 

  const pressHandle = () => {
    if(Platform.OS === 'web'){
      navigation.navigate("CreateOrUpdateRequest", { 
        modify: "no" });
    } else {
      Alert.alert('Fonctionnalité indisponnible', 'Cette fonctionalité n\'est pas disponible pour cette platformne, utilisez un ordinateur afin de formuler une nouvelle demande')
    }
  }

  const roleHandle = () => {
    if(constants.globalUser.role == 'student') return (null)
    else {
      return(
      <TouchableOpacity>
        <Button
            onPress={() => pressHandle()}
            title="Formulez une nouvelle demande"
            color={globalColors.primary} />
      </TouchableOpacity>
      )
    }
  }


  if (dataLoaded && isData) {
    return(
      <ScrollView>
        <View>
        <GoBackModule navigation={navigation}/>
          <Text style={styles.titleText}>Demandes</Text>
          <View style={globalStyles.container}>
            {roleHandle()}
          </View>
          <Text >En cours</Text>
              { pendingRequests.map(request => {
                  return (
                    <RequestModule clickHandle={clickHandle} key={request.request_id} goBack={'DisplayMyRequests'} requestProps={request} navigation={navigation}/>
                  )
                })
              }
          <Text >En Attente</Text>
            { toPrintRequests.map(request => {
                return (
                  <RequestModule clickHandle={clickHandle} key={request.request_id} goBack={'DisplayMyRequests'} requestProps={request} navigation={navigation}/>
                )
              })
            }
          <Text >Pret</Text>
          { readyRequests.map(request => {
              return (
                <RequestModule clickHandle={clickHandle} key={request.request_id} goBack={'DisplayMyRequests'} requestProps={request} navigation={navigation}/>
              )
            })
          }
        </View>
      </ScrollView>)
  } else {
    return (
      <View style={styles.container}>
        <AppLoading
          startAsync={dataLoad}
          onError={(text) => Alert.alert("Échec du chargement :(", String(text), [{ text: "Ok" }])}
          onFinish={() => setDataLoaded(true)}
        />
        <GoBackModule navigation={navigation}/>
        <Text style={globalStyles.modalText}> Vous n'avez aucune requête</Text>
        {roleHandle()}
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
    margin: 10,
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