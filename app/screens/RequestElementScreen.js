import React from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Button, StyleSheet } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
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
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload"/> 
            <input type="submit" value="Upload Image" name="submit"/>
          </form>
          <Button style={styles.marginTop} title='Fermer sans enregistrer'  onPress={ () => navigation.goBack()}/>
          <Button style={styles.marginTop} title='Enregistrer les modifications'  onPress={ () => navigation.goBack()}/>
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
        <Button style={styles.marginTop} title='Fermer sans enregistrer'  onPress={ () => navigation.goBack()}/>
        <Button style={styles.marginTop} title='Enregistrer les modifications'  onPress={ () => navigation.goBack()}/>
      </View>
    )
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10,
  }
});
