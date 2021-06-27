import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  ScrollView
} from "react-native";
import axios from "axios";
import { globalStyles, globalColors } from "../assets/globals/globalStyles";
import AppLoading from "expo-app-loading";

import Request from "../assets/classes/Request";
import File from "../assets/classes/File";
import MyModal from "../assets/modules/ModalModule";
import EditCard from "../assets/shared/EditCard";
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
      if ('data' in request.data){
        setIsData(true)
        let tmpRequete = []
        request.data.map((item) => {
          console.log("route.id : "+id.params.id+'et item.id'+item.author)
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
    if(Platform.OS === 'web'){
      navigation.navigate("DisplayMyRequests", { item: item, modify: "just print" })
    } 
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
      <GoBackModule navigation={navigation}/>
      <View style={globalStyles.container}>
        <TouchableOpacity>
          <Card>
            <Text
              onPress={() => pressHandle()}>
              Formulez une nouvelle demande
            </Text>
          </Card>
        </TouchableOpacity>
        <FlatList
          data={requests}
          keyExtractor={(info, index) => info + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => clickHandle() }>
              <EditCard item = {item}>
                <Text style={globalStyles.cardIconText}>{item.title}</Text>
              </EditCard>
            </TouchableOpacity>
          )}
        />
          <MyModal page={'DisplayMyRequests'} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
      </View>
      
    </ScrollView>)
  } else {
    return (
      <View style={globalStyles.container}>
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


