import React from 'react';
import axios from 'axios';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList} from 'react-native';
import { globalStyles } from '../assets/styles/global_styles';
import constants from '../assets/globals/constants';

export default function PrintElementScreen({ route, navigation }){
    const item = route.params;

    const changeState = async (item) => {
        var newState = ''
        if(item.state == 'pending'){
            newState = "A Imprimer"
        }
        else if(item.state == 'A Imprimer'){
            newState = 'Pret'
        }
        else{
            newState = "pending"
        }
        let formData = new FormData();
        formData.append('id', item.request_id);
        formData.append('author', item.author_id);
        formData.append('deadline', item.deadline);
        formData.append('delivery_date', item.deadline);
        formData.append('title', item.title);
        formData.append('comment', item.comment);
        formData.append('hidden', item.hidden);
        formData.append('state',  newState );
        axios.post(constants.updateRequest, formData, {
            headers: { "Content-Type" : "application/json" }
        })
        .then((reponse) => {
            console.log(reponse.data);
            if ('message' in reponse.data) {
                console.log('Trying to update the request now...');
            } else {
                console.log('Internal error. Please try again or contact the support team');
            }
            navigation.goBack()
        })
    }

    return(
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadline}  {/* Attention, deadline au lieu de delivery_date car seule date qui marche actuellement ...*/}</Text>
                <Text>Recto Verso ? : {item.recto_verso}</Text>
                <Text>Couleur ? : {item.color}</Text>
                <Text>Format : {item.format}</Text>
                <Text>Nombre de Diapo par Page : {item.nb_per_page}</Text>
                <Text>Nombre d'agraphes : {item.stapple}</Text>
                <Text>Partiel ? : {item.hidden}</Text>
                <Text>Lieux : {item.path}</Text>
                <Text>Etat : {item.state}</Text>
                <View style={globalStyles.backButton}>
                    <Button title={item.state}  onPress={ () => changeState(item)}/>
                    <Button title='retour'  onPress={ () => navigation.goBack()}/>
                </View>
            </View>
        </View>
    )
}   