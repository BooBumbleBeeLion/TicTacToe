import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const Navbar = (props) => {
    return (
        <View style={ styles.navbar }>
            <Text style={ styles.navtext }>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navtext: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    ticbutton: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
})
