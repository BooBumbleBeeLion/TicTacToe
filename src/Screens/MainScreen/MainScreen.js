import React from "react";
import { StyleSheet, View, Image, BackHandler, Alert, AsyncStorage } from "react-native";
import { MainButton } from './MainButton';
import { GameData } from "../../GameData";
// Images
import icon from '../../../assets/icon.png';
/**
 * Компонент отрисовки начального экрана с навигацией по другим экранам */
export const MainScreen = (props) => {
    GameData.loadGameData()

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

    const getUserData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        const userName = await AsyncStorage.getItem('userName');
    }

    return (
        <View style={ styles.navBar }>
            <View>
                <Image style={ styles.navImage } source={icon}/>
            </View>
            <View style={ styles.mainBtns}>
                <MainButton title={'Авторизация'} id={5}/>
                <MainButton title={'Последняя игра'} id={1}/>
                <MainButton title={'Одиночная игра'} id={2}/>
                <MainButton title={'Игра на двоих'} id={3}/>
                <MainButton title={'История игр'} id={4}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
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
