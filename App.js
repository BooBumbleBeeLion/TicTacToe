import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { GameScreen } from './src/Screens/GameScreen/GameScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import { LastGameScreen } from "./src/Screens/LastGameScreen/LastGameScreen";
import {useDispatch, useSelector} from "react-redux";
import {setBotAction} from "./src/store/reducers/ScreenReducer";
import {GameData} from "./src/GameData";

GameData.loadGoFinishGame()
export function App() {
    const dispatch  = useDispatch();
    const screenId = useSelector(state => state.ScreenReducer.screenId)

    return (
        <View style={styles.background}>
            {asScreen(screenId)}
        </View>
    );
    /**
     * Возвращает выбранный экран
     * @param {number} screenId - ID нужного нам экрана
     * @return {Component} Компонент выбранного экрана */
    function asScreen(screenId) {
        switch (screenId) {
            case 1:
                return (<LastGameScreen/>)
            case 2:
                dispatch(setBotAction(true))
                return (<GameScreen/>)
            case 3:
                dispatch(setBotAction(false))
                return (<GameScreen/>)
            case 4:
                return (<TableScreen/>)
            default:
                return (<MainScreen/>)
        }
    }
}
const styles = StyleSheet.create({
    background : {
        flex : 1,
        backgroundColor: '#363237'
    },
})
