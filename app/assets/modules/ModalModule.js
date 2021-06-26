
import React, { Component } from 'react';
import { Text, Platform, TouchableOpacity, Modal } from 'react-native';

import RequestForm from '../shared/RequestForm';
import { globalStyles } from "../globals/globalStyles";


class MyModal extends Component {
    render () {
        console.log(this.props)
        if (Platform.OS === 'android' || Platform.OS === 'ios'){
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
        else{
            return(<Text></Text>)
        }
    }
}

export default MyModal;