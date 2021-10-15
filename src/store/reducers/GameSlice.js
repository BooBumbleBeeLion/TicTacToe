import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { GameData } from "../../GameData";
import { restart } from "../../PlayField/PlayField"
import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";

/**
 * Объект Slice из Redux toolkit*/
const GameSlice = createSlice({
    name:'GameSlice',
    initialState:{
        singleMove: true,
        playersMove: true,

        singleImages: [],
        playersImages: [],

        singleImagesId: [0,-1,-2,-3,-4,-5,-6,-7,-8],
        playersImagesId: [0,-1,-2,-3,-4,-5,-6,-7,-8],

        singlePressed: [],
        playersPressed: [],

        singleCountPressed: 0,
        playersCountPressed: 0,

        bot: false,
        win: false,
        setGame: true,
    },
    reducers:{
        /** Редусер для смены картинки на поле(совершение хода) */
        changeImage(state, action){
            if(state.bot) {
                if (!state.singlePressed[action.payload]){
                    state.singleImages[action.payload] = (state.singleMove) ? krest : circle
                    state.singleImagesId[action.payload] = (state.singleMove) ? 1 : 2
                    state.singlePressed[action.payload] = true
                    state.singleMove = !state.singleMove
                    state.singleCountPressed = state.singleCountPressed+1
                }
            }else {
                if (!state.playersPressed[action.payload]){
                    state.playersImages[action.payload] = (state.playersMove) ? krest : circle
                    state.playersImagesId[action.payload] = (state.playersMove) ? 1 : 2
                    state.playersPressed[action.payload] = true
                    state.playersMove = !state.playersMove
                    state.playersCountPressed = state.playersCountPressed+1
                }
            }
        },
        /** Редусер для сброса игрового состояния текущего режима игры до дефолта */
        restartGame(state){
            console.log("RESTART")
            if(state.bot) {
                state.singleMove = true
                state.singleImages = []
                state.singleImagesId = [0, -1, -2, -3, -4, -5, -6, -7, -8]
                state.singlePressed = []
                state.singleCountPressed = 0
            } else {
                state.playersMove = true
                state.playersImages = []
                state.playersImagesId = [0, -1, -2, -3, -4, -5, -6, -7, -8]
                state.playersPressed = []
                state.playersCountPressed = 0
            }
            state.win = false
        },
        /** Редусер для задания конкретного полного игрового состояния приложения */
        setGame(state,action) {
            if(state.setGame) {
                state.singleMove = action.payload?.singleMove ?? true
                state.playersMove = action.payload?.playersMove ?? true

                state.singleImages = action.payload?.singleImages ?? []
                state.playersImages = action.payload?.playersImages ?? []

                state.singleImagesId = action.payload?.singleImagesId ?? [0,-1,-2,-3,-4,-5,-6,-7,-8]
                state.playersImagesId = action.payload?.playersImagesId ?? [0,-1,-2,-3,-4,-5,-6,-7,-8]

                state.singlePressed = action.payload?.singlePressed ?? []
                state.playersPressed = action.payload?.playersPressed ?? []

                state.singleCountPressed = action.payload?.singleCountPressed ?? 0
                state.playersCountPressed = action.payload?.playersCountPressed ?? 0
                state.setGame = false
            }
        },
        /** Редусер для задания играем с ботом или нет) */
        setBot(state,action){
            state.bot = action.payload
        },
        /** Редусер для проверки выигрыша на игровом поле */
        winGame(state) {
            let outputGameData
            let bot = state.bot
            let move = state.bot ? state.singleMove
                : state.playersMove
            let imagesId = state.bot ? Object.assign([], state.singleImagesId)
                : Object.assign([], state.playersImagesId)
            let countPressed = state.bot ? state.singleCountPressed
                : state.playersCountPressed

            if ((imagesId[0] === imagesId[1] && imagesId[0] === imagesId[2]) ||
                (imagesId[3] === imagesId[4] && imagesId[3] === imagesId[5]) ||
                (imagesId[6] === imagesId[7] && imagesId[6] === imagesId[8]) ||
                (imagesId[0] === imagesId[3] && imagesId[0] === imagesId[6]) ||
                (imagesId[1] === imagesId[4] && imagesId[1] === imagesId[7]) ||
                (imagesId[2] === imagesId[5] && imagesId[2] === imagesId[8]) ||
                (imagesId[0] === imagesId[4] && imagesId[0] === imagesId[8]) ||
                (imagesId[2] === imagesId[4] && imagesId[2] === imagesId[6])) {
                state.win = true
                Alert.alert(
                    "Конец игры!",
                    "Победили " + (!move ? 'КРЕСТИКИ' : 'НОЛИКИ'),
                    [
                        {text: "Заново", onPress: () => restart(bot, !move)}
                    ]
                )
                outputGameData = setOutputGameData(state, !move)
                // GameData.saveGoFinishGame('nul')
                GameData.saveGameData(outputGameData)
            } else if (countPressed === 9) {
                state.win = true
                Alert.alert(
                    "Ничья!",
                    "Победила ДРУЖБА",
                    [
                        {text: "Заново", onPress: () => restart(bot, null)}
                    ]
                )
                outputGameData = setOutputGameData(state, null)
                // GameData.saveGoFinishGame('nul')
                GameData.saveGameData(outputGameData)
            }
            if(!state.win) {
                GameData.saveGoFinishGame({
                    singleMove: state.singleMove,
                    playersMove: state.playersMove,

                    singleImages: state.singleImages,
                    playersImages: state.playersImages,

                    singleImagesId: state.singleImagesId,
                    playersImagesId: state.playersImagesId,

                    singlePressed: state.singlePressed,
                    playersPressed: state.playersPressed,

                    singleCountPressed: state.singleCountPressed,
                    playersCountPressed: state.playersCountPressed,
                })
            }
        },

    }
})
/**
 * Метод для формирования объекта с данными о выигранной партии
 * @param {object} state - состояние игровых данных
 * @param {boolean} move - состояние хода
 * @return {object} Литерал объект информации о выигранной партии */
function setOutputGameData(state, move){
    let outputGameData = {
        id: 0,
        bot: false,
        winner: true,
        leftState: '',
        rightState: '',
        imagesId: [],
        date: '',
    }
    let date = new Date()
    let imagesId = state.bot ? Object.assign([], state.singleImagesId)
        : Object.assign([], state.playersImagesId)

    outputGameData.bot = state.bot
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
    return outputGameData
}

export default GameSlice.reducer
export const { changeImage, restartGame, setGame, setBot, winGame } = GameSlice.actions