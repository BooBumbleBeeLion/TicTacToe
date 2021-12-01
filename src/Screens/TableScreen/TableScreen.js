import React, { useState } from "react";
import { StyleSheet, View, FlatList, ToastAndroid, TouchableOpacity, Text, Alert } from "react-native";
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

    const removeItem = async (id, matchid) => {
        Alert.alert(
            "Удаление игры",
            "Вы действительно хотите удалить игру из истории?",
            [
                {text: "Да", onPress: async () =>  {
                    let serverMessage = ""
                    let request = 'http://mrjaxi-tictactoe.ml/gameMethod.deleteGameById?' +
                        'matchId=' + matchid
                    console.log(request)
                    await fetch(request)
                        .then(response => response.json())
                        .then(json => serverMessage = json)
            
                    if (serverMessage.hasOwnProperty("error"))
                        ToastAndroid.show(serverMessage["error"], ToastAndroid.LONG)
                    else if(serverMessage.hasOwnProperty("response")){
                        console.log(serverMessage.response)
                        GameData.loadUserGames().then()
                    } else
                        ToastAndroid.show("Не удалось сохранить игру в облако", ToastAndroid.LONG)
            
                    const newGameData = gameData.filter((element) => 
                        element.id !== id
                    )
            
                    setGameData(newGameData)
                    setRefresh(!refresh)
                }},
                {text: "Нет", onPress: () => { return false }}
            ]
        )
    }

    return (
        <View style={ styles.container }>
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
                        {(GameData.isAuth &&
                            <TouchableOpacity 
                                style={ styles.removeBtn }
                                onPress={() => removeItem(item.id, item.matchid)}
                            >
                                <Text style={ styles.removeText }>REMOVE</Text>
                            </TouchableOpacity>
                        )}
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
        paddingBottom: 25
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
    removeBtn : {
        width: '100%',
        height: 30,
        backgroundColor: '#FF1E1E',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        fontWeight: '700',
        fontSize: 16
    }
})