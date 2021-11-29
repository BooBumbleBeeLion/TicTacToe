import React, {useState} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { GameScreen } from './src/Screens/GameScreen/GameScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import { LastGameScreen } from "./src/Screens/LastGameScreen/LastGameScreen";
import { setBot } from "./src/store/reducers/GameSlice";
import { MainAuthScreen } from "./src/Screens/AuthScreens/MainAuthScreen"
import { LoginScreen } from "./src/Screens/AuthScreens/LoginScreen"
import { RegisterScreen } from "./src/Screens/AuthScreens/RegisterScreen"
import {GameData} from "./src/GameData";
import {setAuth} from "./src/store/reducers/ScreenSlice";

/**
 * Основной компонент для отображения всех компонентов */
export function App() {
    const dispatch  = useDispatch();
    const screenId = useSelector(state => state.ScreenSlice.screenId)
    const [firstRender,setFirstRender] = useState(true)

    if(firstRender){
        firstLoad().then()
        setFirstRender(false)
    }

    return (
        <View style={styles.background}>
            <StatusBar />
            {asScreen(screenId)}
        </View>
    );
    async function firstLoad() {
        // await GameData.clearGameData()
        // await GameData.saveUser("bbl2", "bbl2")
        await GameData.loadUser()
        // console.log("!GameData.isAuth::"+!GameData.isAuth)
        !GameData.isAuth ? dispatch(setAuth(false)) : await GameData.loadUserGames(GameData.userToken)

        // console.log(GameData.isAuth + "|" + GameData.userToken)
        await GameData.loadGoFinishGame()
    }
    /**
     * Возвращает выбранный экран
     * @param {number} screenId - ID нужного нам экрана
     * @return {Component} Компонент выбранного экрана */
    function asScreen(screenId) {
        switch (screenId) {
            case 1:
                return (<LastGameScreen/>)
            case 2:
                dispatch(setBot(true))
                return (<GameScreen/>)
            case 3:
                dispatch(setBot(false))
                return (<GameScreen/>)
            case 4:
                return (<TableScreen/>)
            case 5:
                return (<MainAuthScreen />)
            case 6:
                return (<LoginScreen />)
            case 7:
                return (<RegisterScreen />)
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
