import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import React, {useState} from 'react'
import { View, Input, StyleSheet } from 'react-native'

import Request from '../classes/Request'
import constants from '../globals/constants';

currDate = new Date();


function RequestForm({requestProps}) {

    let request = null; // keep a local object for an easier management
    let createMode = !requestProps; // if parameters are given, we are in edit mode and not create

    if (!request) { // if no request defined yet
        if (!createMode) { // define it, depending on given args (editing mode) or not (creating mode)
            let r = requestProps;
            request = new Request(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9])
        }
        else {
            request = new Request(null, constants.globalUser.id, null, currDate, new Date(currDate.setDate(curr.getDate(+7))), new Date(currDate.setDate(curr.getDate(+14))), "Ma demande", "Commentaire publique", 0, "pending", "");
        }
    }

    const [list, setList] = useState(request.list);
    const [deliveryDate, setDeliveryDate] = useState(request.delivery_date);
    const [title, setTitle] = useState(request.title);
    const [comment, setComment] = useState(request.comment);
    const [hidden, setHidden] = useState(request.hidden);
    const [deadline, setDeadline] = useState(request.deadline);

    return (
        <View>
            <TextInput 
                style={styles.input}
                onChangeText={setTitle}
                value={title}
            />
            <TextInput 
                style={[styles.input, styles.bigInput]}
                onChangeText={setComment}
                value={comment}
            />
        </View>
    )
}

export default RequestForm;
