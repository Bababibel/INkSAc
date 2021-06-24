import React from 'react';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList} from 'react-native';
import { globalStyles } from '../assets/styles/global_styles';

export default function PrintElementScreen({ route, navigation }){
    const item = route.params;
    return(
        <View>
            <View style={globalStyles.modalText}>
                <Text>Auteur : {item.author}</Text>
                <Text>Titre : {item.title}</Text>
                <Text>Pour le : {item.deadline}  {/* Attention, deadline au lieu de delivery_date car seule date qui marche actuellement ...*/}</Text>
                <Text>Recto Verso ? : {item.recto_verso}</Text>
                <Text>Couleur ? : {item.color}</Text>
                <Text>Format : {item.format}</Text>
                <Text>Nombre de Diapo par Page : {item.nb_per_page}</Text>
                <Text>Nombre d'agraphes : {item.stapple}</Text>
                <Text>Partiel ? : {item.hidden}</Text>
                <Text>Lieux : {item.path}</Text>
                <Text>Etat : {item.state}</Text>
                <View style={globalStyles.backButton}>
                    <Button title={item.state}  onPress={ () => navigation.goBack()}/>
                </View>
            </View>
        </View>
    )
}   