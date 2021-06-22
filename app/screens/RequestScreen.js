import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ navigation }) {

  const [list, setList] = useState([
    {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06/21', key: '1'},
    {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08/21', key: '2'},
    {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06/21', key: '3'},
    {title: 'Chapitre 4 Maths', author: 'fercqerc', comment:'rgsvges', expirationDate: '18/06/21', key: '4'},
    {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '18/06/21', key: '5'},
    {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06/21', key: '6'},
    {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08/21', key: '7'},
    {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06/21', key: '8'},
    {title: 'rskghj', author: 'fercqerc', comment:'rgsvges', expirationDate: '10/10/21', key: '9'},
    {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '01/12/21', key: '10'}
  ]);

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
      <Modal visible={modalVisible}>
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
        data={list}
        renderItem={({item}) => {
          let expirationDate = new Date(item.expirationDate)
          let now = new Date()
          if ( expirationDate < now) //WIP : date comparaison
          (
            <TouchableOpacity>
                <EditCard>
                    <Text style={globalStyles.titleText}>{ item.title }</Text>
                </EditCard>
            </TouchableOpacity>
          )
          else
          (
            <TouchableOpacity>
                <Card>
                    <Text style={globalStyles.titleText}>{ item.title }</Text>
                </Card>
            </TouchableOpacity>
          )
      }}
      />
    </View>
  );
}