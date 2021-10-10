import {createSlice} from "@reduxjs/toolkit";


const ScreenSlice = createSlice({
    name:'ScreenSlice',
    initialState:{
        screenId: 0,
        bot: false,
    },
    reducers:{
        setScreen(state,action){
            state.screenId = action.payload
        },
        setBot(state,action){
            state.bot = action.payload
        }
    }
})

export default ScreenSlice.reducer
export const { setScreen, setBot } = ScreenSlice.actions