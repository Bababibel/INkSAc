import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { globalColors } from '../styles/global_styles';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: globalColors.bg_primary,
        shadowOffset: { width: 1, height: 1},
        shadowColor: globalColors.bg_secondary,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});


