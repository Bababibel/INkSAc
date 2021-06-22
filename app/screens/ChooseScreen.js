import React, { useState } from 'react';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Alert } from 'react-native';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';




export default function ChooseScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [selected, setSelected] = useState(
        {author: '', comment: '', expiration_date: '', key: '', state: '', title: ''});

    const [info, setList] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/request/getAllRequests.php')
        .then(reponse => reponse.json())
        .then((list) => {
            list.data.map((item) => {
                setList((prevItem) => {
                    return [
                        {author: item.author, comment: item.comment, expiration_date: item.expiration_date, key: item.id, title: item.title}, 
                        ...prevItem];
                })
            })
        })
        .catch(() => {
            Alert.alert('erreur data');
        })
        .done()
    }

    

    if (dataLoaded) {
        return (
            <View style={globalStyles.container}>
                <Modal visible={modalOpen} animationType='slide'>
                    <TouchableOpacity onPress={() => setModalOpen(false)}>
                        <Text style={globalStyles.closeText}>Close</Text>
                    </TouchableOpacity>
                    <View style={globalStyles.titleText}>
                        <Text>Titre : {selected.title}</Text>
                        <Text>Autheur : {selected.author}</Text>
                        <Text>Commentaire : {selected.comment}</Text>
                        <Text>Date de fin : {selected.expiration_date}</Text>
                        <Button title='Accept'  onPress={ () => setModalOpen(false)}/>
                        <Button title='Refuse'  onPress={ () => setModalOpen(false)}/>
                    </View>
                </Modal>
                <FlatList
                    data={info}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={ () => {setModalOpen(true), setSelected(item)}}>
                            <Card>
                                <Text style={globalStyles.titleText}>{ item.title }</Text>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
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