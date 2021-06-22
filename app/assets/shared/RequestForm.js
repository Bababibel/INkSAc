import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { globalColors } from '../styles/global_styles';

export default function RequestForm(props) {
    return (
        <View style={styles.form}>
            {/* <View style={styles.formField}>
                { props.children }
            </View> */}

            <View style={styles.formField}>
                <Text>Nombre de fichiers</Text>
                <TextInput keyboardType="numeric" placeholder='Entre 1 et 10'></TextInput>
            </View>
            
            <View style={styles.formField}>
                <Text>Nom du premier fichier</Text>
                <TextInput placeholder='Chapitre 2/TD 8&9/...'></TextInput>
            </View>
            
            <View style={styles.formField}>
                <Text>Nom du deuxième fichier</Text>
                <TextInput placeholder='Chapitre 2/TD 8&9/...'></TextInput>
            </View>
            
            <View style={styles.formField}>
                <Text>Nom du troisième fichier</Text>
                <TextInput placeholder='Chapitre 2/TD 8&9/...'></TextInput>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        borderRadius: 6,
        elevation: 5,
        backgroundColor: globalColors.bg_primary,
        shadowOffset: { width: 1, height: 1},
        shadowColor: globalColors.bg_secondary,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    formField: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});


