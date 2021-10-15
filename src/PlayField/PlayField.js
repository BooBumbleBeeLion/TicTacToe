import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayRow } from './PlayRow';
import { useDispatch, useSelector } from "react-redux";
import {restartGame, winGame} from "../store/reducers/GameSlice";
import { plusBotScore, plusFirstPlayerScore, plusPlayerScore, plusSecondPlayerScore } from "../store/reducers/ScoreSlice";
let dispatch
let bot
let move
/**
 * Компонент для отрисовки игрового поля
 * @description Формирует поле через PlayRow компоненты*/
export const PlayField = (props) => {
    dispatch = useDispatch()
    bot = useSelector(state => state.GameSlice.bot)
    move = useSelector(state => bot  ? state.GameSlice.singleMove
        : state.GameSlice.playersMove)

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0}/>
            <PlayRow rowId={1}/>
            <PlayRow rowId={2}/>
        </View>
    );
}
/**
 * Экспортируемый Метод рестарта игрового состояния и инкрементирования счёта победителя */
export function restart(bot, move){
    dispatch(restartGame())
    dispatch(winGame()) // Для записи в goPlay нового состояния поля после рестарта
    if(move !== null) {
        if (bot)
            move ? dispatch(plusPlayerScore()) : dispatch(plusBotScore())
        else {
            move ? dispatch(plusFirstPlayerScore()) : dispatch(plusSecondPlayerScore())
        }
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