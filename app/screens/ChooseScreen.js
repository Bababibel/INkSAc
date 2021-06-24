import React, { useState } from 'react';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Alert, Platform } from 'react-native';
import { globalStyles } from '../assets/styles/global_styles';
import AppLoading from 'expo-app-loading';
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
        fetch('https://bgauthier.fr/inksac/api/shared/getRequestsForList.php?list_name='+list_name.list)
        .then(reponse => reponse.json())
        .then((request) => {
            request.data.map((item) => {
                fetch("https://bgauthier.fr/inksac/api/shared/getFilesFromRequest.php?request_id="+item.id)
                .then(reponse => reponse.json())
                .then((file) => {
                    file.data.map((item2) => {
                        setList((prevItem) => {
                            return [
                                {key: item2.id, deadline: item.deadline, author: item.author_name, author_id : item.id, delivery_date: item.delivery_date, title: item2.name, comment: item.comment, hidden: item.hidden, state: item.state, color: item2.color, format: item2.format, nb_per_page: item2.nb_per_page, recto_verso: item2.recto_verso, stapple: item2.stapple, path: item2.path}, 
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

    if (dataLoaded) {
        if(Platform.OS === 'web'){
            Alert.alert('Merci !', 'Grâce à vous, 504 polycopiés ont été économisés. Cela représente 1000000 tonnes de CO2');
            return (
                <View style={globalStyles.container}>
                    <FlatList
                        data={info}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => navigation.navigate('ChooseElement', { 
                                author : item.author,
                                deadline : item.deadline,
                                title : item.title,
                                })}>
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
                            <Text>Auteur : {selected.author}</Text>
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