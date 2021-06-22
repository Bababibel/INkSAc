import React, { useState } from 'react';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Keyboard } from 'react-native';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import Card from '../assets/shared/RequestCard';

export default function ChooseScreen({ navigation }){
    const [selected, setSelected] = useState(
        {title: '', author: '', comment:'', expirationDate: '', key: ''});

    const [modalOpen, setModalOpen] = useState(false);


    /*Keyboard.dismiss();
    // send data trought fetch
    fetch('https://bgauthier.fr/inksac/api/file/getAllFiles.php',{
        method: 'POST',
        header: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
        },
        body:JSON.stringify({
            // passing input to php
            //email: userEmail,
            //password: userPassword
            key: 'test',
        })
    })
    .then((reponse) => reponse.json())
    .then((reponseJson) => {
        alert(reponseJson);
    })
    .catch(function(error) {
        console.log('Erreur:' + error.message)
    })*/
    const [list, setList] = useState([
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06/21', key: '1'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08/21', key: '2'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06/21', key: '3'},
        {title: 'Chapitre 4 Maths', author: 'fercqerc', comment:'rgsvges', expirationDate: '18/06/21', key: '4'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '18/06/21', key: '5'},
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10/06/21', key: '6'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30/08/21', key: '7'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06/21', key: '8'},
        {title: 'rskghj', author: 'fercqerc', comment:'rgsvges', expirationDate: '10/10/21', key: '9'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: '01/12/21', key: '10'}
    ]);

    return (
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <Button title='Exit' onPress={ () => setModalOpen(false)}/>
                <Text>Titre : {selected.title}</Text>
                <Text>Autheur : {selected.author}</Text>
                <Text>Commentaire : {selected.comment}</Text>
                <Text>Date de fin : {selected.expirationDate}</Text>
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
}