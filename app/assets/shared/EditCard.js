import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
} from "react-native";

import { globalStyles } from "../globals/globalStyles";

import { useNavigation } from '@react-navigation/native';

export default function EditCard (props) {

  const navigation = useNavigation()

  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardIconContainer}>
        <Pressable
          style={globalStyles.cardIcon}
          onPress={() => navigation.navigate('DisplayMyRequests', { item : props.item, modify : 'yes'})}
        >
          <Text style={globalStyles.cardIconText}>Éditer</Text>
        </Pressable>
        <Pressable
          style={globalStyles.cardIcon}
          onPress={() =>
            Alert.alert(
              "Attention !",
              "Voulez-vous vraiment supprimer cette requête ?",
              [
                {
                  text: "Annuler",
                  style: "cancel",
                },
                {
                  text: "Je suis sûr de moi",
                  onPress: () => {
                    console.log("Demande de suppresion de la requête d'id " + props.id)
                  },
                },
              ]
            )
          }
        >
          <Text style={globalStyles.cardIconText}>Supprimer</Text>
        </Pressable>
      </View>
      <View style={globalStyles.cardContent}>{props.children}</View>
    </View>
  );
}
