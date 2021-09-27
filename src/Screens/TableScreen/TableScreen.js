import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text } from "react-native";

// Images
import icon from '../../../assets/icon.png';

export const TableScreen = (props) => {
    return (
        <View style={ styles.navBar }>
            <Text>TableScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
        marginTop: '20%',
        alignItems: 'center',
    },
    navImage: {
        height: 256,
        width: 256,
        //backgroundColor: '#FFFFFF',
    },
    mainBtns:{
        marginTop: '15%',
        flexDirection: 'column',
    },
})
