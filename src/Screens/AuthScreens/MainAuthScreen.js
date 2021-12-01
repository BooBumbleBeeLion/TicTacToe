import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import icon from '../../../assets/icon.png';
import { MainButton } from "../MainScreen/MainButton";
import { BackBtnTop } from "../Widgets/BackBtnTop";


export const MainAuthScreen = (props) => {
    return (
        <View style={styles.mainContainer}>
            <BackBtnTop/>
            <View style={ styles.navBar }>
                <Image style={ styles.navImage } source={icon}/>
                <View style={ styles.btnContainer }>
                    <MainButton title={'Войти'} id={6}/>
                    <MainButton title={'Зарегистрироваться'} id={7}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
    navBar: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    navImage: {
        height: 256,
        width: 256,
    },
    mainBtns:{
        marginTop: '10%',
        flexDirection: 'column',
    },
    btnContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
})
