import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {changeImage, winGame} from "../store/reducers/GameSlice";
import {botMove} from "./PlayField";
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * btnId-номер кнопки на поле на поле;
 * images-состояние картинки данной кнопки;
 * changeImage()-метод изменения экрана */
export const PlayBtn = (props) => {
    const dispatch  = useDispatch();
    const bot = useSelector(state => state.GameSlice.bot)
    const image = useSelector(state =>
        (bot  ? state.GameSlice.singleImages[props.btnId]
                    : state.GameSlice.playersImages[props.btnId]))

    function makeMove(btnId){
        dispatch(changeImage(btnId))
        dispatch(winGame())
        setTimeout(function(){
            botMove()
        },Math.floor(Math.random() * 1000) + 1000) // Ожидает перед ходом 1-2 секунды
    }

    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => makeMove(props.btnId)}>
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