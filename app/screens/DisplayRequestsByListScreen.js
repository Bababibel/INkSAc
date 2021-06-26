import React, { useState } from 'react';
import axios from 'axios';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Alert, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';

import { globalStyles } from '../assets/globals/globalStyles';
import Request from '../assets/classes/Request';
import File from '../assets/classes/File';
import constants from '../assets/globals/constants';
import Card from '../assets/shared/RequestCard';
import MyModal from '../assets/modules/ModalModule';


export default function DisplayRequestsByListScreen({ route, navigation }){
    const list_name = route.params;

    const [dataLoaded, setDataLoaded] = useState(false);
    const [selected, setSelected] = useState();
    const [info, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const dataLoad = () => {
        axios.get(constants.getRequestsForList, {params: {'list_name': list_name.list}})
        .then((request) => {
            request.data.data.map((item) => {
                console.log(request.data.data)
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


    const pressHandler = (item) => {
        if(Platform.OS === 'web'){
            navigation.navigate('ChooseElement', { item : item })
        } else {
            setModalOpen(true), 
            setSelected(item)
        }
    }

    if (dataLoaded) {
        return (
            <View style={globalStyles.container}>
                <FlatList
                    data={info}
                    keyExtractor={(info, index) => info + index}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={ () => pressHandler(item)}>
                            <Card>
                                <Text style={globalStyles.modalText}>{ item.title }</Text>
                                <MyModal page={'DisplayRequestsByList'}modalOpen={modalOpen} setModalOpen={setModalOpen} selected={item}/>
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
            onFinish={() => {setDataLoaded(true)}}
            />
        ) 
    }
}