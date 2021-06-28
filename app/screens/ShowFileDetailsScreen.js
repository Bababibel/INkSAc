import React from 'react';
import {View, Text, ScrollView, StatusBar, Button, Platform, StyleSheet} from 'react-native';
import { globalColors } from '../assets/globals/globalStyles';
import constants from '../assets/globals/constants'
import GoBackModule from '../assets/modules/GoBackModule';
import HyperLink from 'react-native-hyperlink';
import axios from 'axios';

export default function ShowFileDetailsScreen({ route, navigation }){
    const item = route.params.item;

    const displayList = () => {
        item.list.map(liste => {
            return (
                <Text>Liste(s) : {liste} </Text>
            )
        })
    }

    const stateHandle = () => {
        console.log(item)
        let state = ''
        if (item.state == 'pending'){
            state = 'Imprimer' 
        } else if (item.state == 'Imprimer'){
            state = 'Pret'
        } else if (item.state == 'Pret') {
            state = 'Archiver'
        } else if (item.state == 'Archiver') {
            state = 'Supprimer'
        } 
        item.updateInDb(state)
        navigation.push('DisplayAllRequestsForReprography')
    }

    axios.get(constants.getFilesFromRequest, {params: {'request_id': item.id}})

    const titleHandle = () => {
        let title = ''
        if (item.state == 'pending'){
            title = 'Imprimer' 
        } else if (item.state == 'Imprimer'){
            title = 'Pret'
        } else if (item.state == 'Pret') {
            title = 'Archiver'
        } else if (item.state == 'Archiver') {
            title = 'Supprimer'
        } 
        return (title)
    }

    const roleHandle = () => {
        if (constants.globalUser.role == 'reprography'){
            return(<Button onPress={() => stateHandle()} title={titleHandle()}/>)
        }
        else if (constants.globalUser.role == 'student'){
            return (
                <View>
                    <Button color={globalColors.primary} onPress={() => stateHandle()} title={"Oui"}/>
                    <Button color={globalColors.primary} onPress={() => stateHandle()} title={"Non"}/>
                </View>
            )
        }
    }

    const displayHandle = () => {
        if (constants.globalUser.role != 'student'){
            return(
                <View>
                    <Text style={styles.row}>Pour le : {item.delivery_date}</Text>
                    <Text style={styles.row}>Commentaire : {item.comment}</Text>
                    <Text style={styles.row}>Partiel : {item.hidden}</Text>
                    <Text style={styles.row}>Etat : {item.state}</Text>
                    <Text style={styles.row}>Supprimé le : {item.expiration_date}</Text>
                    {displayList()}
                    <Text style={styles.row}>Liste(s) : {item.list}</Text>
                    <Text style={styles.titleContainer}>Fichier</Text>
                    <Text style={styles.row}>Nom : {item.files.name}</Text>
                    <HyperLink linkDefault={true} linkStyle={ { color: '#2980b9'} }>
                        <Text style={styles.row}>Lien : {item.files.getDownloadUrl()}</Text>
                    </HyperLink>
                    <Text style={styles.row}>Couleur : {item.files.color}</Text>
                    <Text style={styles.row}>Agrafes : {item.files.stapple}</Text>
                    <Text style={styles.row}>Format : {item.files.format}</Text>
                    <Text style={styles.row}>Recto-verso : {item.files.recto_verso}</Text>
                    <Text style={styles.row}>Nombre d'élements par Page : {item.files.nb_per_page}</Text>
                </View>
            )
        }
    }

    return(
        <ScrollView>
            <GoBackModule navigation={navigation}/>
            <Text style={styles.titleContainer}> Détails de la requête</Text>
                <View style={styles.container}>
                    <Text style={styles.titleContainer}>Requête</Text>
                    <Text style={styles.row}>Auteur : {item.author_name}</Text>
                    <Text style={styles.row}>Titre : {item.title}</Text>
                    <Text style={styles.row}>Deadline : {item.deadline}</Text>
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
        marginBottom: 20,
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
        marginBottom: 20,
    }
})