import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Keyboard, Alert, TouchableWithoutFeedback, Platform } from 'react-native';
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
                <Formik
                    initialValues={{ id : '', password : ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        if(values.id.toLowerCase() == 'prof') {
                            navigation.push('Request')
                        }
                        else if(values.id.toLowerCase() == 'repro') {
                            navigation.push('Print')
                        }
                        else {
                            console.log(values);
                            navigation.push('Choose')
                        }                            
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
                <View style={globalStyles.backButton}>
                    <Button color={globalColors.secondary} title='GO back to main screen' onPress = {pressHandler}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
