import React, {useState} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { HistoryPlayItem } from "../Widgets/HistoryPlayItem";
import { GameData } from "../../GameData";

export const TableScreen = (props) => {

    let [gameData,setGameData] = useState(GameData.result)
    return (
        <View style={ styles.container }>
            <BackBtnTop changeScreen={props.changeScreen} />
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
    flatList: {
        top: '3%',
    }
})
