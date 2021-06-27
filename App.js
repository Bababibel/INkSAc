import React, {useState} from 'react';
import { StyleSheet, Platform, StatusBar, View, Text, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';


import { AppNavigator } from "./app/assets/routes/AppNavigator"


const getFonts = () => Font.loadAsync({
  'ubuntu-regular': require('./app/assets/fonts/Ubuntu-Bold.ttf'),
  'ubuntu-bold': require('./app/assets/fonts/Ubuntu-Regular.ttf'),
  'ubuntu-light': require('./app/assets/fonts/Ubuntu-Light.ttf'),
});


export default function App() { 
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if (fontsLoaded) {
    return (
      <AppNavigator/>
    )
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts} 
        onError={(text) => Alert.alert('Échec du chargement :(', String(text), [{text: 'Ok'}])}
        onFinish={() => {setFontsLoaded(true)}}
      />
    )
  }
}

