import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { globalStyles, globalColors } from '../assets/styles/global_styles';


const LoginSchema = yup.object({
    id : yup.string()
        .required()
        .min(1),
    password : yup.string()
        .required()
        .min(1)
})

export default function Login({ navigation }){
    const pressHandler = () => {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{ id : '', password : ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        Alert.alert("Inksac", "Authentification réussie");
                        if(values.id.toLowerCase() == 'prof') {
                            navigation.push('Request')
                        }
                        else {
                            console.log(values);
                            navigation.push('Consult')
                        }
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
                            <Text style={globalStyles.titleText}> Login </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Identifiant'
                                onChangeText={props.handleChange('id')}
                                value={props.values.id} 
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.id && props.errors.id}</Text>

                            <TextInput
                                style={globalStyles.input}
                                placeholder='Mot de Passe'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password} 
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.password && props.errors.password }</Text>
                            <View>
                                <Button title='submit' color={globalColors.primary} onPress = {props.handleSubmit}/>
                            </View>
                        
                        </View>
                    )}
                </Formik>
                <View style={globalStyles.backButton}>
                    <Button color={globalColors.secondary} title='GO back to main screen' onPress = {pressHandler}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
