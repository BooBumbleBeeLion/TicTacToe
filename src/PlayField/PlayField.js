import React from 'react';
import {StyleSheet, View } from 'react-native';
import { PlayRow } from './PlayRow';
import {useDispatch, useSelector} from "react-redux";
import { restartGame } from "../store/reducers/GameSlice";
import { plusBotScore, plusFirstPlayerScore, plusPlayerScore, plusSecondPlayerScore } from "../store/reducers/ScoreSlice";
import cross from "../../assets/krest.png";
import circle from "../../assets/circle.png";
let dispatch
let imagesId
let bot
let countPressed
let move
let win

export const PlayField = (props) => {
    dispatch = useDispatch()
    bot = useSelector(state => state.GameSlice.bot)
    move = useSelector(state => bot  ? state.GameSlice.singleMove
        : state.GameSlice.playersMove)
    imagesId = useSelector(state => bot ? state.GameSlice.singleImagesId
        : state.GameSlice.playersImagesId)
    countPressed = useSelector(state => bot ? state.GameSlice.singleCountPressed
        : state.GameSlice.playersCountPressed)
    win = useSelector(state => state.GameSlice.win)

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0}/>
            <PlayRow rowId={1}/>
            <PlayRow rowId={2}/>
        </View>
    );
}
export function restart(bot, move){
    dispatch(restartGame())
    if(move !== null) {
        if (bot)
            move ? dispatch(plusPlayerScore()) : dispatch(plusBotScore())
        else
            move ? dispatch(plusFirstPlayerScore()) : dispatch(plusSecondPlayerScore())
    }
}
export const botMove = () => {
    if(bot && countPressed !== 9 && !move && !win ) {
        // Если бот, то выполняется ход следующий сразу без смены состояния очереди хода
        // TODO: Серега доделай ход бота, чисто чтоб bestScore выбавал куда ходить и все, здесь все готово,бот ходит через 1-2 сек после крестиков(см. PlayBtn)
        console.log('ХОД БОТА' + win.toString())
        // let bestMove = bestScore(imagesId,3,3)
        // dispatch(changeImage(bestMove))
    }
}

const bestScore = (board, rowLength, columnLength) => {
    let bestScore = -Infinity
    let bestMove = 4;

    for (let i = 0; i < rowLength*columnLength.length; i++){
        if (board[i].image === null){
            board[i].image = cross
            let score = minimax(board, 0, false, rowLength, columnLength)
            board[i].image = null
            if (score > bestScore){
                bestScore = score
                bestMove = i
            }
        }
    }
    return bestMove
}
const minimax = (board, depth, isMaximazing, rowLength, columnLenght) => {
    let scores = {
        "X": 1,
        "O": -1,
        "Draw": 0
    }
    let result = checkWinning(board, cross)
    if (result !== undefined){
        return scores[result]
    }

    if (isMaximazing){
        let bestScore = -Infinity
        for (let i = 0; i < rowLength*columnLenght.length; i++){
            if (board[i].image === null){
                board[i].image = cross
                let score = minimax(board, depth + 1, false, rowLength, columnLenght)
                board[i].image = null
                if (score > bestScore){
                    bestScore = score
                }
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < rowLength*columnLenght.length; i++){
            if (board[i].image === null){
                board[i].image = circle
                let score = minimax(board, depth + 1, true, rowLength, columnLenght)
                board[i].image = null
                if (score < bestScore){
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}
const checkWinning = (board, player) => {
    if(
        (board[0].image === player && board[1].image === player && board[2].image === player) ||
        (board[3].image === player && board[4].image === player && board[5].image === player) ||
        (board[6].image === player && board[7].image === player && board[8].image === player) ||
        (board[0].image === player && board[3].image === player && board[6].image === player) ||
        (board[1].image === player && board[4].image === player && board[7].image === player) ||
        (board[2].image === player && board[5].image === player && board[8].image === player) ||
        (board[0].image === player && board[4].image === player && board[8].image === player) ||
        (board[2].image === player && board[4].image === player && board[6].image === player)
    ) {
        return player === cross ? "X" : "O"
    } else if (count === 5){
        return "Draw"
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