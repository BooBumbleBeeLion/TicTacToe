import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text, FlatList } from "react-native";
import {BackBtnTop} from "../Widgets/BackBtnTop";
import { HistoryPlayItem } from "../Widgets/HistoryPlayItem";

let gameData = []

for (let i = 0; i < 20; i++){
    gameData.push({
        id: i.toString(),
        gameEnd: "WIN",
        date: Date.now(),
        gameType: "SINGLE PLAYER",
        color: "#5C821A",
    })
}
export const TableScreen = (props) => {
    console.log(gameData[0])
    return (
        <View style={ styles.container }>
            <BackBtnTop style={ styles.backBtnTop}changeScreen={props.changeScreen} />
            <FlatList
                style={styles.flatList}
                data={gameData}
                renderItem={HistoryPlayItem}
                showsVerticalScrollIndicator={false}
            />
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
    backBtnTop: {
    },
    flatList: {
        top: '3%',
        // backgroundColor:'#ffffff',
    }
})
