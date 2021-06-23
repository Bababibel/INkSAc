import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../../screens/WelcomeScreen"
import LoginScreen from "../../screens/LoginScreen"
import ChooseScreen from "../../screens/ChooseScreen"
import RequestScreen from "../../screens/RequestScreen"
import RequestElementScreen from "../../screens/RequestElementScreen"
import PrintScreen from "../../screens/PrintScreen";
import PrintElementScreen from "../../screens/PrintElementScreen";

const Stack = createStackNavigator();


export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Choose" component={ChooseScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="RequestElement" component={RequestElementScreen} />
      <Stack.Screen name="Print" component={PrintScreen} />
      <Stack.Screen name="PrintElement" component={PrintElementScreen} />

    </Stack.Navigator>
  </NavigationContainer>
)