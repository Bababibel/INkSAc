import React, {useState} from "react";
import { View, Text, Button, ScrollView} from "react-native";
import UploadForm from "../assets/modules/UploadFormModule";
import UpdateForm from "../assets/modules/UpdateFormModule";
import { globalStyles } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";

export default function RequestElementScreen({ route, navigation }) {  

  if (typeof route.params == 'undefined') {
    return <Text>Votre page n'a pas réussi à charger : probablement une erreur de navigation :'(</Text>
  }

  const item = route.params.item;
  /*
    return(
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadlineDate}</Text>
                <View style={globalStyles.backButton}>
                    <Button title="Retour"  onPress={ () => navigation.goBack()}/>
                </View>
            </View>
        </View>
    ) */

  if (route.params.modify == 'no')
    return (
      <ScrollView>
        <UploadForm/>
        <Button style={{top: 90}} title='Fermer sans enregistrer' onPress={() => navigation.goBack()}/>
      </ScrollView>
      
    );
  else if (route.params.modify == 'yes')
   { 
     return (
      <View>
        <UpdateForm params={{item : item}}/>
        <Button style={{top: 90}} title='Fermer sans enregistrer' onPress={() => navigation.goBack()}/>
      </View>
      
    );}
  else
    return (
      <View>
          <View style={globalStyles.modalText}>
              <Text>Auteur : {item.author}</Text>
              <Text>Titre : {item.title}</Text>
              <Text>Pour le : {item.deadlineDate}</Text>
              <View style={globalStyles.backButton}>
                  <Button title="Retour"  onPress={ () => navigation.goBack()}/>
              </View>
          </View>
      </View>
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
    )
}


