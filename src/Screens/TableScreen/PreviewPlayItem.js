import React from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity, ToastAndroid} from "react-native";

import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";
import nothing from "../../../assets/nothing.png";
import {GameData} from "../../GameData";

/**
 * Компонент информации о сыгранной игре(x/o/ничья-режим-дата)
 *
 * @param {item} - содержит:
 * gameData[] - массив литерал объектов информации о партиях */
export const PreviewPlayItem = ({ item }) => {
    return (
        <View key={item.id} style={{...styles.mainItemBody,
            borderBottomLeftRadius: GameData.isAuth ? 0 : 20,
            borderBottomRightRadius: GameData.isAuth ? 0 : 20,}}>
            <View style={{...styles.endTypeGameBlock,
                borderBottomLeftRadius: GameData.isAuth ? 0 : 20,}}>
                <Image style={styles.image}
                       source={item.leftState === "Drawn" ? nothing : item.winner ? krest : circle}/>
            </View>
            <View style={styles.textInfoBlock}>
                <Text style={styles.text}>{item.bot ? 'Single Player' : 'Game for Two'}</Text>
                <Text style={styles.text}>{item.date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainItemBody: {
        height:100,
        width: 360,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#c4c4c4',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 30,
    },
    endTypeGameBlock: {
        height: '100%',
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#5C821A'
    },
    image:{
        width: 70,
        height: 70,
        shadowOpacity: 0,
        margin: 10,
    },
    textInfoBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: '75%'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 23,
    },
})
