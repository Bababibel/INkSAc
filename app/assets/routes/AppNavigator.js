import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../../screens/WelcomeScreen"
import ViewImageScreen from "../../screens/ViewImageScreen"
import AboutScreen from "../../screens/AboutScreen"

const Stack = createStackNavigator();


export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
  