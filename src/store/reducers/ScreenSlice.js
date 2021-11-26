import { createSlice } from "@reduxjs/toolkit";

/**
 * Объект Slice из Redux toolkit*/
const ScreenSlice = createSlice({
    name:'ScreenSlice',
    initialState:{
        screenId: 0,
        isAuth: true,
    },
    reducers:{
        /** Редусер для задания id отображаемого экрана */
        setScreen(state,action){
            state.screenId = action.payload
        },
        /** Редусер для задания состояния Аутентификации */
        setAuth(state,action){
            state.isAuth = action.payload
        },
    }
})

export default ScreenSlice.reducer
export const { setScreen, setAuth } = ScreenSlice.actions