import React, {useState} from "react";
import { StyleSheet, View, FlatList, BackHandler } from "react-native";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { HistoryPlayItem } from "../Widgets/HistoryPlayItem";
import { GameData } from "../../GameData";
import {useDispatch} from "react-redux";
import {setScreen} from "../../store/reducers/ScreenSlice";
/**
 * Компонент отображения истории игр */
export const TableScreen = (props) => {
    const dispatch = useDispatch();
    let [gameData,setGameData] = useState(GameData.result)

    BackHandler.addEventListener("hardwareBackPress", () => {
        dispatch(setScreen(0))
        return true
    })
    return (
        <View style={ styles.container }>
            <BackBtnTop/>
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
