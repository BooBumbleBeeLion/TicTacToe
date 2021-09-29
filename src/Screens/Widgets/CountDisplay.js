import React from "react";
import {StyleSheet, View, Text, Image} from "react-native";

import athlete from "../../../assets/athlete.png"
import bot from "../../../assets/chatbot.png"

export const CountDisplay = (props) => {
    return (
        <View>
            <Image style={{
                width: asMove('width', props.move),
                height: asMove('height', props.move),
            }} source={ (props.bot) ? bot : athlete }/>
            <View style={{
                ...styles.countDisplay,
                right: asStyle('right',props.player),
                alignItems: asStyle('alignItems',props.player),
            }}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
}
// Метод для задания размеров картинки взависимости от того чей ход
const asMove = (style,move) => {
    if (move){
        return (style === 'width') ? 100 : 120
    } else {
        return (style === 'width') ? 82 : 100
    }

}
// Метод для задания позиционирования кружочка и картинки с отступами нужными
const asStyle = (style, player) => {
    switch (style){
        case 'alignItems':
            switch (player){
                case 'left':
                    return 'flex-end'
                case 'right':
                    return 'flex-start'
            }
        case 'right':
            switch (player){
                case 'left':
                    return -40
                case 'right':
                    return 40
            }
    }
}

const styles = StyleSheet.create({
    countDisplay: {
        position: 'absolute',
        width: 120,
        height: 50,
        backgroundColor: '#FFD04A',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 30,
        zIndex: -1,

        top: -5,
    },
    text:{
        fontWeight: 'bold',
        fontSize: 23
    },
    imagePlayerStyle: {
        width: 123,
        height: 150
    },
})