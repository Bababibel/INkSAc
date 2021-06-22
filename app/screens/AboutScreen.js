import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AboutScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Page ABOUT</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
