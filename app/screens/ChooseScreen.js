import React, { useState } from 'react';
import {View, Text,TouchableOpacity, FlatList, Modal, Button, Keyboard, Alert } from 'react-native';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import { string } from 'yup/lib/locale';


class App extends React.Component {

    state = {

    };

    componentDidMount = () => {
        this.dataLoad();
    };

    dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/request/getAllRequests.php')
        .then((reponse) => {
            const data = reponse.data;
            this.setState({posts: data});
            console.log('Data received');
            console.log(data);
        })
        .catch(() => {
            Alert.alert('erreur data');
        })
    }
}
export default function ChooseScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const [selected, setSelected] = useState(
        {title: '', author: '', comment:'', expirationDate: '', key: ''});

    const [modalOpen, setModalOpen] = useState(false);

    const [list, setList] = useState([
        {title: '', author: '', comment:'', expirationDate: '', key: '1'}
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