import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text } from "react-native";

// Images
import icon from '../../../assets/icon.png';

export const TableScreen = (props) => {
    return (
        <View style={ styles.container }>
            <Text>TableScreen</Text>
            <TouchableOpacity style={styles.btnChild} onPress={() => props.changeState(0)}>
                <Text style={styles.btnText}> Назад </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
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
