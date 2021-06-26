import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Platform, Text, Button, Dimensions, StatusBar } from 'react-native'
import { globalColors } from '../globals/globalStyles'

function GoBackModule({ navigation }) {
    if (Platform.OS === "web" && navigation.canGoBack()) {
        return (
            <View styles={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.icon}
                           source={require('../images/back_arrow.png')}
                           onError={(e) => console.log("Error during back_arrow loading: "+e)} />
                    <Text>  Retour</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return(null)
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        left: 30,
        height: 50,
        width: 50,
        backgroundColor: globalColors.bg_secondary,
        borderRadius: 15,
        flex: 1,
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
})


export default GoBackModule
