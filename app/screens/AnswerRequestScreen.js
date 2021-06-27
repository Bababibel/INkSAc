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

import File from "../assets/classes/File";
import constants from "../assets/globals/constants";
import GoBackModule from "../assets/modules/GoBackModule";
import { CheckboxesList, Checkbox } from "../assets/modules/CheckboxesList";

function SaveChoice(files, choice) {
  axios.post(constants.getFilesFromRequest , {params: {"request_id" : request_id}}, {
    headers: {"Content-Type" : "application/json"}
  })
}

export default function AnswerRequestScreen({ route, navigation }) {
  const request_id = route.params.id;

  const [isData, setIsData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [files, setFiles] = useState([]);

  const dataLoad = () => {
    axios.get(constants.getFilesFromRequest , {params: {"request_id" : request_id}}, {
      headers: {"Content-Type" : "application/json"}
    })
    .then((files) => {
      if (typeof files.data != 'undefined' && typeof files.data.data != 'undefined'){
        files.data.data.map((item2) => {
          if (typeof item2.message == 'undefined') {
            const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id);
            setFiles((prevItem) => {
                return [newFile ,...prevItem];
            })
          }
        })
      }
    })
    .catch(() => {
        console.log("Error while loading files from request!");
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
        <Button title='Sauvegarder' onPress={() => SaveChoice(files, choice)}/>
        <FlatList
          data={files}
          keyExtractor={(info, index) => info + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => clickHandle() }>
              <Checkbox item = {item}/>
            </TouchableOpacity>
          )}
        />
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
        <Text style={globalStyles.modalText}>Aucun fichier dans la requête !</Text>
        <TouchableOpacity>
          <Text
            onPress={() => pressHandle()}>
            Actualiser
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
