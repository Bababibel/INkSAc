import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import User from '../classes/User';
import { globalStyles, globalColors } from '../globals/globalStyles';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import axios from 'axios';



function UserModule({userProps}) {
    
    // Check if property is a valid array to load a User class
    if (!Array.isArray(userProps) || userProps.length != 9) return (<Text>Given parameter is not a array or user's properties ({typeof(userProps)}): {userProps}</Text>);
    
    let user = new User(userProps[0], userProps[1], userProps[2], userProps[3], userProps[4], userProps[5], userProps[6], userProps[7], userProps[8]);
    const [role, setRole] = useState(user.role);
    
    // Store the previous role for the useEffect()
    const prevRoleRef = useRef();
    useEffect(() => {
        prevRoleRef.current = role;
    })
    const prevRole = prevRoleRef.current;
    // Dont send an Update request if the previous role is the same or was undefined (class instanciation)
    useEffect(() => {
        if (prevRole != role && prevRole != undefined) {
            user.role = role,
            user.updateInDb()
        }
    }, [role, prevRole])

    return (
        <View style={[styles.container, {backgroundColor: (user.location=="Bourges" ? 'ghostwhite' : 'gainsboro')}]}>
            <View style={styles.row}>
                <Text style={styles.biggerText}>{user.first_name}</Text>
                <Text style={styles.biggerText}>{user.last_name}</Text>
                <FormControl>
                    <Select
                        value={role}
                        onChange={e => setRole(e.target.value)}>
                        <MenuItem value={"student"}>Étudiant</MenuItem>
                        <MenuItem value={"teacher"}>Enseignant</MenuItem>
                        <MenuItem value={"reprography"}>Reprographie</MenuItem>
                        <MenuItem value={"admin"}>Administrateur</MenuItem>
                    </Select>
                </FormControl>
            </View>
            <View style={styles.row}>
                <Text>Liste(s): </Text>
                {user.lists.map(list => {return <Text key={Math.random()} style={styles.list}>{list}</Text>})}
            </View>
            <View style={styles.row}>
                <Text>{user.location}</Text>
                <Text>{user.email}</Text>
            </View>
            <View style={styles.row}>
                <Text>{user.last_login_date}</Text>
                <Text>{user.creation_date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    biggerText: {
        fontSize: 20,
        fontFamily: 'ubuntu-bold',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        marginTop: 5,
        width: '100%',
        marginHorizontal: 'auto',
        padding: 5,
        fontFamily: 'ubuntu-regular',
        borderRadius: 5,
        maxWidth: 600,
        minHeight: 60,
    },
    row: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }

})

export default UserModule;
