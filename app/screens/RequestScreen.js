import React, { useState } from 'react';
import {View, Text,TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import Card from '../assets/shared/RequestCard';

export default function RequestScreen({ navigation }){
    const [list, setList] = useState([
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10-6', key: '1'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30-08', key: '2'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06', key: '3'},
        {title: 'rskghj', author: 'fercqerc', comment:'rgsvges', expirationDate: 'juykiulikujyfh', key: '4'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: 'ehtdfw', key: '5'},
        {title: 'Cours Maths', author: 'Mme Gauthier', comment:'Meilleur cours de l\'année', expirationDate: '10-6', key: '6'},
        {title: 'Rapport SHS', author: 'Mme remerciment', comment:'Pas mal votre rapport', expirationDate: '30-08', key: '7'},
        {title: 'Sujet philo', author: 'Académie Francaise', comment:'Sujet du bac', expirationDate: '18/06', key: '8'},
        {title: 'rskghj', author: 'fercqerc', comment:'rgsvges', expirationDate: 'juykiulikujyfh', key: '9'},
        {title: 'azesfr', author: 'EZQRGD', comment:'rgshsnh', expirationDate: 'ehtdfw', key: '10'}
    ]);
    
    return (
        <View style={globalStyles.container}>

            <FlatList
                data={list}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <Card>
                            <Text style={globalStyles.titleText}>{ item.title }</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}