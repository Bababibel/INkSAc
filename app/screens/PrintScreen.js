import React from 'react';
import axios from 'axios';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList, Platform} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';

import Card from '../assets/shared/RequestCard';
import constants from '../assets/globals/constants';
import Request from '../assets/classes/Request';
import File from '../assets/classes/File';
import { globalStyles } from '../assets/styles/global_styles';


export default function PrintScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState([]);

    const [requests, setRequests] = useState([]);

    const dataLoad = () => {
        console.log('chargement des données')
        axios.get(constants.getAllRequests)
        .then(response => {
            let data = response.data
            let tmpRequests = []
            response.data.data.forEach(e => {
                tmpRequests.push(new Request(e.id, e.author, e.author_name, e.deadline, e.delivery_date, e.expiration_date, e.title, e.comment, e.hidden, e.state))
            })
            tmpRequests.forEach(e => {
                axios.get(constants.getFilesFromRequest, {params: {'request_id': e.request_id}})
                .then(response => {
                    response.data.data.forEach(f => {
                        e.attachFile(new File(f.id, f.name, f.path, f.color, f.stapple, f.format, f.recto_verso, f.nb_per_page, f.request_id))
                    })
                })    
            })
            setRequests(tmpRequests)
        })
        
    }

    const changeState = (item) => {
        var newState = 'A imprimer'
        if(item.state == 'pending'){
            Alert.alert('Action impossible', 'Le sondage auprès des élèves n\'est pas encore fini')
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
        formData.append('delivery_date', item.deadline);
        formData.append('title', item.title);
        formData.append('comment', item.comment);
        formData.append('hidden', item.hidden);
        formData.append('state',  newState );
        axios.post('https://bgauthier.fr/inksac/api/request/updateRequest.php', formData, {
            headers: { "Content-Type" : "application/json" }
        })
        .then((response) => {
            if ('message' in response.data) {
                console.log('Trying to update the request now...');
                setRequests([])
                dataLoad()
            } else {
                console.log('Internal error. Please try again or contact the support team');
            }
        })
    }

    if (dataLoaded) {
        if(Platform.OS === 'web'){
            return (
                <View style={globalStyles.container}>
                    <FlatList
                        data={requests}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => navigation.navigate('PrintElement', { item : item })}>
                                <Card>
                                    <Text style={globalStyles.modalText}>{ item.title }</Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={globalStyles.backButton}>
                        <Button title='Logout' onPress={navigation.goBack}/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={globalStyles.container}>
                    <FlatList
                        data={requests}
                        renderItem={({item}) => (
                            <TouchableOpacity key={item.request_id} onPress={ () => {setSelected(item), setModalOpen(true)}}>
                                <Card>
                                    <Text style={globalStyles.modalText}>{ item.title }</Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                    <Modal visible={modalOpen} animationType='slide'>
                        <TouchableOpacity onPress={() => {console.log(selected), setModalOpen(false)}}>
                            <Text style={globalStyles.closeText}>Close</Text>
                        </TouchableOpacity>
                        <View style={globalStyles.modalText}>
                            <Text>id fichier: {selected.id}</Text>
                            <Text>id requete: {selected.request_id}</Text>
                            <Text>Auteur : {selected.author_name}</Text>
                            <Text>Titre Requete : {selected.title}</Text>
                            <Text>Titre Fichier : {selected.title}</Text>
                            <Text>Pour le : {selected.deadline}</Text>
                            <Text>Recto Verso ? : {selected.recto_verso}</Text>
                            <Text>Couleur ? : {selected.color}</Text>
                            <Text>Format : {selected.format}</Text>
                            <Text>Nombre de Diapo par Page : {selected.nb_per_page}</Text>
                            <Text>Nombre d'agraphes : {selected.stapple}</Text>
                            <Text>Partiel ? : {selected.hidden}</Text>
                            <Text>Lieux : {selected.path}</Text>
                            <Text>Etat : {selected.state}</Text>
                            <Button title={selected.state}  onPress={ () => {
                                setModalOpen(false),
                                changeState(selected)
                                }}
                            />
                        </View>
                    </Modal>
                    <View style={globalStyles.backButton}>
                        <Button title='Logout' onPress={navigation.goBack}/>
                    </View>
                </View>
            )
        }
    } else {
        return (
            <AppLoading
            startAsync={dataLoad} 
            onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
            onFinish={() => {setDataLoaded(true)}}
            />
        ) 
    }
}