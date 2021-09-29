import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { PlayRow } from './PlayRow'

import krest from "../../res/krest.png";
import circle from "../../res/circle.png";

export const PlayField = (props) => {

    let [images,setImages] = useState([])
    let [imagesId,setImagesId] = useState([0,-1,-2,-3,-4,-5,-6,-7,-8])
    let [pressed,setPressed] = useState([])
    let [countPressed,setCountPressed] = useState(0)

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0} changeImage={changeImage} images={images}/>
            <PlayRow rowId={1} changeImage={changeImage} images={images}/>
            <PlayRow rowId={2} changeImage={changeImage} images={images}/>
        </View>
    );

    function restartGame() {
        props.setMove(true)
        setImages([])
        setImagesId([0,-1,-2,-3,-4,-5,-6,-7,-8])
        setPressed([])
        setCountPressed(0)
    }

    function changeImage(id) {
        // Если ход крестиков.
        if (props.move) {
            // Если ранее не нажата.
            if(!pressed[id]) {
                props.setMove(false)
                setCountPressed(++countPressed)
                images[id] = krest
                imagesId[id] = 1
                pressed[id] = true
            }
        }
        // Если ход ноликов.
        else{
            if(!pressed[id]) {
                props.setMove(true)
                setCountPressed(++countPressed)
                images[id] = circle
                imagesId[id] = 2
                pressed[id] = true
            }
        }
        // Проверка состояния выигрыша.
        winGame()
    }

    function winGame() {
        // Проверка всех вариантов победы (8 вариантов: 3 по горизонтали, 3 по вертикали, 2 по диагонали)
        if ((imagesId[0] === imagesId[1] && imagesId[0] === imagesId[2]) ||
            (imagesId[3] === imagesId[4] && imagesId[3] === imagesId[5]) ||
            (imagesId[6] === imagesId[7] && imagesId[6] === imagesId[8]) ||
            (imagesId[0] === imagesId[3] && imagesId[0] === imagesId[6]) ||
            (imagesId[1] === imagesId[4] && imagesId[1] === imagesId[7]) ||
            (imagesId[2] === imagesId[5] && imagesId[2] === imagesId[8]) ||
            (imagesId[0] === imagesId[4] && imagesId[0] === imagesId[8]) ||
            (imagesId[2] === imagesId[4] && imagesId[2] === imagesId[6])) {
            // Вызов Алерта на смартфоне
            Alert.alert(
                "Конец игры!",
                "Победили " + (props.move ? 'КРЕСТИКИ' : 'НОЛИКИ') + countPressed.toString(),
                [
                    {text: "Заново", onPress: () => restartGame()}
                ]
            )
            props.move
                ? props.setLeftScore(props.leftScore +1)
                : props.setRightScore(props.rightScore +1)
        } else if (countPressed === 9) {
            Alert.alert(
                "Ничья!",
                "Победила ДРУЖБА",
                [
                    {text: "Заново", onPress: () => restartGame()}
                ]
            )
        }

    }
}
const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        // backgroundColor: '#347298',
        alignItems: 'center',
        justifyContent: 'center',
    },
})