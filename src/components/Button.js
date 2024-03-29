import React from 'react';
import {green, white} from '../utils/colors';
import {StyleSheet, Text, TouchableOpacity} from "react-native-web";

const Button = ({children, onPress, style = {}}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: green,
        margin: 10,
        padding: 15,
        width: 300
    },
    reset: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: white
    }
});

export default Button;
