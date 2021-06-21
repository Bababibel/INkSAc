import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native'

function ViewImageScreen(props) {
    const [name, setName] = useState('Baptiste');
    const [age, setAge] = useState('20');

    return (
        <View style={styles.container}>
            <Text>Bonjour {name}, vous avez {age} ans !</Text>
            <Text>Enter name:</Text>
            <TextInput 
                multiline
                keyboardType='numeric'
                style={styles.input}
                placeholder='Exemple: Baptiste'
                onChangeText={(value) => setName(value)} />
            <Text>Enter age:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        margin: 10,
        width: 200,
    },
})
export default ViewImageScreen;