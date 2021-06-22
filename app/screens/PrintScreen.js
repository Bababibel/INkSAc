import React from 'react';
import {View, Text} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import { globalStyles } from '../assets/styles/global_styles';


const dataLoad = () => {
    fetch('https://bgauthier.fr/inksac/api/file/getAllFiles.php')
    .then(reponse => reponse.json())
    .then(files => console.log(files))
}

export default function PrintScreen({ navigation }){
    
    const [dataLoaded, setDataLoaded] = useState(false);

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