import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { GameData } from "../../GameData";
import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";

/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param {number} props id - загрузка конкретного матча по его id;
 * @param {boolean} props last - отображать последнюю игру или нет*/
export const PreviewField = (props) => {
    const rowLength = 3
    const columnLenght = Array.from(Array(3).keys())
    let playButtons = []
    if(props.last) {
        let lastGame = GameData.getLastGame()
        if (lastGame !== null && lastGame !== undefined) {
            for (let i = 0; i < 9; i++){
                playButtons.push({
                    id: i,
                    image:   lastGame.imagesId[i]===1 ? krest :
                        (lastGame.imagesId[i]===2 ? circle : undefined),
                })
            }
        }
    } else Preview()
    /**
     * Подгрузка и отображение конкретного матча */
    function Preview() {
        let lastGame = GameData.getGame(props.id)
        if (lastGame !== null && lastGame !== undefined) {
            for (let i = 0; i < rowLength*columnLenght.length; i++){
                playButtons.push({
                    id: i,
                    image:   lastGame.imagesId[i]===1 ? krest :
                            (lastGame.imagesId[i]===2 ? circle : undefined),
                })
            }
        }
    }

    return (
        <View style={styles.gridView}>
            {
                columnLenght.map((item) => (
                    <View key={ item*10 } style={ styles.rowView }>
                        {
                            playButtons.slice(item*rowLength, (1 + item)*rowLength).map(({id, image, size}) => (
                                <TouchableOpacity
                                    style={ styles.ticButton }
                                    key={ id }>
                                    <Image style={styles.image} source={ image }/>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        // backgroundColor: '#347298',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowView: {
        flexDirection: 'row',
    },
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