import { processFontFamily } from "expo-font";
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";


export const globalColors = {
    primary: 'orange',
    secondary: '#d9cb9e',
    bg_primary: '#bdc3c7',
    bg_secondary: '#374140',
    white: 'white',
    black: 'black', 
    red: 'red',
    textLight: 'white', 
    textDark: 'black'
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.bg_primary,
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent : "center",
        alignItems : "center",
        minWidth : Platform.OS === "web" ? Dimensions.get('window').width / 4 : Dimensions.get('window').width,
    },
    modalText: {
        fontSize: 18,
        padding: 20,
        textAlign: 'center',
        color: globalColors.textDark
    },
    closeText: {
        fontSize: 14,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: globalColors.textDark,
        backgroundColor: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,

    },
    errorText : {
        color: globalColors.red,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    },
    backButton: {
        marginTop: 20,
        color: globalColors.secondary,
        paddingBottom: Dimensions.get('window').height /20,
    },
    loginCard: {
        padding : 24,
        justifyContent: 'center',
        textAlign: 'center',
        minWidth : Platform.OS === "web" ? Dimensions.get('window').width / 4 : Dimensions.get('window').width,
    },
    choiceCard: {
        justifyContent: 'flex-end',
        paddingBottom: Dimensions.get('window').height /20,
    }
});

