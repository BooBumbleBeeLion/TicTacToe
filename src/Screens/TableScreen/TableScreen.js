import React, {useState} from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text, FlatList } from "react-native";
import {BackBtnTop} from "../Widgets/BackBtnTop";
import { HistoryPlayItem } from "../Widgets/HistoryPlayItem";
import {GameData} from "../../GameData";

export const TableScreen = (props) => {

    let [gameData,setGameData] = useState([])
    gameData = GameData.result
    return (
        <View style={ styles.container }>
            <BackBtnTop changeScreen={props.changeScreen} />
            <FlatList
                style={styles.flatList}
                data={gameData}
                inverted={true}
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
    flatList: {
        top: '3%',
        // backgroundColor:'#ffffff',
    }
})
