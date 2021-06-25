import React, { useState } from 'react';
import axios from 'axios';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Alert, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';

import { globalStyles } from '../assets/styles/global_styles';
import Request from '../assets/classes/Request';
import File from '../assets/classes/File';
import constants from '../assets/globals/constants';
import Card from '../assets/shared/RequestCard';


export default function ChooseScreen({ route, navigation }){
    const list_name = route.params;
    console.log(list_name.list);

    const [dataLoaded, setDataLoaded] = useState(false);

    const [selected, setSelected] = useState(
        {author: '', comment: '', expiration_date: '', key: '', state: '', title: ''});

    const [info, setList] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const dataLoad = () => {
        axios.get(constants.getRequestsForList, {params: {'list_name': list_name.list}})
        .then((request) => {
            request.data.data.map((item) => {
                axios.get(constants.getFilesFromRequest, {params: {'request_id': item.id}})
                .then((file) => {
                    if (file.data.message == undefined){
                        file.data.data.map((item2) => {
                            const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id)
                            const newRequete = new Request(item.id, item.author_id, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state)
                            newRequete.attachFile(newFile)
                            setList((prevItem) => {
                                return [newRequete ,...prevItem];
                            })
                        })
                    }
                    else{
                        const newFile = new File('non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini')
                        const newRequete = new Request(item.id, item.author_id, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state)
                        newRequete.attachFile(newFile)
                        setList((prevItem) => {
                            return [newRequete ,...prevItem];
                        })
                    }
                })
                    
            })
        })        
    }

    if (dataLoaded) {
        if(Platform.OS === 'web'){
            Alert.alert('Merci !', 'Grâce à vous, 504 polycopiés ont été économisés. Cela représente 1000000 tonnes de CO2');
            return (
                <View style={globalStyles.container}>
                    <FlatList
                        data={info}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => navigation.navigate('ChooseElement', { item : item })}>
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
                            <Text>Auteur : {selected.author_name}</Text>
                            <Text>Titre : {selected.title}</Text>
                            <Text>Pour le : {selected.deadline}</Text>
                        </View>
                        <View style={globalStyles.modalText}>
                                <Button title='Accepter'  onPress={ () => setModalOpen(false)}/>
                                <Button title='Refuser'  onPress={ () => setModalOpen(false)}/>
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