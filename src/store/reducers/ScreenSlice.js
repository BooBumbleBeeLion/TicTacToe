import {createSlice} from "@reduxjs/toolkit";


const ScreenSlice = createSlice({
    name:'ScreenSlice',
    initialState:{
        screenId: 0,
    },
    reducers:{
        setScreen(state,action){
            state.screenId = action.payload
        },
    }
})

export default ScreenSlice.reducer
export const { setScreen } = ScreenSlice.actions