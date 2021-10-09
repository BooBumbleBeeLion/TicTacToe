import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MainButton } from './MainButton';
import { GameData } from "../../GameData";

// Images
import icon from '../../../assets/icon.png';
/**
 * Компонент отрисовки начального экрана с навигацией по другим экранам
 *
 * @param props - содержит: Метод для изменения отображаемого экрана */
export const MainScreen = (props) => {
    // GameData.clearGameData()
    GameData.loadGameData()

    return (
        <View style={ styles.navBar }>
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
    navBar: {
        marginTop: '20%',
        alignItems: 'center',
    },
    navImage: {
        height: 256,
        width: 256,
    },
    mainBtns:{
        marginTop: '10%',
        flexDirection: 'column',
    },
})
