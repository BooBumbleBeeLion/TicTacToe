import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text } from "react-native";
import {PlayField} from '../../PlayField/PlayField'

export const SinglePlayerScreen = (props) => {
    return (
        <View style={ styles.mainView }>
            <PlayField style={ styles.playField }/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        backgroundColor: '#000000'
    },
})
