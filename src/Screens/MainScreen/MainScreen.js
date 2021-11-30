import React from "react";
import { StyleSheet, View, Image, BackHandler, Alert } from "react-native";
import { MainButton } from './MainButton';
import { GameData } from "../../GameData";
// Images
import icon from '../../../assets/icon.png';
import {AuthBtnTop} from "../Widgets/AuthBtnTop";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../store/reducers/ScreenSlice";
/**
 * Компонент отрисовки начального экрана с навигацией по другим экранам */
export const MainScreen = (props) => {
    const isAuth = useSelector(state => state.ScreenSlice.isAuth)
    GameData.isAuth ? GameData.loadUserGames() : GameData.loadGameData()


    BackHandler.addEventListener("hardwareBackPress", () => {
        Alert.alert(
            "Вы куда?",
            "Поиграйте ещё",
            [
                {text: "Остаться", onPress: () => {}},
                {text: "Выйти", onPress: () => BackHandler.exitApp()}
            ]
        )
        return true
    })

    return (
        <View style={ styles.container }>
            { !isAuth ? (<AuthBtnTop title={'Войти'} id={5}/>) : (<AuthBtnTop title={'Выйти'} id={5}/>) }
            <Image style={ styles.navImage } source={icon}/>
            <View style={ styles.mainBtns}>
                <MainButton title={'Последняя игра'} id={1}/>
                <MainButton title={'Одиночная игра'} id={2}/>
                <MainButton title={'Игра на двоих'} id={3}/>
                <MainButton title={'История игр'} id={4}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '6%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    navImage: {
        height: 256,
        width: 256,
    },
    mainBtns:{
        flexDirection: 'column',
    },
})
