import React from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Button } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import AppLoading from 'expo-app-loading';
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ route, navigation }) {  
  console.log('##############################')
  console.log(route.params)
  console.log('##############################')
  if (typeof route.params == 'undefined')
    return (
      <View style={globalStyles.container}>
          <Text style={globalStyles.titleText}>
            Formulez une nouvelle demande
          </Text>
          <form action="/inksac/api/upload.php" method="post" encType="multipart/form-data">
            <label>Titre du fichier
              <input type="text" name="fileName"/> 
            </label>
            <label>Deadline souhaitée
              <input type="date" name="deadline"/> 
            </label>
            <label>Date d'impression souhaitée
              <input type="date" name="printDate"/> 
            </label>
            <label>Commentaire
              <input type="text" name="comment"/> 
            </label>
            <input type="file" name="fileToUpload" id="fileToUpload"/> 
            <input type="submit" value="Enregistrer les informations" name="submit"/>
          </form>
          <Button title='Fermer sans enregistrer'  onPress={ () => navigation.goBack()}/>
      </View>
    );
  else 
    return (
      <View style={globalStyles.container}>
        <RequestForm props={route.param.item}>
          <Text style={globalStyles.titleText}>
            Modifez une demande précédente
          </Text>
        </RequestForm>
        <Button title='Fermer sans enregistrer'  onPress={ () => navigation.goBack()}/>
        <Button title='Enregistrer les modifications'  onPress={ () => navigation.goBack()}/>
      </View>
    )
}
