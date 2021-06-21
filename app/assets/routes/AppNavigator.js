import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../../screens/WelcomeScreen"
import ViewImageScreen from "../../screens/ViewImageScreen"
import AboutScreen from "../../screens/AboutScreen"
import LoginScreen from "../../screens/LoginScreen"
import ConsultScreen from "../../screens/ConsultScreen"
import RequestScreen from "../../screens/RequestScreen"

const Stack = createStackNavigator();


export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Consult" component={ConsultScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
  