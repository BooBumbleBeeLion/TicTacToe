import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, BackHandler } from "react-native";
import { setScreen } from "../../store/reducers/ScreenSlice";
import { useDispatch } from "react-redux";
import back from "../../../assets/back.png"
/**
 * Компонент отрисовки кнопки возвращения в главное меню */
export const BackBtnTop = (props) => {

    const dispatch  = useDispatch();

    BackHandler.addEventListener("hardwareBackPress", () => {
        dispatch(setScreen(0))
        return true
    })

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.btnBack}
                              onPress={() => dispatch(setScreen(0))}>
                <Image style={styles.image} source={back}/>
                <Text style={styles.text}>Назад</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        top: '3%',
        width: '100%',
    },
    btnBack: {
        margin: 10,
        width: 100,
        flexDirection: 'row',
    },
    image: {
        height: 35,
        width: 35,
    },
    text: {
        textAlignVertical: 'center',
        color: '#000000',
        fontSize: 20,
    },
})
