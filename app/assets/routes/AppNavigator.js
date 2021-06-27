import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../../screens/WelcomeScreen"
import LoginScreen from "../../screens/LoginScreen"
import ShowFileDetailsScreen from "../../screens/ShowFileDetailsScreen";
import DisplayMyRequests from "../../screens/DisplayMyRequests";
import DisplayAllRequestsForReprographyScreen from "../../screens/DisplayAllRequestsForReprographyScreen";
import CreateOrUpdateRequestScreen from "../../screens/CreateOrUpdateRequestScreen";

import ManageRequestForReprographyScreen from "../../screens/ManageRequestForReprographyScreen";
import ManageListsScreen from '../../screens/admin/ManageListsScreen';
import ManageUsersScreen from '../../screens/admin/ManageUsersScreen';
import MyProfileScreen from "../../screens/MyProfileScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome' headerMode='none'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DisplayAllRequestsForReprography" component={DisplayAllRequestsForReprographyScreen} />
      <Stack.Screen name="ShowFileDetails" component={ShowFileDetailsScreen} />
      <Stack.Screen name="CreateOrUpdateRequest" component={CreateOrUpdateRequestScreen} />

      {/* Main buttons on welcome screen after authentification */}
      <Stack.Screen name="DisplayMyRequests" component={DisplayMyRequests} />
      <Stack.Screen name="ManageRequestForReprography" component={ManageRequestForReprographyScreen} />
      <Stack.Screen name="ManageLists" component={ManageListsScreen} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      
    </Stack.Navigator>
  </NavigationContainer>
)