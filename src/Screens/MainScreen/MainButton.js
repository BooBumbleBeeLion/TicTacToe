import React from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
/**
 * Компонент отрисовки кнопок навигации для начального экрана
 *
 * @param props - содержит:
 * title-Подпись посередине кнопки;
 * id-экрана, за которым закреплена эта кнопка;
 * changeScreen(id)-изменение id отображаемого экрана*/
export const MainButton = (props) => {
    return (
        <TouchableOpacity style={styles.btnChild} onPress={() => props.changeScreen(props.id)}>
            <Text style={styles.btnText}> {props.title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnChild: {
        height: '13%',
        width: 300,
        marginTop: '7.5%',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#D4DDE1',
        borderRadius: 20,
        flexDirection: 'row',
    },
    btnText: {
        fontSize: 22,
        flex: 1,
        textAlignVertical : 'center',
        textAlign: "center",
    },
})
