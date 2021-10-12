import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ScreenSlice from "./reducers/ScreenSlice";
import ScoreSlice from "./reducers/ScoreSlice"
import GameSlice from "./reducers/GameSlice";

const rootReducer = combineReducers({
    ScreenSlice: ScreenSlice,
    ScoreSlice: ScoreSlice,
    GameSlice: GameSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})