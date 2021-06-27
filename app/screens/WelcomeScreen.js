import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Button, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import constants from '../assets/globals/constants';
import { globalColors } from '../assets/globals/globalStyles';

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
               <Text>Connecté en tant que:{"\n"}
                   {user.first_name + " " + user.last_name}</Text>
           ) 
        }
    }
    function loginButton() {
        if (user == null) return (
            <Button
                title="Login"
                color={globalColors.primary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('Login')}/>
        ) 
    }
    function logoutButton() {
        if (user != null) return (
            <Button
                title="Se déconnecter"
                color={globalColors.secondary}
                style={styles.welcomeButton}
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
                color={globalColors.primary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('DisplayMyRequests', { id : /*user.id*/ 3 })}/>
        )
    }
    function seeAllRequestsButton() {
        if (user != null && ['admin', 'reprography'].includes(user.role)) return (
            <Button
                title="Toutes les demandes"
                color={globalColors.primary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('DisplayAllRequestsForReprography')}/>
        )
    }
    function seeListManagerButton() {
        if (user != null && ['admin'].includes(user.role)) return (
            <Button
                title="Gérer les listes"
                color={globalColors.primary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('ManageLists')}/>
        )
    }
    function seeUserManagerButton() {
        if (user != null && ['admin'].includes(user.role)) return (
            <Button
                title="Gérer les utilisateurs"
                color={globalColors.primary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('ManageUsers')}/>
        )
    }
    function ManageMyProfileButton() {
        if (user != null) return (
            <Button
                title="Mon profil"
                color={globalColors.secondary}
                style={styles.welcomeButton}
                onPress={() => navigation.push('ManageUsers')}/>
        )
    }

    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/background.png')}>

            <View style={styles.container}>
                <View style={{textAlign: 'center'}}>
                    <Text style={styles.title}>Bienvenue sur INkSAc</Text>
                    {showUserInfo()}
                </View>
                <View style={styles.buttonContainer}>
                    {loginButton()}
                    {seeMyRequestsButton()}
                    {seeAllRequestsButton()}
                    {seeListManagerButton()}
                    {seeUserManagerButton()}
                    {ManageMyProfileButton()}
                    {logoutButton()}
                </View>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        flex :0.5,
        justifyContent: 'center',
        marginVertical: 2.5
    },
    container: {
        fontFamily: 'ubuntu-light',
        flex: 1,
        justifyContent: 'space-evenly',
        height: '100%',
    },
    title: {
        fontSize: 30,
        marginBottom: 50,
        textAlign: 'center',
    },
    welcomeButton: {
        height: 100,
    }
})

export default WelcomeScreen;