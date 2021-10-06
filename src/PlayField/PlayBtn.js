import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * btnId-номер кнопки на поле на поле;
 * images-состояние картинки данной кнопки;
 * changeImage()-метод изменения экрана */
export const PlayBtn = (props) => {
    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => props.changeImage(props.btnId)}>
            <Image style={styles.image} source={props.images[props.btnId]}/>
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
    text: {
        textAlignVertical: 'center',
        color: '#000000',
        fontSize: 17,
    },
})