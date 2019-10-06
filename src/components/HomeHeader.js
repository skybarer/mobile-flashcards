import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {white, bgBlue} from '../utils/colors';
import {robotoMedium, robotoRegular} from '../utils/fonts';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function HomeHeader() {

    return (
        <View style={styles.headerPanel}>

            <MaterialCommunityIcons name="cards" size={100}/>

            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Mobile</Text>
                <Text style={styles.headerText}>Flashcards</Text>
                <Text style={styles.headerTagLine}>A udacity powered app</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    headerPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        height: 130,
        borderRadius: 10,
        backgroundColor: bgBlue
    },
    headerTextContainer: {
        flexDirection: 'column' // Swap from row back to the default of column
    },
    headerText: {
        textAlign: 'center',
        color: white,
        fontFamily: robotoMedium,
        fontSize: 32
    },
    headerTagLine: {
        textAlign: 'center',
        marginTop: 10,
        color: white,
        fontFamily: robotoRegular,
        fontSize: 13
    }
});