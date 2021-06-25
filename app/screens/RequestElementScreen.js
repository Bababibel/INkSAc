import React, {useState} from "react";
import { View, Text, Button, ScrollView} from "react-native";
import UploadForm from "../assets/modules/UploadFormModule";
import { globalStyles } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";

export default function RequestElementScreen({ route, navigation }) {  

  if (!route.params || !route.params.item || route.params.modify == 'no') {
    return (
      <ScrollView>
        <UploadForm params={{route: route, navigation: navigation}}/>
        <Button style={{top: 90}} title='Fermer sans enregistrer' onPress={() => navigation.goBack()}/>
      </ScrollView>
    );
  }
  else {
    if (route.params.modify == 'yes') { 
       return (
        <ScrollView>
          <UpdateForm params={{item : route.params.item}}/>
          <Button style={{top: 90}} title='Fermer sans enregistrer' onPress={() => navigation.goBack()}/>
        </ScrollView>
        );
    }
    else {
      if (!route.params.item) {
        return (
          <View><Text>Pas de données</Text></View>
        )
      }
      else {
        let item = route.params.item;
        return (
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author_name}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadline}</Text>
                <View style={globalStyles.backButton}>
                    <Button title="Retour"  onPress={ () => navigation.goBack()}/>
                </View>
            </View>
        </View>
        )
      }
    }
  }
}


