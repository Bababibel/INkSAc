import React from 'react';
import axios from 'axios';
import { View, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { globalStyles, globalColors } from '../assets/styles/global_styles';
import constants from '../assets/globals/constants';


const LoginSchema = yup.object({
    id : yup.string()
        .required()
        .min(1),
    password : yup.string()
        .required()
        .min(1)
})

export default function LoginScreen({ navigation }){

    const dismissKeyboard = () => {
        if (Platform.OS === "android" ||  Platform.OS === "ios"){
            Keyboard.dismiss()
        }
    }
    
    const pressHandler = () => {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={globalStyles.container}>
                <View style={globalStyles.loginCard}>
                    <Formik
                        initialValues={{ id : '1', password : 'e'}}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            axios.get(constants.getUser, {params: {'id': values.id}})
                            //axios.get(constants.getAllUsers)
                            .then((response) => {
                                console.log(response.data)
                                if(values.id.toLowerCase() == 'prof') {
                                    navigation.push('Request')
                                }
                                else if(values.id.toLowerCase() == 'repro') {
                                    navigation.push('Print')
                                }
                                else if(values.id.toLowerCase() == 'sti') {
                                    navigation.navigate('Choose', { 
                                        list : 'STI',
                                        })
                                }
                                else if(values.id.toLowerCase() == 'mri') {
                                    navigation.navigate('Choose', { 
                                        list : 'MRI',
                                        })
                                }
                                else {
                                    navigation.navigate('Choose', { 
                                        list : 'MRI',
                                        })
                                }
                            })
                        }}
                        >
                        {(props) => (
                            <View >
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
                    <Button color={globalColors.secondary} title='GO back to main screen' onPress = {pressHandler}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
