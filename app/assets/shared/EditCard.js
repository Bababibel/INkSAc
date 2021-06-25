import React, { Component, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Pressable,
  Platform
} from "react-native";

import { globalStyles } from "../globals/globalStyles";
import { useNavigation } from '@react-navigation/native';
import constants from "../globals/constants";

export default class EditCard extends Component {
  render(){
    console.log('Je rentre item : item et je recois dans this.props : ')
    console.log(this.props)
    console.log('et décompose this.props.item : ')
    console.log(this.props.item)
    return (
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
              onPress={() => { if(Platform.OS === "android" || Platform.OS === 'ios'){
                  Alert.alert(
                    "Attention !",
                    "Voulez-vous vraiment supprimer cette requête ?",
                    [
                      {
                        text: "Annuler",
                        style: "cancel",
                        onPress:()=>{ console.log('file id: '+this.props.item.files.id) ,console.log('request id : '+this.props.item.request_id)}
                      },
                      {
                        text: "Je suis sûr de moi",
                        onPress: () => {
                          console.log("suppresion du fichier " + this.props.item.files.id)
                          axios.get(constants.deleteFile , {params: {'id' : this.props.item.files.id}}, {
                            headers: { "Content-Type" : "application/json" }
                          })
                          console.log("suppression de la requete en cours ... "+this.props.item.request_id )
                          axios.get(constants.deleteRequest , {params: {'id' : this.props.item.request_id}}, {
                            headers: { "Content-Type" : "application/json" }
                          })
                          .then((reponse) => {
                            console.log(reponse.data);
                            if ('message' in reponse || 'data' in reponse) {
                                console.log('Trying to update the request now...');
                            } else {
                                console.log('Internal error. Please try again or contact the support team');
                            }
                        })
                        }
                      }
                    ]
                  )}
                  else {
                    console.log("suppresion du fichier " + this.props.item.files.id)
                    axios.get(constants.deleteFile , {params: {'id' : this.props.item.files.id}}, {
                      headers: { "Content-Type" : "application/json" }
                    })
                    console.log("suppression de la requete en cours ... "+this.props.item.request_id )
                    axios.get(constants.deleteRequest , {params: {'id' : this.props.item.request_id}}, {
                      headers: { "Content-Type" : "application/json" }
                    })
                    .then((reponse) => {
                      console.log(reponse.data);
                      if ('message' in reponse || 'data' in reponse) {
                          console.log('Trying to update the request now...');
                      } else {
                          console.log('Internal error. Please try again or contact the support team');
                      }
                  })
                  }
              }}
          >
            <Text style={globalStyles.cardIconText}>Supprimer</Text>
          </Pressable>
        </View>
        <View style={globalStyles.cardContent}>{this.props.children}</View>
    </View>
    )
  }
}
      

