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
        color: "#5C821A"
    })
}
{ /* */ }
export const TableScreen = (props) => {
    return (
        <View style={ styles.container }>
            <BackBtnTop changeScreen={props.changeScreen} />
            <View>

            </View>
            <FlatList 
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
        padding: 25
    },
})
