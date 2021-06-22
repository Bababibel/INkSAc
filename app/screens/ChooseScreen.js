import React, { Component, useState } from 'react';
import {View, Text,TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import Card from '../assets/shared/RequestCard';

export default function ChooseScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [selected, setSelected] = useState(
        {title: '', author: '', comment:'', expirationDate: '', key: ''});

    const [modalOpen, setModalOpen] = useState(false);

    const dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/userList/getAllLists.php')
        .then(reponse => reponse.json())
        .then(list => console.log(list))
    }

    const [list, setList] = useState([
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06', key: '1'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08', key: '2'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06', key: '3'},
        {title: 'Chapitre 4 Maths', author: 'fercqerc', comment:'rgsvges', expirationDate: '18/06', key: '4'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '18/06', key: '5'},
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06', key: '6'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08', key: '7'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06', key: '8'},
        {title: 'rskghj', author: 'fercqerc', comment:'rgsvges', expirationDate: '10/10', key: '9'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '01/12', key: '10'}
    ]);

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
                        <Text>Date de fin : {selected.expirationDate}</Text>
                        <Button title='Accept'  onPress={ () => setModalOpen(false)}/>
                        <Button title='Refuse'  onPress={ () => setModalOpen(false)}/>
                    </View>
                </Modal>
                <FlatList
                    data={list}
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