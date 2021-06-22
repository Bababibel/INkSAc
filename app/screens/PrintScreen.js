import React from 'react';
import {View, Text} from 'react-native';
import { globalStyles } from '../assets/styles/global_styles';

export default function PrintScreen({ navigation }){
    return(
        <View style={globalStyles.container}>
            <Text>Page d'information pour la reprographie</Text>
        </View>
    );   
}