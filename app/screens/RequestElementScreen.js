import React, {useState} from "react";
import { View, Text, Button, ScrollView} from "react-native";
import UploadForm from "../assets/modules/UploadFormModule";
import UpdateForm from "../assets/modules/UpdateFormModule";
import { globalStyles } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";

export default function RequestElementScreen({ route, navigation }) {  

  /*
    return(
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadlineDate}</Text>
                <View style={globalStyles.backButton}>
                    <Button title="Retour"  onPress={() => navigation.goBack()}/>
                </View>
            </View>
        </View>
    ) */

  //if (route.params.modify == 'no')
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
        <View>
          <UpdateForm params={{item : route.params.item}}/>
          <Button style={{top: 90}} title='Fermer sans enregistrer' onPress={() => navigation.goBack()}/>
        </View>
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
    /* return (
      <View style={globalStyles.container}>
        <RequestForm props={route.param.item}>
          <Text style={globalStyles.titleText}>
            Modifez une demande précédente
          </Text>
        </RequestForm>
        <Button style={styles.marginTop} title='Fermer sans enregistrer'  onPress={ () => navigation.goBack()}/>
        <Button style={styles.marginTop} title='Enregistrer les modifications'  onPress={ () => navigation.goBack()}/>
      </View> */
}


