import React, {useState} from "react";
import {AsyncStorage, StyleSheet, View} from "react-native";
import { PreviewField } from './PreviewField'
import { GameData } from "../../GameData";

export const PreviewPlayItem = (props) => {

    return (
        <View style={styles.container}>
            <PreviewField id={props.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: this.width,
        alignItems: 'center',
        justifyContent: 'center',
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
