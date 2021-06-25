import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Modal,
  Alert,
  Button,
  Platform,
} from "react-native";
import AppLoading from "expo-app-loading";

import Request from "../assets/classes/Request";
import File from "../assets/classes/File";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";
import constants from "../assets/globals/constants";

var percentage =  0

export default function RequestScreen({ route, navigation }) {
  const id = route
  console.log(id)
  const [dataLoaded, setDataLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [requests, setRequests] = useState([]);

  const dataLoad = () => {
    
    fetch(constants.getAllRequests)
    .then(reponse => reponse.json())
    .then((request) => {
      let tmpRequete = []
        request.data.map((item) => {
          console.log("route.id : "+id.params.id+'et item.id'+item.id)
          if(id.param.id == item.id){
            print('pass')
          fetch(constants.getFilesFromRequest + "?request_id=" + item.id)
          .then(reponse => reponse.json())
          .then((files) => {
            if (typeof files.data != 'undefined')
              files.data.map((item2) => {
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
          })
        }})
    })

    .catch(() => {
        Alert.alert('erreur data');
    })
    .done()
  }

  if (dataLoaded) {
    if (Platform.OS === "web") {
      return (
        //console.log(requests),
        <View style={globalStyles.container}>
          <TouchableOpacity>
            <Card>
              <Text
                style={globalStyles.titleText}
                onPress={() =>{
                  navigation.navigate("RequestElement", { 
                    modify: "no" })}
                }>
                Formulez une nouvelle demande
              </Text>
            </Card>
          </TouchableOpacity>

          <FlatList
            data={requests}
            renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      {console.log('bite'),
                      navigation.navigate("RequestElement", {
                        item: item,
                        modify: "just print",
                      })}
                    }
                  >
                    <EditCard item={item}>
                      <Text style={globalStyles.cardIconText}>{item.title}</Text>  
                    </EditCard>
                  </TouchableOpacity>
                )
              }
            renderSectionHeader={({ section: { title } }) => {
              if (title && title != 'undefined')
                return (
                  <Text>bite</Text>
                )
              else 
                return (
                  <Text>Cette requête n'a pas encore de titre</Text>
                )
            }
            }
          />
          <View style={globalStyles.backButton}>
            <Button title="Logout" onPress={navigation.goBack} />
          </View>
        </View>
      )
          } else {
      return (
        <View style={globalStyles.container}>
          <TouchableOpacity>
            <Card>
              <Text
                style={globalStyles.titleText}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                Formulez une nouvelle demande
              </Text>
            </Card>
          </TouchableOpacity>
          <Modal visible={modalVisible} animationType="slide">
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={globalStyles.closeText}>
                Fermer sans enregistrer
              </Text>
            </TouchableOpacity>
            <RequestForm>
              <Text style={globalStyles.titleText}>
                Formulez une nouvelle demande
              </Text>
            </RequestForm>
          </Modal>
          <FlatList
            data={requests}
            keyExtractor={(info, index) => info + index}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <EditCard item = {item}>
                  <Text style={globalStyles.cardIconText}>{item.title}</Text>
                </EditCard>
              </TouchableOpacity>
            )}
          />
          <View style={globalStyles.backButton}>
            <Button title="Logout" onPress={navigation.goBack} />
          </View>
        </View>
      )
    }
  } else {
    return (
      <AppLoading
        startAsync={dataLoad}
        onError={(text) =>
          Alert.alert("Échec du chargement :(", String(text), [{ text: "Ok" }])
        }
        onFinish={() => {
          setDataLoaded(true);
        }}
      />
    )
  }
}
