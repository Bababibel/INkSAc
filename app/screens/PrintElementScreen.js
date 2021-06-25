import React from 'react';
import axios from 'axios';
import {View, Text, Alert, Button} from 'react-native';
import constants from '../assets/globals/constants';
import { globalStyles } from '../assets/styles/global_styles';
import constants from '../assets/globals/constants';

export default function PrintElementScreen({ route, navigation }){
    const item = route.params;
    console.log(item.item.author_name)
    console.log(item)

    const changeState = (item) => {
        console.log(item)
        var newState = 'A Imprimer'
        if(item.state == 'pending'){
            console.log('Le sondage auprès des élèves n\'est pas fini')
        }
        else if(item.state == 'A Imprimer'){
            newState = 'Pret'
        }
        else if(item.state == 'Pret'){
            newState = "archivé"
        }
        else {
            newState = "pending"
        }
        let formData = new FormData();
        formData.append('id', item.request_id);
        formData.append('author', item.author_id);
        formData.append('deadline', item.deadline);
        formData.append('delivery_date', item.delivery_date);
        formData.append('title', item.title);
        formData.append('comment', item.comment);
        formData.append('hidden', item.hidden);
        formData.append('state',  newState );
        axios.post(constants.updateRequest , formData, {
            headers: { "Content-Type" : "application/json" }
        })
        .then((reponse) => {
            console.log(reponse);
            if ('message' in reponse || 'data' in reponse) {
                console.log('Trying to update the request now...');
            } else {
                console.log('Internal error. Please try again or contact the support team');
            }
            navigation.push('Print')
        })
    }

    return(
        <View style={globalStyles.modalText}>
            <Text>Auteur : {item.item.author_name}</Text>
            <Text>Titre : {item.item.title}</Text>
            <Text>Pour le : {item.item.deadline}</Text>
            <Text>Recto Verso ? : {item.item.recto_verso}</Text>
            <Text>Couleur ? : {item.item.color}</Text>
            <Text>Format : {item.item.format}</Text>
            <Text>Nombre de Diapo par Page : {item.item.nb_per_page}</Text>
            <Text>Nombre d'agraphes : {item.item.stapple}</Text>
            <Text>Partiel ? : {item.item.hidden}</Text>
            <Text>Lieux : {item.item.path}</Text>
            <Text>Etat : {item.item.state}</Text>
            <View style={globalStyles.backButton}>
                <Button title={item.item.state}  onPress={ () => {
                    console.log('avant appel'),
                    changeState(item.item),
                    console.log('apres appel')}}/>
                <Button title='retour'  onPress={ () => navigation.goBack()}/>
            </View>
        </View>
    )
}   