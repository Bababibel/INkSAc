import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import User from '../classes/User';
import { globalStyles, globalColors } from '../globals/globalStyles';

class UserModule extends Component {

    loadData = () => {
        console.log(this.props)
    }
    //const [user, setUser] = setState(props.user);

    render () {
        console.log(this.props)
        if (typeof(this.props.user) != User) return (<Text>Given parameter is not a User object: {this.props.user}</Text>);

        return (
            <View style={styles.container}>
                <Text>{user.first_name}</Text>
                <Text>{user.last_name}</Text>
                <Text>{user.email}</Text>
                <Text>{user.role}</Text>
                <Text>{user.lists}</Text>
                <Text>{user.last_login_date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'ubuntu-regular',
        backgroundColor: globalColors.bg_secondary,
        borderRadius: 10,
        maxWidth: 600,
    },
})

export default UserModule;
