import {createSlice} from "@reduxjs/toolkit";
import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";


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

        bot: false
    },
    reducers:{
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
        restartGame(state){
            if(state.bot) {
                state.singleMove = true
                state.singleImages = []
                state.singleImagesId = [0, -1, -2, -3, -4, -5, -6, -7, -8]
                state.singlePressed = []
                state.singleCountPressed = 0
            } else {
                return {
                    ...state,
                    playersMove: true,
                    playersImages: [],
                    playersImagesId: [0, -1, -2, -3, -4, -5, -6, -7, -8],
                    playersPressed: [],
                    playersCountPressed: 0,
                }
            }
        },
        setGame(state,action) {
            console.log("СЕТ ГЕЙМ: " + action.payload)
        },
        setBot(state,action){
            state.bot = action.payload
        }
    }
})

export default GameSlice.reducer
export const { changeImage, restartGame, setGame, setBot } = GameSlice.actions