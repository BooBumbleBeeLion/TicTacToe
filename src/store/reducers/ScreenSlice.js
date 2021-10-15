import { createSlice } from "@reduxjs/toolkit";

/**
 * Объект Slice из Redux toolkit*/
const ScreenSlice = createSlice({
    name:'ScreenSlice',
    initialState:{
        screenId: 0,
    },
    reducers:{
        /** Редусер для задания id отображаемого экрана */
        setScreen(state,action){
            state.screenId = action.payload
        },
    }
})

export default ScreenSlice.reducer
export const { setScreen } = ScreenSlice.actions