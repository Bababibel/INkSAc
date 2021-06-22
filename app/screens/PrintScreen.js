import React from 'react';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import { globalStyles } from '../assets/styles/global_styles';


export default function PrintScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState(
        {color: '', format: '', name: '', key: '', nb_per_page: '', recto_verso: '', stapple: ''});

    const [info, setList] = useState([]);

    const dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/file/getAllFiles.php')
        .then(reponse => reponse.json())
        .then((list) => {
            console.log(list)
            list.data.map((item) => {
                setList((prevItem) => {
                    return [
                        {color: item.color, format: item.format, name: item.name, key: item.id, nb_per_page: item.nb_per_page, recto_verso: item.recto_verso, stapple: item.stapple}, 
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
                        <Text>name : {selected.name}</Text>
                        <Text>recto_verso : {selected.recto_verso}</Text>
                        <Text>format : {selected.format}</Text>
                        <Text>couleur : {selected.color}</Text>
                        <Text>agraphes : {selected.stapple}</Text>
                        <Text>Diapo par page : {selected.nb_per_page}</Text>
                        <Button title='Accept'  onPress={ () => setModalOpen(false)}/>
                        <Button title='Refuse'  onPress={ () => setModalOpen(false)}/>
                    </View>
                </Modal>
                <FlatList
                    data={info}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={ () => {setModalOpen(true), setSelected(item)}}>
                            <Card>
                                <Text style={globalStyles.titleText}>{ item.name }</Text>
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