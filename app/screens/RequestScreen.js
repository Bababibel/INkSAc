import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ navigation }) {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const dataLoad = () => {
    fetch("https://bgauthier.fr/inksac/api/request/getAllRequests.php")
      .then((reponse) => reponse.json())
      .then((list) => {
        console.log("requetes recues : \n");
        console.log(list.data);
        //console.log(list.data);
        return list.data;
      })
      .catch(() => {
        Alert.alert("erreur data");
      });
  };

  const data = dataLoad();
  console.log("\nliste : \n" + data);

  const [modalVisible, setModalVisible] = useState(false);

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
        data={
          fetch(
            "https://bgauthier.fr/inksac/api/request/getAllRequests.php"
          ).json().data
        }
        renderItem={({ item }) => (
          <TouchableOpacity>
            <EditCard>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </EditCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
