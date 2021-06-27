import React from 'react';
import axios from 'axios';
import {View, Text, Alert, Button} from 'react-native';

import constants from '../assets/globals/constants';
import { globalStyles } from '../assets/globals/globalStyles';

export default function ManageRequestForReprographyScreen({ route, navigation }){
    const item = route.params;

    const changeState = (item) => {
        var newState = 'Imprimer'
        var action = true
        if(item.item.state == 'pending'){
            console.log('Le sondage auprès des élèves n\'est pas fini')
        }
        else if(item.item.state == 'Imprimer'){
            newState = 'Pret'
        }
        else if(item.item.state == 'Pret'){
            newState = "Archiver"
        }
        else if(item.item.state == 'Archiver'){
            newState = "Supprimer"
        }
        else if(item.item.state == 'Supprimer'){
            var action = false
        }
        console.log(newState)
        if (action){
            let formData = new FormData();
            formData.append('id', item.item.request_id);
            formData.append('author', item.item.author_id);
            formData.append('deadline', item.item.deadline);
            formData.append('delivery_date', item.item.deadline); // delivery_date a un probleme
            formData.append('title', item.item.title);
            formData.append('comment', item.item.comment);
            formData.append('hidden', item.item.hidden);
            formData.append('state',  newState );
            axios.post(constants.updateRequest , formData, {
                headers: { "Content-Type" : "application/json" }
            })
            .then((reponse) => {
                console.log(reponse.data);
                if ('message' in reponse || 'data' in reponse) {
                    console.log('Trying to update the request now...');
                } else {
                    console.log('Internal error. Please try again or contact the support team');
                }
                navigation.push('DisplayAllRequestsForReprography')
            })
        } else {
            console.log("suppression des fichiers en cours ... "+item.item.request_id )
            axios.get(constants.deleteFile , {params: {'id' : item.item.files.id}}, {
                headers: { "Content-Type" : "application/json" }
            })
            console.log("suppression de la requete en cours ... "+item.item.request_id )
            axios.get(constants.deleteRequest , {params: {'id' : item.item.request_id}}, {
                headers: { "Content-Type" : "application/json" }
            })
            .then((reponse) => {
                console.log(reponse.data);
                if ('message' in reponse || 'data' in reponse) {
                    console.log('Trying to update the request now...');
                } else {
                    console.log('Internal error. Please try again or contact the support team');
                }
                navigation.push('DisplayAllRequestsForReprography')
            })
        }
        
    }

    return(
        <View style={globalStyles.container}>
            <Text>Auteur : {item.item.author_name}</Text>
            <Text>Auteur id: {item.item.author_id}</Text>
            <Text>Titre : {item.item.title}</Text>
            <Text>Pour le : {item.item.deadline}</Text>
            <Text>Recto Verso ? : {item.item.files.recto_verso}</Text>
            <Text>Couleur ? : {item.item.files.color}</Text>
            <Text>Format : {item.item.files.format}</Text>
            <Text>Nombre de Diapo par Page : {item.item.files.nb_per_page}</Text>
            <Text>Nombre d'agraphes : {item.item.files.stapple}</Text>
            <Text>Partiel ? : {item.item.hidden}</Text>
            <Text>Lieux : {item.item.files.path}</Text>
            <Text>Etat : {item.item.state}</Text>
            <Text>list : {item.item.list}</Text>
            <View style={globalStyles.backButton}>
                <Button title={item.item.state}  onPress={ () => {
                    console.log('avant appel'),
                    changeState(item),
                    console.log('apres appel')}}/>
                <Button title='retour'  onPress={ () => navigation.goBack()}/>
            </View>
        </View>
    )
}   