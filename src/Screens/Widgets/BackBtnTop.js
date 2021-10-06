import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text } from "react-native";

import back from "../../../assets/back.png"
/**
 * Компонент отрисовки кнопки возвращения в главное меню
 *
 * @param props - содержит:
 * changeScreen()-изменение id отображаемого экрана */
export const BackBtnTop = (props) => {
    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.btnBack}
                              onPress={() => props.changeScreen(0)}>
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
