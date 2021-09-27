import React from "react";
import {StyleSheet, View, TouchableOpacity, Text, Alert} from "react-native";

export const MainButton = (props) => {
    return (
        <TouchableOpacity style={styles.btnChild} onPress={() => props.changeState(props.id)}>
            <Text style={styles.btnText}> {props.title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnChild: {
        height: 70,
        width: 300,
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: '#D4DDE1',
        borderRadius: 20,
    },
    btnText: {
        fontSize: 20,
        flex: 1,
        textAlignVertical : 'center',
    },
})
