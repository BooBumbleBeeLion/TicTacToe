import React from "react";
import {StyleSheet, View, Text, Image} from "react-native";

import athlete from "../../../assets/athlete.png"
import chatbot from "../../../assets/chatbot.png"
import {useSelector} from "react-redux";
/**
 * Компонент отображения игрового состояния
 *
 * @param props - содержит:
 * text- отображаемый текст;
 * player-слева или справа расположен игрок;
 * move-чей текущий ход;
 * bot-играем с ботом или человеком */
export const CountDisplay = ({text, player, move, bot}) => {

    return (
        <View>
            <Image style={{
                width: asMove('width', move),
                height: asMove('height', move),
            }} source={ (bot) ? chatbot : athlete }/>
            <View style={{
                ...styles.countDisplay,
                right: asStyle('right',player),
                alignItems: asStyle('alignItems',player),
            }}>
                <Text style={{
                    ...styles.text,
                    left : (player==='left' && text==='Drawn')? 10 : 0
                }}>{text}</Text>
            </View>
        </View>
    )
}
/**
 * Метод для задания размеров картинки, взависимости от того, чей ход
 * @param {string} style - название стиля
 * @param {boolean} move - чей текущий ход
 * @description Если текущий ход данного компонента, то он становится больше
 * */
const asMove = (style,move) => {
    if(move === null)
        return (style === 'width') ? 100 : 120
    else if (move)
        return (style === 'width') ? 100 : 120
    else
        return (style === 'width') ? 82 : 100
}
/**
 * Метод для задания позиционирования кружочка и картинки с нужными отступами
 * @param {string} style - Какой стиль задаём
 * @param {string} player - Левый или правый игрок*/
const asStyle = (style, player) => {
    switch (style){
        case 'alignItems':
            switch (player){
                case 'left':
                    return 'flex-end'
                case 'right':
                    return 'flex-start'
            }
            break
        case 'right':
            switch (player){
                case 'left':
                    return -50
                case 'right':
                    return 40
            }
            break
    }
}

const styles = StyleSheet.create({
    countDisplay: {
        position: 'absolute',
        width: '130%',
        height: '17%',
        backgroundColor: '#FFD04A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 30,
        zIndex: -1,
        top: -5,
    },
    text:{
        fontWeight: 'bold',
        fontSize: 22,
    },
})