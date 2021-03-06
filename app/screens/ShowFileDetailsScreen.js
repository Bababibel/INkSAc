import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, Button, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalColors, globalStyles } from '../assets/globals/globalStyles';
import constants from '../assets/globals/constants'
import GoBackModule from '../assets/modules/GoBackModule';
import HyperLink from 'react-native-hyperlink';
import axios from 'axios';
import { convertToString } from '../assets/tools/dateConverter';

export default function ShowFileDetailsScreen({ route, navigation }){
    const item = route.params.item;
    const [errorMsg, setErrorMsg] = useState();

    const displayList = () => {
        item.list.map(liste => {
            return (
                <Text>Liste(s) : {liste} </Text>
            )
        })
    }

    const handleAnswer = (answer) => {
        let formData = new FormData();
        formData.append('file_in_request_id', item.files.file_in_request_id);
        formData.append('user_id', constants.globalUser.id);
        formData.append('answer', answer);
        axios.post(constants.updateAnswerToFileInRequest, formData)
        .then(response => {
            console.log(response.data.message);
            item.files.answer = answer;
            navigation.goBack();
            navigation.goBack();
            navigation.push("DisplayMyRequests");
        })
        .catch(error => {
            console.log('Request failed to synchronize answer with API');
        })
    }

    const answerRelatedImage = (answer) => {
        if (constants.globalUser.role != 'student') return;
        if (answer == 0) {
            return (<Image source={require('../assets/printer.png')} style={{width: 32, height: 32, resizeMode: 'stretch', margin: 15}}/>);
        }
        else {
            return (<Image source={require('../assets/files.png')} style={{width: 32, height: 32, resizeMode: 'stretch', margin: 15}}/>);
        }
    }

    const stateHandle = () => {
        console.log(item)
        let state = 'waitingForPrint'
        if (item.state == 'pending'){
            state = 'waitingForPrint' 
        } else if (item.state == 'waitingForPrint'){
            state = 'ready'
        } 
        item.updateInDb(state)
        navigation.goBack()
    }

    const titleHandle = () => { // A modifier
        let title = ''
        if (item.state == 'pending'){
            title = 'Imprimer' 
        } else if (item.state == 'waitingForPrint'){
            title = 'Pr??t'
        }
        return (title)
    }

    const roleHandle = () => {
        let deadline_date = item.deadline.substring(5, 10).replace('-', '/') + '/' + item.deadline.substring(0, 4) + item.deadline.substring(10);
        if (constants.globalUser.role == 'reprography'){
            return(<Button onPress={() => stateHandle()} title={titleHandle()}/>)
        }
        else if (constants.globalUser.role == 'student' && Date.parse(deadline_date) > Date.now()) {
            return (
                <View style={globalStyles.fileOptions}>
                    <TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
                            <Image source={require('../assets/printer.png')} style={{width: 32, height: 32, resizeMode: 'stretch', marginHorizontal: 5}}/>
                            <Button color={globalColors.primary} onPress={() => handleAnswer(0)} title={"Je souhaite la version papier !"}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                            <Image source={require('../assets/files.png')} style={{width: 32, height: 32, resizeMode: 'stretch', marginHorizontal: 5}}/>
                            <Button color={globalColors.ready} onPress={() => handleAnswer(1)} title={"Le fichier me suffit !"}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    const displayHandle = () => {
        if (constants.globalUser.role != 'student'){
            return(
                console.log(item),
                <View>
                    <Text style={styles.row}>Pour le : {convertToString(item.delivery_date)}</Text>
                    <Text style={styles.row}>Commentaire : {item.comment}</Text>
                    <Text style={styles.row}>Partiel : {item.hidden==1 ? 'Oui' : 'Non'}</Text>
                    <Text style={[styles.row, { color: constants.states.color[item.state]}]}>??tat : {constants.states.msg[item.state]}</Text>
                    <Text style={styles.row}>Sera supprim??e le : {convertToString(item.expiration_date)}</Text>
                    {displayList()}
                    <Text style={styles.row}>Liste : {item.list}</Text>
                    <Text style={styles.secondaryTitle}>Fichier</Text>
                    <Text style={styles.row}>Nom : {item.files.name}</Text>
                    <HyperLink linkDefault={true} linkStyle={ { color: '#2980b9'} }>
                        <Text style={styles.row}>Lien : {item.files.getDownloadUrl()}</Text>
                    </HyperLink>
                    <Text style={styles.row}>Couleur : {item.files.color==1 ? 'Oui' : 'Non'}</Text>
                    <Text style={styles.row}>Agrafes : {item.files.stapple}</Text>
                    <Text style={styles.row}>Format : {item.files.format}</Text>
                    <Text style={styles.row}>Recto-verso : {item.files.recto_verso==1 ? 'Oui' : 'Non'}</Text>
                    <Text style={styles.row}>Nombre d'??lements par Page : {item.files.nb_per_page}</Text>
                </View>
            )
        }
        else {
            return(
                <View>
                    <Text style={styles.row}>Pour le : {item.delivery_date}</Text>
                    <Text style={styles.row}>Commentaire : {item.comment}</Text>
                    <Text style={[styles.row, { color: constants.states.color[item.state]}]}>??tat : {constants.states.msg[item.state]}</Text>
                    <Text style={styles.row}>Supprim?? le : {item.expiration_date}</Text>
                    {displayList()}
                    <Text style={styles.row}>Liste : {item.list}</Text>
                    <Text style={styles.secondaryTitle}>Fichier</Text>
                    <Text style={styles.row}>Nom : {item.files.name}</Text>
                    <HyperLink linkDefault={true} linkStyle={ { color: '#2980b9'} }>
                        <Text style={styles.row}>Lien : {item.files.getDownloadUrl()}</Text>
                    </HyperLink>
                </View>
            )
        }
    }

    return(
        <ScrollView>
            <GoBackModule navigation={navigation}/>
            <Text style={styles.titleContainer}> D??tails de la requ??te</Text>
            {roleHandle()}
            <View style={styles.container}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {answerRelatedImage(item.files.answer)}
                    <Text style={styles.secondaryTitle}>{item.title}</Text>
                </View>
                <Text style={styles.row}>Auteur : {item.author_name}</Text>
                <Text style={styles.row}>Deadline : {convertToString(item.deadline)}</Text>
                {displayHandle()}
            </View>
            {roleHandle()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        textAlign:'center',
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight +10 : 0,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    secondaryTitle: {
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    row: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        marginHorizontal: 'auto',
        fontFamily: 'ubuntu-regular',
        borderRadius: 5,
        minHeight: 60,
        maxWidth: 700,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: globalColors.secondary,
    }
})