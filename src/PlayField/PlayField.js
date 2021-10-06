import React, { useState } from 'react';
import {StyleSheet, View, Alert, AsyncStorage} from 'react-native';
import { PlayRow } from './PlayRow';
import { GameData } from '../GameData';

import krest from "../../assets/krest.png";
import circle from "../../assets/circle.png";
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * [move,setMove]-Состояние хода;
 * leftScore-Состояние счета левого игрока;
 * rightScore-Состояние счета правого игрока;
 * bot-играем с ботом или нет;
 * changeScore()-изменение счёта*/
export const PlayField = (props) => {
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
    /**
     * Метод совершения хода на кнопке
     * @param {number} id-Кнопка на которой совершаем ход;
     * @param {bool} move-Чей ход */
    function makeMove(id,move){
        images[id] = (move) ? krest : circle
        imagesId[id] = (move) ? 1 : 2
        pressed[id] = true
        setCountPressed(++countPressed)
    }
    /**
     * Метод подготовки литерала outputGameData для сохранение в историю игр
     * @param {bool} move-чей последний ход */
    function setOutputGameData(move){
        outputGameData.bot = props.bot
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
    }
    /**
     * Метод сброса State до начальных значений */
    function restartGame() {
        props.setMove(true)
        setImages([])
        setImagesId([0, -1, -2, -3, -4, -5, -6, -7, -8])
        setPressed([])
        setCountPressed(0)
    }
    /**
     * Метод смены картинки нажатой кнопки на поле
     * @param {number} id-номер нажатой кнопки */
    function changeImage(id) {
        // Если ранее не нажата
        if (!pressed[id]) {
            makeMove(id, props.move)
            // Если играем против бота
            if (!winGame(props.move) && props.bot && countPressed !== 9) {
                // Если бот, то выполняется ход следующий сразу без смены состояния очереди хода
                let rndId = Math.floor(Math.random() * 9);
                while (pressed[rndId])
                    rndId = Math.floor(Math.random() * 9);
                makeMove(rndId, !props.move)
                winGame(!props.move)
            }
            else props.setMove(!props.move)
        }
    }
    /**
     * Метод проверки выигрыша с текущим состоянием поля
     * @param {bool} move-текущий ход
     * @return {bool} Состояние выигрыша */
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
            move ? (props.bot ? props.changeScore('botLeftScore') : props.changeScore('playersLeftScore'))
                 : (props.bot ? props.changeScore('botRightScore') : props.changeScore('playersRightScore'))
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