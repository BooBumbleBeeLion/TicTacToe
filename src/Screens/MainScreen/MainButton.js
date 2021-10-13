import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { setScreen } from "../../store/reducers/ScreenSlice";
import { useDispatch } from "react-redux";
/**
 * Компонент отрисовки кнопок навигации для начального экрана
 *
 * @param props - содержит:
 * title-Подпись посередине кнопки;
 * id-экрана, за которым закреплена эта кнопка; */
export const MainButton = (props) => {

    const dispatch  = useDispatch();

    return (
        <TouchableOpacity style={styles.btnChild} onPress={() => dispatch(setScreen(props.id))}>
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
