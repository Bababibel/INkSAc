import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { globalStyles } from '../assets/globals/globalStyles';
import constants from '../assets/globals/constants';

function WelcomeScreen({ navigation }) {

    const [user, setUser] = useState(constants.globalUser);

    // Refresh the page and grab globalUser to update the page
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setUser(constants.globalUser);
        });
        return unsubscribe;
      }, [navigation]);


    

    function showUserInfo() {
        if (user != null) {
            return (
               <Text>Bonjour {user.first_name + " " + user.last_name}</Text>
           ) 
        }
    }
    function loginButton() {
        if (user == null) return (
            <Button
                title="Login"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('Login')}/>
        ) 
    }
    function logoutButton() {
        if (user != null) return (
            <Button
                title="Logout"
                style={globalStyles.welcomeButton}
                onPress={() => {
                    setUser(null);
                    constants.globalUser = null;
                }}/>
        )
    }
    function seeMyRequestsButton() {
        if (user != null && ['admin', 'teacher'].includes(user.role)) return (
            <Button
                title="Mes demandes"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('DisplayMyRequests')}/>
        )
    }
    function seeAllRequestsButton() {
        if (user != null && ['admin', 'reprography'].includes(user.role)) return (
            <Button
                title="Toutes les demandes"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('DisplayAllRequestsForReprography')}/>
        )
    }
    function seeListManagerButton() {
        if (user != null && ['admin'].includes(user.role)) return (
            <Button
                title="Gérer les listes"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('ManageLists')}/>
        )
    }
    function seeUserManagerButton() {
        if (user != null && ['admin'].includes(user.role)) return (
            <Button
                title="Gérer les utilisateurs"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('ManageUsers')}/>
        )
    }
    function ManageMyProfileButton() {
        if (user != null) return (
            <Button
                title="Mon profil"
                style={globalStyles.welcomeButton}
                onPress={() => navigation.push('ManageUsers')}/>
        )
    }

    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/background.png')}>

            <Text>Bienvenue sur INkSAc</Text>
            {showUserInfo()}
            {loginButton()}
            {seeMyRequestsButton()}
            {seeAllRequestsButton()}
            {seeListManagerButton()}
            {seeUserManagerButton()}
            {ManageMyProfileButton()}
            {logoutButton()}

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        alignItems:'center',
        top: 70,
    },
    logo: {
        width: 100,
        height: 100,
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'tomato',
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'dodgerblue',
    },
    title: {
        fontFamily: 'ubuntu-light',
    },
})

export default WelcomeScreen;