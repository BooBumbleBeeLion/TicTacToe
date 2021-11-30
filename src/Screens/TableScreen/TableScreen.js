import React, { useState } from "react";
import { StyleSheet, View, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { GameData } from "../../GameData";
import { useDispatch } from "react-redux";
import { setScreen } from "../../store/reducers/ScreenSlice";
import { PreviewPlayItem } from "./PreviewPlayItem";
import { PreviewField } from "../Widgets/PreviewField";
/**
 * Компонент отображения истории игр */
export const TableScreen = (props) => {
    let result = GameData.games
    let out = []
    // Инвертирую массив, сначала отображаются последние игры
    for(let i = 0,y=result.length-1; i < result.length; i++,y--) {
        out[i] = result[y]
    }
    let [gameData,setGameData] = useState(out)
    let [refresh,setRefresh] = useState(false)
    let [prev, setPrev] = useState(null)

    return (
        <View style={ styles.container }>
            <BackBtnTop/>
            <FlatList
                style={styles.flatList}
                data={gameData}
                extraData={refresh}
                renderItem={({item}) => {
                    return(
                    <View key={item.id} style={styles.prevContainer}>
                        <TouchableOpacity onPress={() => { prev !== item.id ? setPrev(item.id) : setPrev(null)
                            setRefresh(!refresh)}}>
                            <PreviewPlayItem item={item}/>
                        </TouchableOpacity>
                        {(prev === item.id &&
                            <PreviewField style={styles.previewPlayItem} id={item.id}/>
                        )}
                    </View>
                    )
                }}
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
    prevContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    previewPlayItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        top: '3%',
    },
})
