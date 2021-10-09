import { createStore, combineReducers } from 'redux'
import { ScreenReducer } from './reducers/ScreenReducer'
import { ScoreReducer } from './reducers/ScoreReducer'
import { GameReducer } from "./reducers/GameReducer";


const rootReducer = combineReducers({
    ScreenReducer: ScreenReducer,
    ScoreReducer: ScoreReducer,
    GameReducer: GameReducer,
})

export const store = createStore(rootReducer)