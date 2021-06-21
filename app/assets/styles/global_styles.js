import { processFontFamily } from "expo-font";
import { Platform, StatusBar, StyleSheet } from "react-native";


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
        padding : 24,
        backgroundColor: globalColors.bg_primary,
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleText: {
        fontSize: 18,
        padding: 20,
        textAlign: 'center',
        color: globalColors.textDark
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
        color: globalColors.secondary
    }
});

