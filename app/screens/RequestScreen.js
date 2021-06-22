import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import AppLoading from 'expo-app-loading';
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ navigation }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  const dataLoad = () => {
    fetch("https://bgauthier.fr/inksac/api/request/getAllRequests.php")
      .then((reponse) => {
        const data = reponse.data;
        this.setState({posts: data});
      })
      .catch(() => {
        Alert.alert("erreur data");
      });
  };

  const [list, setList] = useState([
    {title: '', author: '', comment:'', expirationDate: '', key: '1'}
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  if (dataLoaded) {
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
          <Text style={globalStyles.closeText}>Fermer sans enregistrer</Text>
        </TouchableOpacity>
        <RequestForm>
          <Text style={globalStyles.titleText}>
            Formulez une nouvelle demande
          </Text>
        </RequestForm>
      </Modal>
      <FlatList
        data={data}
        renderItem={({item}) => (
            <TouchableOpacity>
              <EditCard>
                <Text style={globalStyles.titleText}>{item.title}</Text>
              </EditCard>
            </TouchableOpacity>
            )
        }
      />
    </View>
  );}
  else {
    return (
      <AppLoading
      startAsync={dataLoad} 
      onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
      onFinish={() => {setDataLoaded(true)}}
      />
  ) 
  }
}
