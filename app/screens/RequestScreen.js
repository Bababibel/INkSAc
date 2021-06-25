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
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import AppLoading from "expo-app-loading";
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";
import constants from "../assets/globals/constants";

var percentage =  0

export default function RequestScreen({ navigation }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  /*
  const dataLoad = () => {
    fetch("https://bgauthier.fr/inksac/api/request/getAllRequests.php")
      .then((reponse) => reponse.json())
      .then((list) => {
        list.data.map((item) => {
          setList((prevItem) => {
            console.log(item)
            return [
              {
                key: item.id,
                deadline: item.deadline,
                author: item.author_name,
                author_id: item.id,
                delivery_date: item.delivery_date,
                title: item.name,
                comment: item.comment,
                hidden: item.hidden,
                state: item.state,
              },
              ...prevItem,
            ];
          });
        });
      })
      .catch(() => {
        Alert.alert("erreur data");
      });
  }; /**/

  const dataLoad = () => {
    fetch(constants.getAllRequests)
    .then(reponse => reponse.json())
    .then((request) => {
        request.data.map((item) => {
          fetch(constants.getFilesFromRequest + "?request_id=" + item.id)
          .then(reponse => reponse.json())
          .then((files) => {
            if (typeof files.data != 'undefined')
              files.data.map((item2) => {
                if (typeof item2.message == 'undefined') {
                  percentage+=(100/19)
                  console.log(percentage + '% chargés')
                  /* console.log('info'+info+'cool')
                  console.log({
                    title: item.id,
                    data : [
                      {requestid : item.id, key: item2.id, deadline: item.deadline, author: item.author_name, delivery_date: item.delivery_date, title: item2.name, comment: item.comment, hidden: item.hidden, state: item.state, color: item2.color, format: item2.format, nb_per_page: item2.nb_per_page, recto_verso: item2.recto_verso, stapple: item2.stapple, path: item2.path}, 
                      ]
                    }) */
                  setList((prevItem) => {
                      return [{
                        title: item.title,
                        id: item.id,
                        data : [
                          {requestid : item.id, key: item2.id, deadline: item.deadline, author: item.author_name, delivery_date: item.delivery_date, title: item2.name, comment: item.comment, hidden: item.hidden, state: item.state, color: item2.color, format: item2.format, nb_per_page: item2.nb_per_page, recto_verso: item2.recto_verso, stapple: item2.stapple, path: item2.path}, 
                          ]
                        },
                      ...prevItem]
                  })
                }
              })
          })
        })
    })

    .catch(() => {
        Alert.alert('erreur data');
    })
    .done()
  } /**/

 /*  const info = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"]
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"]
    }
  ]; */

  //const [info, setList] = useState([{title: 0, data: ['coucou1', 'coucou2']}]);
  const [info, setList] = useState([]);

  if (dataLoaded) {
    if (Platform.OS === "web") {
      return (
        <View style={globalStyles.container}>
          <TouchableOpacity>
            <Card>
              <Text
                style={globalStyles.titleText}
                onPress={() =>
                  navigation.navigate("RequestElement", { 
                    modify: "no" })
                }>
                Formulez une nouvelle demande
              </Text>
            </Card>
          </TouchableOpacity>
          <SectionList
            sections={info}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("RequestElement", {
                        item: item,
                        modify: "just print",
                      })
                    }
                  >
                    <EditCard item={item}>
                      <Text style={globalStyles.modalText}>{item.title}</Text>
                    </EditCard>
                  </TouchableOpacity>
                )
              }
            renderSectionHeader={({ section: { title } }) => {
              if (title && title != 'undefined')
                return (
                  <Text>{title}</Text>
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
      );
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
            data={info}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <EditCard>
                  <Text style={globalStyles.titleText}>{item.name}</Text>
                </EditCard>
              </TouchableOpacity>
            )}
          />
          <View style={globalStyles.backButton}>
            <Button title="Logout" onPress={navigation.goBack} />
          </View>
        </View>
      );
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
    );
  }
}
