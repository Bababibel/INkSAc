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

    const[files, setFiles] = useState([])

    const dataLoad = () => {
        axios.get(constants.getAllRequests)
        .then((request) => {
            let tmpRequete = []
            request.data.data.map((item) => {
                axios.get(constants.getFilesFromRequest, {params: {'request_id': item.id}})
                .then((file) => {
                    if (file.data.message == undefined){
                        file.data.data.map((item2) => {
                            const newFile = new File(item2.id, item2.name, item2.path, item2.color, item2.stapple, item2.format, item2.recto_verso, item2.nb_per_page, item.id)
                            const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, item.title, item.comment, item.hidden, item.state)
                            newRequete.attachFile(newFile)
                            tmpRequete.push(newRequete)
                            setRequests((prevItem) => {
                                return [newRequete ,...prevItem];
                            })
                        })
                    }
                    else{
                        const newFile = new File('non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini', 'non défini')
                        const newRequete = new Request(item.id, item.author, item.author_name, item.deadline, item.delivery_date, item.expiration_date, 'Pas de fichier', item.comment, item.hidden, item.state)
                        newRequete.attachFile(newFile)
                        tmpRequete.push(newRequete)
                        setRequests((prevItem) => {
                            return [newRequete ,...prevItem];
                        })
                    }
                })
                    
            })
        })
    }

    if (dataLoaded) {
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
            <AppLoading
            startAsync={dataLoad} 
            onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
            onFinish={() => {setDataLoaded(true), console.log('fini')}}
            />
        ) 
    }
}