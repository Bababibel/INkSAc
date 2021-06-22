import React from 'react';
import {View, Text} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import { globalStyles } from '../assets/styles/global_styles';


export default function PrintScreen({ navigation }){
    const [dataLoaded, setDataLoaded] = useState(false);

    const dataLoad = () => {
        fetch('https://bgauthier.fr/inksac/api/file/getAllFiles.php')
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
        return(
            <View style={globalStyles.container}>
                <Text>Data laoded, reprographie page</Text>
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