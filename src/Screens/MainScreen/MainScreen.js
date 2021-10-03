import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MainButton } from './MainButton';

// Images
import icon from '../../../assets/icon.png';
import {GameData} from "../../GameData";

export const MainScreen = (props) => {
    // GameData.clearGameData()
    GameData.loadGameData()
    return (
        <View style={ styles.navBar }>
            <Image style={ styles.navImage } source={icon}/>
            <View style={ styles.mainBtns}>
                <MainButton title={'Последняя игра'} id={1} changeScreen={props.changeScreen}/>
                <MainButton title={'Одиночная игра'} id={2} changeScreen={props.changeScreen}/>
                <MainButton title={'Игра на двоих'} id={3} changeScreen={props.changeScreen}/>
                <MainButton title={'История игр'} id={4} changeScreen={props.changeScreen}/>
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
