import React, { Component, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import constants from "../globals/constants";
import { globalStyles } from "../styles/global_styles";

export default class EditCard extends Component {
  render(){
    console.log(this.props.item)
    console.log("this.props.item")
    //const navigation = useNavigation()
    console.log("this.props.item")
    return (
      console.log("this.props.item"),
      <View style={globalStyles.card}>
        <View style={globalStyles.cardIconContainer}>
          <Pressable
            style={globalStyles.cardIcon}
            onPress={() => navigation.navigate('RequestElement', { item : this.props.item, modify : 'yes'})}
          >
            <Text style={globalStyles.cardIconText}>Éditer</Text>
          </Pressable>
          <Pressable
            style={globalStyles.cardIcon}
            onPress={() => {
              Alert.alert(
                "Attention !",
                "Voulez-vous vraiment supprimer cette requête ?",
                [
                  {
                    text: "Annuler",
                    style: "cancel",
                    onPress:()=>{ console.log('request id : '+this.props.item)}
                  },
                  {
                    text: "Je suis sûr de moi",
                    onPress: () => {
                      axios.get(constants.deleteFile , {params: {'id' : this.props.item.files.id}}, {
                        headers: { "Content-Type" : "application/json" }
                      })
                      console.log("suppression de la requete en cours ... "+this.props.item.request_id )
                      axios.get(constants.deleteRequest , {params: {'id' : this.props.item.request_id}}, {
                        headers: { "Content-Type" : "application/json" }
                      })
                      console.log("Demande de suppresion de la requête d'id " + this.props.item.id)
                    },
                  },
                ]
              )
            }}
          >
            <Text style={globalStyles.cardIconText}>Supprimer</Text>
          </Pressable>
        </View>
        <View style={globalStyles.cardContent}>{this.props.children}</View>

      </View>
    );
  }
}
