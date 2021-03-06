import React, {useState} from "react";
import { View, Text, Button, ScrollView} from "react-native";
//import UpdateForm from "../assets/modules/UpdateFormModule";
import UploadForm from "../assets/modules/UploadFormModule"
import { globalStyles } from "../assets/globals/globalStyles";

export default function CreateOrUpdateRequestScreen({ route, navigation }) {  

  if (!route.params || !route.params.item || route.params.modify == 'no') {
    return (
      <ScrollView>
        <UploadForm route={route} navigation={navigation}/>
      </ScrollView>
    );
  }
  else {
    if (route.params.modify == 'yes') { 
       return (
        <ScrollView>
          {/*<UpdateForm route={route} navigation={navigation}/>*/}
          <Text>Fonctionnalité encore en développement et/ou instable. Une mise à jour devrait corriger le problème d'ici peu.</Text>
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


