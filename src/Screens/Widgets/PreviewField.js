import React from "react";
import { StyleSheet, View } from "react-native";
import { GameData } from "../../GameData";
import { PlayRow } from "../../PlayField/PlayRow";

import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";

/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param props - содержит:
 * id-загрузка конкретного матча по его id */
export const PreviewField = (props) => {
    let images = []
    Preview()
    /**
     * Подгрузка и отображение конкретного матча
     * @param {number} id- Номер матча */
    function Preview() {
        let lastGame = GameData.getGame(props.id)
        if (lastGame !== null && lastGame !== undefined) {
            for (let i = 0; i < 9; i++) {
                switch (lastGame.imagesId[i]) {
                    case 1:
                        images[i] = krest
                        break
                    case 2:
                        images[i] = circle
                        break
                    default:
                        images[i] = undefined
                        break
                }
            }
        }
    }

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0} changeImage={function (id){}} images={images}/>
            <PlayRow rowId={1} changeImage={function (id){}} images={images}/>
            <PlayRow rowId={2} changeImage={function (id){}} images={images}/>
        </View>
    );
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1 ,
        alignItems: 'center',
        justifyContent: 'center',
    },
})