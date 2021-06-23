import React, {useState} from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import UploadForm from "../assets/modules/UploadFormModule";
import { globalStyles } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";

export default function RequestScreen({ route, navigation }) {  


  if (typeof route.params == 'undefined')
    return (
      <View>
        <UploadForm style={{height: Dimensions.get('window').height /1.2,}} />
        <Button style={{top: 90}} title='Fermer sans enregistrer'  onPress={() => navigation.goBack()}/>
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


