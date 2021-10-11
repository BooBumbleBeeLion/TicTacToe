import {createSlice} from "@reduxjs/toolkit";


const ScoreSlice = createSlice({
    name:'ScoreSlice',
    initialState:{
        playerScore: 0,
        botScore: 0,
        firstPlayerScore: 0,
        secondPlayerScore: 0,
    },
    reducers:{
        plusPlayerScore(state){
            state.playerScore = state.playerScore + 1
        },
        plusBotScore(state){
            state.botScore = state.botScore + 1
        },
        plusFirstPlayerScore(state){
            state.firstPlayerScore = state.firstPlayerScore + 1
        },
        plusSecondPlayerScore(state){
            state.secondPlayerScore = state.secondPlayerScore + 1
        },
    }
})

export default ScoreSlice.reducer
export const { plusPlayerScore, plusBotScore, plusFirstPlayerScore, plusSecondPlayerScore } = ScoreSlice.actions