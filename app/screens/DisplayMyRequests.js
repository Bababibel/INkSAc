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
  Dimensions
} from "react-native";
import axios from "axios";
import { globalStyles, globalColors } from "../assets/globals/globalStyles";
import AppLoading from "expo-app-loading";

import Request from "../assets/classes/Request";
import File from "../assets/classes/File";
import MyModal from "../assets/modules/ModalModule";
import RequestModule from "../assets/modules/RequestModule";
import Card from "../assets/shared/RequestCard";
import constants from "../assets/globals/constants";
import GoBackModule from "../assets/modules/GoBackModule";


export default function RequestScreen({ route, navigation }) {
  const id = route

  let loadRequestsApiUrl = constants.globalUser.role == 'student' ? constants.getRequestsForUser : constants.getRequestsByAuthor;

  const [isData, setIsData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [requests, setRequests] = useState([]);

  const dataLoad = () => {
    console.log("id : "+constants.globalUser.id)
    console.log("role : "+constants.globalUser.role)
    console.log("url : "+loadRequestsApiUrl)
    axios.get(loadRequestsApiUrl , {params: {'id' : constants.globalUser.id}}, {
      headers: { "Content-Type" : "application/json" }
    })
    .then((request) => {
      console.log("c'est passé")
      if ("data" in request.data){
        setIsData(true)
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
                  setRequests((prevItem) => {
                      return [newRequete ,...prevItem];
                  })
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
        <Card>
          <Text
            onPress={() => pressHandle()}>
            Formulez une nouvelle demande
          </Text>
        </Card>
      </TouchableOpacity>
      )
    }
  }

  if (dataLoaded && isData) {
    return(
      <ScrollView>
        <View>
        <GoBackModule navigation={navigation}/>
          <Text style={styles.titleText} >Liste de mes requètes</Text>
          <View style={globalStyles.container}>
            {roleHandle()}
          </View>
              {requests.map(request => {
                return (
                  <RequestModule clickHandle={clickHandle} key={request.request_id} requestProps={request} navigation={navigation}/>
                )
              })}
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
        <Text style={globalStyles.modalText}> Vous n'avez aucune requète</Text>
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