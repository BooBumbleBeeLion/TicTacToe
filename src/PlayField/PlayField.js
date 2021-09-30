import React, { useState } from 'react';
import {StyleSheet, View, Alert, AsyncStorage} from 'react-native';
import { PlayRow } from './PlayRow'

import krest from "../../res/krest.png";
import circle from "../../res/circle.png";

export const PlayField = (props) => {

    let result = []
    let [images,setImages] = useState([])
    let [imagesId,setImagesId] = useState([0,-1,-2,-3,-4,-5,-6,-7,-8])
    let [pressed,setPressed] = useState([])
    let [countPressed,setCountPressed] = useState(0)

    if(!props.goPlay){
        loadLastGameData()
    }

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0} changeImage={changeImage} images={images}/>
            <PlayRow rowId={1} changeImage={changeImage} images={images}/>
            <PlayRow rowId={2} changeImage={changeImage} images={images}/>
        </View>
    );
    async function saveLastGameData(move, bot) {
        try {
            // ЗАпись состояния игрового поля
            for (let i=0;i<9;i++) {
                await AsyncStorage.setItem(
                    `lastGameImages_${i}`,
                    imagesId[i] === 1 ? 'krest' : imagesId[i] === 2 ? 'circle' : 'undefined'
                )
            }
            // Запись победителя
            await AsyncStorage.setItem(
                `lastWinner`,
                move ? 'krest' : 'circle'
            )
            // Запись того, играл против бота или человека
            await AsyncStorage.setItem(
                `lastWinnerPerson`,
                props.bot ? 'bot' : 'human'
            )
        } catch (error) {
            console.log(error)
        }
    }
    async function loadLastGameData() {
        try {
            result = []
            for (let i=0;i<9;i++) {
                result.push(await AsyncStorage.getItem(`lastGameImages_${i}`));
                await _setStates(i, result[i]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function _setStates(i, item) {
        switch (item) {
            case 'krest':
                makeMove(i, true)
                break
            case 'circle':
                makeMove(i, false)
                break
            case 'undefined':
                images[i] = undefined
                imagesId[i] = -i
                break
        }
    }

    function restartGame() {
        props.setMove(true)
        setImages([])
        setImagesId([0, -1, -2, -3, -4, -5, -6, -7, -8])
        setPressed([])
        setCountPressed(0)
    }

    function changeImage(id) {
        if (props.goPlay){
            // Если ранее не нажата
            if (!pressed[id]) {
                makeMove(id, props.move)
                if (!winGame(props.move) && props.bot && countPressed !== 9) {
                    // Если бот, то выполняется ход следующий сразу без смены состояния очереди хода
                    let rndId = Math.floor(Math.random() * 9);
                    while (pressed[rndId]) {
                        rndId = Math.floor(Math.random() * 9);
                    }
                    makeMove(rndId, !props.move)
                    winGame(!props.move)
                } else { // Если не бот просто меняется состояние очереди хода
                    props.setMove(!props.move)
                }
            }
        }
    }

    function makeMove(id,move){
        images[id] = (move) ? krest : circle
        imagesId[id] = (move) ? 1 : 2
        setCountPressed(++countPressed)
        pressed[id] = true
    }

    function winGame(move) {
        // Проверка всех вариантов победы (8 вариантов: 3 по горизонтали, 3 по вертикали, 2 по диагонали)
        if ((imagesId[0] === imagesId[1] && imagesId[0] === imagesId[2]) ||
            (imagesId[3] === imagesId[4] && imagesId[3] === imagesId[5]) ||
            (imagesId[6] === imagesId[7] && imagesId[6] === imagesId[8]) ||
            (imagesId[0] === imagesId[3] && imagesId[0] === imagesId[6]) ||
            (imagesId[1] === imagesId[4] && imagesId[1] === imagesId[7]) ||
            (imagesId[2] === imagesId[5] && imagesId[2] === imagesId[8]) ||
            (imagesId[0] === imagesId[4] && imagesId[0] === imagesId[8]) ||
            (imagesId[2] === imagesId[4] && imagesId[2] === imagesId[6])) {
            // Вызов Алерта на смартфоне
            Alert.alert(
                "Конец игры!",
                "Победили " + (move ? 'КРЕСТИКИ' : 'НОЛИКИ'),
                [
                    {text: "Заново", onPress: () => restartGame()}
                ]
            )
            move ? props.setLeftScore(props.leftScore + 1)
                 : props.setRightScore(props.rightScore + 1)
            saveLastGameData(move)
            return true
        } else if (countPressed === 9) {
            Alert.alert(
                "Ничья!",
                "Победила ДРУЖБА",
                [
                    {text: "Заново", onPress: () => restartGame()}
                ]
            )
            saveLastGameData()
            return true
        }
        return false
    }
}
const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        // backgroundColor: '#347298',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%',
    },
})