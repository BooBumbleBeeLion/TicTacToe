import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { changeImage, winGame } from "../store/reducers/GameSlice";
import cross from "../../assets/krest.png";
import circle from "../../assets/circle.png";
let dispatch
let imagesId
let bot
let countPressed
let move
let win
/**
 * Компонент отрисовки игровой кнопки, содержит игровую логику
 * @param {number} props-btnId номер кнопки на поле */
export const PlayBtn = (props) => {
    dispatch  = useDispatch();
    const imageSingle = useSelector(state => state.GameSlice.singleImages[props.btnId])
    const imagePlayers = useSelector(state => state.GameSlice.playersImages[props.btnId])
    bot = useSelector(state => state.GameSlice.bot)
    move = useSelector(state => bot  ? state.GameSlice.singleMove
        : state.GameSlice.playersMove)
    imagesId = useSelector(state => bot ? state.GameSlice.singleImagesId
        : state.GameSlice.playersImagesId)
    countPressed = useSelector(state => bot ? state.GameSlice.singleCountPressed
        : state.GameSlice.playersCountPressed)
    win = useSelector(state => state.GameSlice.win)
    /**
     * Функция для совершения хода, проверки выигрыша */
    function makeMove(){
        dispatch(changeImage(props.btnId))
        dispatch(winGame())
        setTimeout(function(){
            botMove()
        },Math.floor(Math.random() * 1000) + 1000) // Ожидает перед ходом 1-2 секунды
    }

    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => makeMove()}>
            <Image style={styles.image} source={bot? imageSingle : imagePlayers}/>
        </TouchableOpacity>
    )
}
/**
 * Метод хода бота, если это разрешено*/
const botMove = () => {
    if(bot && countPressed !== 9 && !move && !win ) {
        console.log('ХОД БОТА' + win.toString())
        // let bestMove = bestScore(imagesId,3,3)
        // dispatch(changeImage(bestMove))
        // dispatch(winGame())
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
    ticButton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    image:{
        width: '90%',
        height: '90%',
        shadowOpacity: 0,
        marginTop: 5,
        marginLeft: 5,
    },
})