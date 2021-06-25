import axios from 'axios';
import React, {useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import User from '../../assets/classes/User';
import constants from '../../assets/globals/constants';

import UserModule from '../../assets/modules/UserModule';

function ManageUsersScreen() {

    const [userList, setUserList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const loadData = () => {
        axios.get(constants.getAllUsers)
        .then(response => {
            if ('data' in response.data) {
                response.data.data.foreach(u => {
                    let tmpUser = new User((u.id, u.email, u.first_name, u.last_name, u.role, u.creation_date, u.last_login_date, u.location, u.list_names));
                    setUserList(tmpUser => [...tmpUser, userList]);
                })
            }
            else if ('message' in response.data) setErrorMsg("Erreur: "+response.message)
            else setErrorMsg("Le serveur ne répond pas")
        })
    }

    return (
        <ScrollView>
            <Text>{errorMsg}</Text>
            <UserModule></UserModule>
            {userList.map(user => {
                <UserModule user={user}/>
            })}
        </ScrollView>
    )
}

export default ManageUsersScreen;
