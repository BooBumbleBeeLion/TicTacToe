import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ScreenSlice from "./reducers/ScreenSlice";
// import GameSlice from "./reducers/GameSlice";

const rootReducer = combineReducers({
    ScreenSlice: ScreenSlice,
    // GameSlice: GameSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})