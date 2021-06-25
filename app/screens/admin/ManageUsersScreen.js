import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import User from '../../assets/classes/User';
import constants from '../../assets/globals/constants';
import UserModule from '../../assets/modules/UserModule';

function ManageUsersScreen() {

    const [userList, setUserList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const loadData = () => {
        axios.get(constants.getAllUsers)
        .then(response => {
            if ('data' in response.data) {
                response.data.data.map(u => {
                    let tmpUser = [u.id, u.email, u.first_name, u.last_name, u.role, u.creation_date, u.last_login_date, u.location, u.list_names];
                    setUserList(userList => [...userList, tmpUser]);
                });
            }
            else if ('message' in response.data) setErrorMsg("Erreur: "+response.message)
            else setErrorMsg("Le serveur ne répond pas")
        })
    }



    if (dataLoaded) {
        console.log("data chargées:")
        console.log(userList)
        return (
            <ScrollView>
                <Text>{errorMsg}</Text>
                <View>
                    {userList.map(user => {
                        return (
                            <UserModule key={user.id} user={user}/>
                        )
                    })}

                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <AppLoading
            startAsync={loadData()}
            onFinish={setDataLoaded(true)}
            />
        )
    }
}

export default ManageUsersScreen;
