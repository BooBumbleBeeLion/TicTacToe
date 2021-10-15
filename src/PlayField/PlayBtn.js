import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { changeImage, winGame } from "../store/reducers/GameSlice";
import cross from "../../assets/krest.png";
let dispatch
let imagesId
let bot
let pressed
let countPressed
let copyImages = []
let move
let win
let bestMove
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
    pressed = useSelector(state => bot ? state.GameSlice.singlePressed
        : state.GameSlice.playersPressed)
    countPressed = useSelector(state => bot ? state.GameSlice.singleCountPressed
        : state.GameSlice.playersCountPressed)
    win = useSelector(state => state.GameSlice.win)
    if (win){
        copyImages = []
    }
    /**
     * Функция для совершения хода, проверки выигрыша */
    function makeMove(){
        dispatch(changeImage(props.btnId))
        copyImages[props.btnId] = 2
        dispatch(winGame())
        // Ожидает перед ходом 0.1 секунды
        setTimeout(function(){
            botMove(copyImages)
        },100)
    }

    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => makeMove()}>
            <Image style={styles.image} source={bot? imageSingle : imagePlayers}/>
        </TouchableOpacity>
    )
}
/**
 * Метод хода бота, если это разрешено*/
const botMove = (copyImages) => {
    if(bot && countPressed !== 9 && !move && !win){
        bestMove = bestScore(copyImages, 3, 3)
        copyImages[bestMove] = 2
        dispatch(changeImage(bestMove))
        dispatch(winGame())
    }
}

const bestScore = (board, rowLength, columnLength) => {
    let score = -Infinity
    let bestMove = Math.floor(Math.random() * (8));
    
    for (let i = 0; i < rowLength*columnLength; i++){
        if (board[i] === undefined){
            board[i] = 2
            let minmax = minimax(board, false, rowLength, columnLength)
            board[i] = null
            if (minmax > bestScore){
                score = minmax
                bestMove = i
            }
        }
    }
    if(!pressed[bestMove])
        return bestMove
    else
        return bestScore(board,rowLength,columnLength)
}

const minimax = (board, isMaximazing, rowLength, columnLenght) => {
    let scores = {
        "X": 1,
        "O": -1,
        "Draw": 0
    }
    let result = checkWinning(board, 2)
    if (result !== undefined){
        return scores[result]
    }

    if (isMaximazing){
        let bestScore = -Infinity
        for (let i = 0; i < rowLength*columnLenght; i++){
            if (board[i] === undefined){
                board[i] = 2
                let score = minimax(board,false, rowLength, columnLenght)
                board[i] = undefined
                if (score > bestScore){
                    bestScore = score
                }
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < rowLength*columnLenght; i++){
            if (board[i] === undefined){
                board[i] = 3
                let score = minimax(board, true, rowLength, columnLenght)
                board[i] = undefined
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
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
    ) {
        return player === cross ? "X" : "O"
    } else if (countPressed === 9){
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