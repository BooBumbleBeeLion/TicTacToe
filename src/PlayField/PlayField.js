import React, { useState } from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { PlayRow } from './PlayRow';
import { GameData } from '../GameData';
import {useDispatch, useSelector} from "react-redux";
import {
    plusBotScore,
    plusFirstPlayerScore,
    plusPlayerScore,
    plusSecondPlayerScore
} from "../store/reducers/ScoreSlice";
import {changeImage, restartGame, setGame} from "../store/reducers/GameSlice";
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * [move,setMove]-Состояние хода;
 * leftScore-Состояние счета левого игрока;
 * rightScore-Состояние счета правого игрока;
 * bot-играем с ботом или нет;
 * changeScore()-изменение счёта*/
let dispatch
let bot
let move
let images
let imagesId
let pressed
let countPressed
let date = new Date()
let outputGameData = {
    id: 0,
    bot: false,
    winner: true,
    leftState: '',
    rightState: '',
    imagesId: [],
    date: '',
}
export const PlayField = (props) => {
    dispatch = useDispatch()

    bot = useSelector(state => state.ScreenSlice.bot)

    if (bot) {
        console.log('INIT BOT')
        move = useSelector(state => state.GameSlice.singleMove)
        images = useSelector(state => state.GameSlice.singleImages)
        imagesId = useSelector(state => state.GameSlice.singleImagesId)
        pressed = useSelector(state => state.GameSlice.singlePressed)
        countPressed = useSelector(state => state.GameSlice.singleCountPressed)
    } else {
        console.log('INIT PLAYERS')
        move = useSelector(state => state.GameSlice.playersMove)
        images = useSelector(state => state.GameSlice.playersImages)
        imagesId = useSelector(state => state.GameSlice.playersImagesId)
        pressed = useSelector(state => state.GameSlice.playersPressed)
        countPressed = useSelector(state => state.GameSlice.playersCountPressed)
    }

    const botGame = GameData.getGoFinishGame(true)
    const playersGame = GameData.getGoFinishGame(false)
    console.log(botGame + "     " + playersGame)

    botGame !== 'null'  ? dispatch(setGame(botGame)) : {}
    playersGame !== 'null' ? dispatch(setGame(playersGame)) : {}

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0}/>
            <PlayRow rowId={1}/>
            <PlayRow rowId={2}/>
        </View>
    );
}
function setOutputGameData(move){
    outputGameData.bot = bot
    outputGameData.winner = move
    if (move !== null) {
        outputGameData.leftState = move ? 'Win' : 'Lose'
        outputGameData.rightState = move ? 'Lose' : 'Win'
    } else {
        outputGameData.leftState = 'Drawn'
        outputGameData.rightState = 'Drawn'
    }
    outputGameData.imagesId = Object.assign([],imagesId)
    outputGameData.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    // console.log(JSON.stringify(outputGameData))
}
export function botMove(){
    // console.log("БОТМУВ " + bot.toString() + " " + move)
    if(!winGame() && bot && countPressed !== 9 && !move === false) {
        // Если бот, то выполняется ход следующий сразу без смены состояния очереди хода
        let rndId = Math.floor(Math.random() * 9);
        while (pressed[rndId])
            rndId = Math.floor(Math.random() * 9);
        dispatch(changeImage(rndId, bot))
        // winGame()
    }
    console.log(move + '   ' +
    images + '   ' +
    imagesId + '   ' +
    pressed + '   ' +
    countPressed )
}
function winGame() {
    // console.log('ПРОВЕРКА + ' + countPressed)
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
            "Победили " + (!move ? 'КРЕСТИКИ' : 'НОЛИКИ'),
            [
                {text: "Заново", onPress: () => dispatch(restartGame(bot))}
            ]
        )
        !move   ? (bot ? dispatch(plusPlayerScore()) : dispatch(plusFirstPlayerScore()))
                : (bot ? dispatch(plusBotScore()) : dispatch(plusSecondPlayerScore()))
        setOutputGameData(!move)
        GameData.saveGoFinishGame('null', bot)
        GameData.saveGameData(outputGameData)
        return true
    } else if (countPressed === 8) {
        Alert.alert(
            "Ничья!",
            "Победила ДРУЖБА",
            [
                {text: "Заново", onPress: () => dispatch(restartGame())}
            ]
        )
        setOutputGameData(null)
        GameData.saveGoFinishGame('null', bot)
        GameData.saveGameData(outputGameData)
        return true
    }
    else{
        GameData.saveGoFinishGame({
            bot: bot,
            move: !move,
            images: images,
            imagesId: imagesId,
            pressed: pressed,
            countPressed: countPressed+1,
        }, bot)
    }
    return false
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