import React from 'react';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import { globalStyles } from '../assets/styles/global_styles';

export default function PrintElementScreen({ route, navigation }){
    const item = route.params;
    return(
        <View>
            <Text>Coucou print element sur la page web</Text>
            <View style={globalStyles.modalText}>
                <Text>name : {item.name}</Text>
                <Text>recto_verso : {item.recto_verso}</Text>
                <Text>format : {item.format}</Text>
                <Text>couleur : {item.color}</Text>
                <Text>agraphes : {item.stapple}</Text>
                <Text>Diapo par page : {item.nb_per_page}</Text>
                <Button title='Accept'  onPress={ () => navigation.goBack()}/>
                <Button title='Refuse'  onPress={ () => navigation.goBack()}/>
            </View>
        </View>
    )
}   