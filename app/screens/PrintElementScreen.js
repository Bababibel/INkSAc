import React from 'react';
import {View, Text, Alert, Modal, TouchableOpacity, Button, FlatList} from 'react-native';
import { useState } from 'react/cjs/react.development';
import AppLoading from 'expo-app-loading';
import Card from '../assets/shared/RequestCard';
import { globalStyles } from '../assets/styles/global_styles';

export default function PrintElementScreen({ navigation }){
    return(
        <View>
            <Text>Coucou print element sur la page web</Text>
        </View>
    )
}