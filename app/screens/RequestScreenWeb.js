import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Button } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import AppLoading from 'expo-app-loading';
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ navigation }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [selected, setSelected] = useState([
    {color: '', format: '', name: '', key: '', nb_per_page: '', recto_verso: '', stapple: ''}
  ]);

  const [info, setList] = useState([]);

  const dataLoad = () => {
    fetch('https://bgauthier.fr/inksac/api/file/getAllFiles.php')
    .then(reponse => reponse.json())
    .then((list) => {
        console.log(list)
        list.data.map((item) => {
            setList((prevItem) => {
                return [
                    {color: item.color, format: item.format, name: item.name, key: item.id, nb_per_page: item.nb_per_page, recto_verso: item.recto_verso, stapple: item.stapple}, 
                    ...prevItem];
            })
        })
    })
    .catch(() => {
        Alert.alert('erreur data');
    })
    .done()
}

 

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
          data={info}
          renderItem={({item}) => (
              <TouchableOpacity>
                <EditCard>
                  <Text style={globalStyles.titleText}>{item.name}</Text>
                </EditCard>
              </TouchableOpacity>
              )
          }
        />
        <View style={globalStyles.backButton}>
            <Button title='Logout' onPress={navigation.goBack}/>
        </View>
      </View>
    );
  } else {
    return (
      <AppLoading
      startAsync={dataLoad} 
      onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
      onFinish={() => {setDataLoaded(true)}}
      />
    ) 
  }
}
