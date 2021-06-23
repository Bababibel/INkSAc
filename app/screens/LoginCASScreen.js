import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Keyboard, Alert, TouchableWithoutFeedback, Platform } from 'react-native';
import { WebView } from 'react-native-webview'
import { globalStyles, globalColors } from '../assets/styles/global_styles';


export default function LoginCASScreen({ navigation }){


    return (
        <WebView source={{uri: 'https://casv6.insa-cvl.fr/cas/login?service=https://bgauthier.fr/inksac'}}>

        </WebView>
    );
}
