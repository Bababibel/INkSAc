import React from 'react';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList, Platform} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import { globalStyles } from '../assets/styles/global_styles';


export default function PrintScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState(
        {key: '', author: '', delivery_date: '', title: '', comment: '', hidden: '', state: '', color: '', format: '', nb_per_page: '', recto_verso: '', stapple: '', path: ''});

    const [list, setList] = useState([]);

    const dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/request/getAllRequests.php')
        .then(reponse => reponse.json())
        .then((request) => {
            request.data.map((item) => {
                fetch("https://bgauthier.fr/inksac/api/shared/getFilesFromRequest.php?request_id="+item.id)
                .then(reponse => reponse.json())
                .then((file) => {
                    file.data.map((item2) => {
                        setList((prevItem) => {
                            return [
                                {key: item2.id, author: item.author_name, delivery_date: item.delivery_date, title: item2.name, comment: item.comment, hidden: item.hidden, state: item.state, color: item2.color, format: item2.format, nb_per_page: item2.nb_per_page, recto_verso: item2.recto_verso, stapple: item2.stapple, path: item2.path}, 
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

    const changeState = (item) => {
        if(item.state == 'pending'){
            fetch('https://bgauthier.fr/inksac/api/request/updateRequests.php?request_id='+item.id+'')
        }
        else if(item.state == 'printed'){
            fetch('https://bgauthier.fr/inksac/api/request/getAllRequests.php?request_id=')
        }
        else{
            fetch('https://bgauthier.fr/inksac/api/request/deleteRequests.php?id='+item.id)
        }
    }

    if (dataLoaded) {
        if(Platform.OS === 'web'){
            return (
                <View style={globalStyles.container}>
                    <FlatList
                        data={list}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={ () => navigation.navigate('PrintElement', { 
                                author : item.author,
                                comment : item.comment,
                                delivery_date : item.delivery_date,
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
                            <Text>Pour le : {selected.delivery_date}</Text>
                            <Text>Recto Verso ? : {selected.recto_verso}</Text>
                            <Text>Couleur ? : {selected.color}</Text>
                            <Text>Format : {selected.format}</Text>
                            <Text>Nombre de Diapo par Page : {selected.nb_per_page}</Text>
                            <Text>Nombre d'agraphes : {selected.stapple}</Text>
                            <Text>Partiel ? : {selected.hidden}</Text>
                            <Text>Lieux : {selected.path}</Text>
                            <Text>Etat : {selected.state}</Text>
                            <Button title={selected.state}  onPress={ () => {
                                setModalOpen(false)
                                console.log(selected)
                                }}
                            />
                        </View>
                    </Modal>
                    <FlatList
                        data={list}
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