import React from 'react';
import axios from 'axios';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList, Platform} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import constants from '../assets/globals/constants';
import { globalStyles } from '../assets/styles/global_styles';


export default function PrintScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState([]);

    const [info, setList] = useState([]);

    const dataLoad = () => {
        fetch(constants.getAllRequests)
        .then(reponse => reponse.json())
        .then((request) => {
            request.data.map((item) => {
                fetch(constants.getFilesFromRequest+'?request_id='+item.id)
                .then(reponse => reponse.json())
                .then((file) => {
                    file.data.map((item2) => {
                        //console.log(item2)
                        setList((prevItem) => {
                            return [
                                {key: item2.id, file_id: item2.id , deadline: item.deadline, author_name: item.author_name, author_id: item.author, request_id : item.id, delivery_date: item.delivery_date, title: item2.name, comment: item.comment, hidden: item.hidden, state: item.state, color: item2.color, format: item2.format, nb_per_page: item2.nb_per_page, recto_verso: item2.recto_verso, stapple: item2.stapple, path: item2.path}, 
                                ...prevItem];
                        })
                    })
                })
                    
            })
        })
        .catch(() => {
            Alert.alert('erreur data');
        })
        .done()
    }

    const changeState = async (item) => {
        //console.log(item)
        var newState = ''
        if(item.state == 'pending'){
            newState = "A Imprimer"
        }
        else if(item.state == 'A Imprimer'){
            newState = 'Pret'
        }
        else{
            newState = "archivé"
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
        .then((reponse) => {
            console.log(reponse.data);
            if ('message' in reponse.data) {
                console.log('Trying to update the request now...');
                setList([])
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
                        data={info}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => {
                                console.log(item),
                                navigation.navigate('PrintElement', { 
                                    author_name : item.author_name,
                                    comment : item.comment,
                                    delivery_date : item.delivery_date,
                                    deadline : item.deadline,
                                    hidden : item.hidden,
                                    key : item.key,
                                    state : item.state,
                                    title : item.title,
                                    color: item.color,
                                    format: item.format,
                                    nb_per_page: item.nb_per_page,
                                    recto_verso: item.recto_verso, 
                                    stapple: item.stapple, 
                                    path: item.path
                                })}}>
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
                    <Modal visible={modalOpen} animationType='slide'>
                        <TouchableOpacity onPress={() => setModalOpen(false)}>
                            <Text style={globalStyles.closeText}>Close</Text>
                        </TouchableOpacity>
                        <View style={globalStyles.modalText}>
                            <Text>id fichier: {selected.file_id}</Text>
                            <Text>id requete: {selected.request_id}</Text>
                            <Text>Auteur : {selected.author_name}</Text>
                            <Text>Titre : {selected.title}</Text>
                            <Text>Pour le : {selected.deadline} {/* Attention, deadline au lieu de delivery_date car seule date qui marche actuellement ...*/} </Text>
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
                    <FlatList
                        data={info}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => {setModalOpen(true), setSelected(item)}}>
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