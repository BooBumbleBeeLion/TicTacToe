import { createSlice } from "@reduxjs/toolkit";

/**
 * Объект Slice из Redux toolkit*/
const ScoreSlice = createSlice({
    name:'ScoreSlice',
    initialState:{
        playerScore: 0,
        botScore: 0,
        firstPlayerScore: 0,
        secondPlayerScore: 0,
    },
    reducers:{
        /** Редусер для инкрементирования счёта игрока в одиночном режиме */
        plusPlayerScore(state){
            state.playerScore = state.playerScore + 1
        },
        /** Редусер для инкрементирования счёта бота в одиночном режиме */
        plusBotScore(state){
            state.botScore = state.botScore + 1
        },
        /** Редусер для инкрементирования счёта левого игрока в режиме на двоих */
        plusFirstPlayerScore(state){
            state.firstPlayerScore = state.firstPlayerScore + 1
        },
        /** Редусер для инкрементирования счёта правого игрока в режиме на двоих */
        plusSecondPlayerScore(state){
            state.secondPlayerScore = state.secondPlayerScore + 1
        },
    }
})

export default ScoreSlice.reducer
export const { plusPlayerScore, plusBotScore, plusFirstPlayerScore, plusSecondPlayerScore } = ScoreSlice.actions