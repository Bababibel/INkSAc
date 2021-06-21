import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Button } from 'react-native';

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/background.png')}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/favicon.png')} style={styles.logo}/>
                <Text style={styles.title}>Mange du pain connard</Text>
            </View>

            <Button
                title="Go to Details"
                onPress={() => navigation.push('About')}
            />


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