import React, { useState } from 'react';
import {StyleSheet, View, Alert, AsyncStorage} from 'react-native';
import { PlayRow } from './PlayRow';
import { GameData } from '../GameData';

import krest from "../../assets/krest.png";
import circle from "../../assets/circle.png";

export const PlayField = (props) => {
    let lastGame = {}
    let outputGameData = {
        id: 0,
        bot: false,
        winner: true,
        leftState: '',
        rightState: '',
        imagesId: [],
        date: '',
    }
    let [images,setImages] = useState([])
    let [imagesId,setImagesId] = useState([0,-1,-2,-3,-4,-5,-6,-7,-8])
    let [pressed,setPressed] = useState([])
    let [countPressed,setCountPressed] = useState(0)
    let date = new Date()

    if(!props.goPlay){
        lastGame = GameData.getLastGame()
        if(lastGame !== null) {
            for (let i = 0; i < 9; i++) {
                setStates(i, lastGame.imagesId[i])
            }
        }
    }

    function setStates(i, item) {
        switch (item) {
            case 1:
                makeMove(i, true)
                break
            case 2:
                makeMove(i, false)
                break
            default:
                images[i] = undefined
                imagesId[i] = -i
                break
        }
    }

    function makeMove(id,move){
        images[id] = (move) ? krest : circle
        imagesId[id] = (move) ? 1 : 2
        pressed[id] = true
        if (!props.goPlay)
            countPressed++
        else
            setCountPressed(++countPressed)
    }

    function setOutputGameData(move){

        outputGameData.bot = props.bot
        outputGameData.winner = move
        if (move !== null) {
            outputGameData.leftState = move ? 'Win' : 'Lose'
            outputGameData.rightState = move ? 'Lose' : 'Win'
        }
        else {
            outputGameData.leftState = 'Drawn'
            outputGameData.rightState = 'Drawn'
        }
        outputGameData.imagesId = Object.assign([],imagesId)
        outputGameData.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
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
            setOutputGameData(move)
            GameData.saveGameData(outputGameData)
            return true
        } else if (countPressed === 9) {
            Alert.alert(
                "Ничья!",
                "Победила ДРУЖБА",
                [
                    {text: "Заново", onPress: () => restartGame()}
                ]
            )
            setOutputGameData(null)
            GameData.saveGameData(outputGameData)
            return true
        }
        return false
    }

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0} changeImage={changeImage} images={images}/>
            <PlayRow rowId={1} changeImage={changeImage} images={images}/>
            <PlayRow rowId={2} changeImage={changeImage} images={images}/>
        </View>
    );
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