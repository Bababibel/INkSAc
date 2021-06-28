
import React, { Component } from 'react';
import { Text, Platform, TouchableOpacity, Modal, View } from 'react-native';

import RequestForm from '../shared/RequestForm';
import { globalStyles } from "../globals/globalStyles";


class MyModal extends Component {
    render () {
        if (Platform.OS === 'android' || Platform.OS === 'ios'){
            if (this.props.page == 'DisplayMyRequests'){
                return(
                    <Modal visible={this.props.modalVisible} animationType="slide">
                        <TouchableOpacity onPress={() => this.props.setModalVisible(!this.props.modalVisible)}>
                            <Text style={globalStyles.closeText}>
                                Fermer sans enregistrer
                            </Text>
                        </TouchableOpacity>
                        <RequestForm>
                            <Text style={globalStyles.titleText}>
                                Formulez une nouvelle demande
                            </Text>
                        </RequestForm>
                    </Modal>
                )
            }
            else if (this.props.page == 'DisplayRequestsByList'){
                return(
                    <Modal visible={this.props.modalOpen} animationType='slide'>
                        <TouchableOpacity onPress={() => this.props.setModalOpen(false)}>
                            <Text style={globalStyles.closeText}>Close</Text>
                        </TouchableOpacity>
                        <View style={globalStyles.modalText}>
                            <Text>Auteur : {this.props.selected.author_name}</Text>
                            <Text>Titre : {this.props.selected.title}</Text>
                            <Text>Pour le : {this.props.selected.deadline}</Text>
                        </View>
                        <View style={globalStyles.modalText}>
                                <Button title='Accepter'  onPress={ () => this.props.setModalOpen(false)}/>
                                <Button title='Refuser'  onPress={ () => this.props.setModalOpen(false)}/>
                        </View>
                    </Modal>
                )
            }
        }
        else{
            return(<Text></Text>)
        }
    }
}

export default MyModal;