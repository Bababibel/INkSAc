import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { globalStyles, globalColors } from '../assets/globals/globalStyles';
import User from '../assets/classes/User';
import constants from '../assets/globals/constants'

const LoginSchema = yup.object({
    email : yup.string()
        .required()
        .min(1),
    password : yup.string()
        .required()
        .min(1)
})

export default function LoginScreen({ navigation }){

    const dismissKeyboard = () => {
        if (Platform.OS === "android" ||  Platform.OS === "ios") Keyboard.dismiss()
    }
    
    const handleGoBack = () => {
        navigation.goBack()
    }

    const [errorMsg, setErrorMsg] = useState(null);
    const [user, setUser] = useState(null);

    function submitted(email) {
        axios.get(constants.getUserByEmail, { params: { 'email': email } })
        .then(response => {
            if (response.data) { // server answered
                if ('data' in response.data) { // there is data to collect
                    let u = response.data.data[0]; // first object in the data array
                    let tmpUser = new User(u.id, u.email, u.first_name, u.last_name, u.role, u.creation_date, u.last_login_date, u.location, u.list_names);
                    constants.globalUser = tmpUser;
                    setUser(tmpUser);
                }
                else if ('message' in response.data) { // no data but error message
                    setErrorMsg("Erreur. Réponse du serveur: "+response.data.message);
                }
                else setErrorMsg("Le serveur a renvoyé une réponse inhabituelle");
            }
            else setErrorMsg("Le serveur distant ne répond pas");
        })
    } 

    // REDIRECTION
    // wait for full-update of the variable "user" before evaluating it
    useEffect(() => { 
        if (user != null) {
            /*navigation.navigate("Choose", {
                list: user.lists[0],
            });*/
            navigation.navigate("Request", {
                id : 1
            });
            }
        }, [user]);

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={globalStyles.container}>
                <View style={globalStyles.loginCard}>
                    <Formik
                        initialValues={{ email : 'prof@insacvl.fr', password : 'e'}}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => submitted(values.email)}>
                        {(props) => (
                            <View >
                                <Text style={{color: 'red', fontSize: 18, marginBottom: 10}}>{errorMsg}</Text>
                                <Text style={globalStyles.titleText}> Login </Text>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder='Identifiant'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email} 
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.email && props.errors.email}</Text>

                                <TextInput
                                    style={globalStyles.input}
                                    placeholder='Mot de Passe'
                                    secureTextEntry={true}
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
                    <Button color={globalColors.secondary} title='Retour' onPress = {handleGoBack}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

