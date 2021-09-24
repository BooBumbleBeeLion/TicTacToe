import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { MainButton } from './MainButton';

// Images
import icon from '../../assets/icon.png';

export const MainScreen = (props) => {
    return (
        <View style={ styles.navBar }>
            <Image style={ styles.navImage } source={icon}/>
            <View style={ styles.mainBtns}>
                <MainButton title={'Одиночная игра'} id={1} changeState={props.changeState}/>
                <MainButton title={'Игра на двоих'} id={2} changeState={props.changeState}/>
                <MainButton title={'История игр'} id={3} changeState={props.changeState}/>
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
        //backgroundColor: '#FFFFFF',
    },
    mainBtns:{
        marginTop: '15%',
        flexDirection: 'column',
    },
})
