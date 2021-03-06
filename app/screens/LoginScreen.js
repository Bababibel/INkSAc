import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { globalStyles, globalColors } from '../assets/globals/globalStyles';
import User from '../assets/classes/User';
import constants from '../assets/globals/constants'
import GoBackModule from '../assets/modules/GoBackModule';

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
        fetch(constants.getUserByEmail+"?email="+email)
        .then(response => {
            response.json()
            .then(response => {
                if (response !== undefined) { // server answered
                    if ('data' in response) { // there is data to collect
                        let u = response.data[0]; // first object in the data array
                        let tmpUser = new User(u.id, u.email, u.first_name, u.last_name, u.role, u.creation_date, u.last_login_date, u.location, u.list_names);
                        constants.globalUser = tmpUser;
                        setUser(tmpUser);
                        axios.get(constants.loggedUser, { params: { 'id': u.id } })
                        .then(constants.globalUser.reloadFromDb());
                    }
                    else if ('message' in response) { // no data but error message
                        setErrorMsg("Erreur. Réponse du serveur: "+response.message);
                    }
                    else setErrorMsg("Le serveur a renvoyé une réponse inhabituelle");
                }
                else setErrorMsg("Le serveur distant ne répond pas");
            })
        })
    }

    // REDIRECTION
    // wait for full-update of the variable "user" before evaluating it
    useEffect(() => { 
        if (user != null) {
            navigation.navigate("Welcome", {
                list: user.lists[0],
            });
        }
    }, [user]);

    return (
        <View style={{flex: 1}}>
            <GoBackModule navigation={navigation} />
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={globalStyles.container}>
                    <Formik
                        initialValues={{ email : 'admin@insa-cvl.fr', password : 'e'}}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => submitted(values.email)}>
                        {(props) => (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 30, marginBottom: 30}}> Se connecter </Text>
                                <Text style={{color: 'red', fontSize: 18, marginBottom: 10}}>{errorMsg}</Text>
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
                                    <Button title='Valider' color={globalColors.primary} onPress = {props.handleSubmit}/>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

