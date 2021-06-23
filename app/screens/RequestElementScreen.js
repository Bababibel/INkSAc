import React, {useState} from "react";
import axios from 'axios';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Button, StyleSheet } from "react-native";
import UploadForm from "../assets/modules/UploadFormModule";
import { globalStyles } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";
import EditCard from "../assets/shared/EditCard";
import Card from "../assets/shared/RequestCard";
import { FontDisplay } from "expo-font";

export default function RequestScreen({ route, navigation }) {  


  if (typeof route.params == 'undefined')
    return (
      <UploadForm/>
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


