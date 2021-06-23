import React from 'react';
import {View, Text, Button} from 'react-native';
import { globalStyles } from '../assets/styles/global_styles';

export default function ChooseElementScreen({ route, navigation }){
    const item = route.params;
    return(
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadline}</Text>
                <View style={globalStyles.backButton}>
                    <Button title="Demander"  onPress={ () => navigation.goBack()}/>
                    <Button title="Ne pas demander"  onPress={ () => navigation.goBack()}/>
                </View>
            </View>
        </View>
    )
}   