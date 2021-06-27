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

var percentage =  0

export default function RequestScreen({ route, navigation }) {
  const id = route

  const [isData, setIsData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requests, setRequests] = useState([]);

  const dataLoad = () => {
    fetch(constants.getAllRequests)
    .then(reponse => reponse.json())
    .then((request) => {
      if ('data' in request){
        setIsData(true)
        let tmpRequete = []
        request.data.map((item) => {
          if(id.params.id == item.author){
            axios.get(constants.getFilesFromRequest , {params: {'request_id' : item.id}}, {
                        headers: { "Content-Type" : "application/json" }
                      })
            .then((files) => {
              if (typeof files.data != 'undefined'){
                files.data.data.map((item2) => {
                  if (typeof item2.message == 'undefined') {
                    const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id)
                    const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state)
                    newRequete.attachFile(newFile)
                    tmpRequete.push(newRequete)
                    setRequests((prevItem) => {
                        return [newRequete ,...prevItem];
                    })
                  }
                })
              }
            })
          }
        })}
    })
    .catch(() => {
        console.log("erreur");
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
      setModalVisible(true);
    }
  }

  if (dataLoaded && isData) {
    return(
      <ScrollView>
        <View>
        <GoBackModule navigation={navigation}/>
          <Text style={styles.inputContainer} >Liste de mes requètes</Text>
          
          <View style={globalStyles.container}>
            <TouchableOpacity>
              <Card>
                <Text
                  onPress={() => pressHandle()}>
                  Formulez une nouvelle demande
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
              {requests.map(request => {
                return (
                  <RequestModule clickHandle={clickHandle} key={request.id} requestProps={request} navigation={navigation}/>
                )
              })}
          <View>
            <MyModal page={'DisplayMyRequests'} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
          </View>
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
        <TouchableOpacity>
          <Card>
            <Text
              onPress={() => pressHandle()}>
              Formulez une nouvelle demande
            </Text>
          </Card>
        </TouchableOpacity>
        <MyModal page={'DisplayMyRequests'} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
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
})