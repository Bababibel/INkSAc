import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../assets/styles/global';

export default function Login({ navigation }){
const pressHandler = () => {
    navigation.goBack()
}

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{ id : '', password : ''}}
                    onSubmit={(values) => {
                        Alert.alert("coucou Cadu", "Tchoupi visite Paris")
                        console.log(values);
                        /*Keyboard.dismiss();
                        // send data trought fetch
                        fetch('http://192.168.0.10:19002/DoneWithIt/login.php',{
                            method: 'POST',
                            header: {
                                'Accept' : 'application/json',
                                'Content-type' : 'application/json'
                            },
                            body:JSON.stringify({
                                // passing input to php
                                //email: userEmail,
                                //password: userPassword
                                key: 'test',
                            })
                        })
                        .then((reponse) => reponse.json())
                        .then((reponseJson) => {
                            alert(reponseJson);
                        })
                        .catch(function(error) {
                            console.log('Erreur:' + error.message)
                        })*/
                            
                    }}
                    >
                    {(props) => (
                        <View>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Identifiant'
                                onChangeText={props.handleChange('id')}
                                value={props.values.id} 
                            />

                            <TextInput
                                style={globalStyles.input}
                                placeholder='Mot de Passe'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password} 
                            />
                            <Button title='submit' color='red' onPress = {props.handleSubmit}/>
                        
                        </View>
                    )}
                </Formik>
                <Button title='GO back to main screen' onPress = {pressHandler}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding : 24
    }
});