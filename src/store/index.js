import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ScreenSlice from "./reducers/ScreenSlice";
import ScoreSlice from "./reducers/ScoreSlice"
import GameSlice from "./reducers/GameSlice";
/**
 * Комбинированный основной редусер из нескольких редусеров*/
const rootReducer = combineReducers({
    ScreenSlice: ScreenSlice,
    ScoreSlice: ScoreSlice,
    GameSlice: GameSlice,
})
/**
 * Основной магазин приложения с комбинированным редусером*/
export const store = configureStore({
    reducer: rootReducer,
})