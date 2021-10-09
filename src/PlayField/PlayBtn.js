import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {changeImageAction} from "../store/reducers/GameReducer";
import {botMove} from "./PlayField";
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * btnId-номер кнопки на поле на поле;
 * images-состояние картинки данной кнопки;
 * changeImage()-метод изменения экрана */
export const PlayBtn = (props) => {
    const dispatch  = useDispatch();
    const bot = useSelector(state => state.ScreenReducer.bot)
    const image = useSelector(state =>
        (bot  ? state.GameReducer.singleImages[props.btnId]
                    : state.GameReducer.playersImages[props.btnId]))

    function makeMove(btnId, bot){
        dispatch(changeImageAction(btnId, bot))
        botMove()
    }

    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => makeMove(props.btnId, bot)}>
            <Image style={styles.image} source={image}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ticButton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    image:{
        width: '90%',
        height: '90%',
        shadowOpacity: 0,
        marginTop: 5,
        marginLeft: 5,
    },
})