import React from "react";
import { StyleSheet, View } from "react-native";
import { GameData } from "../../GameData";
import { PlayRow } from "../../PlayField/PlayRow";

import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";


export const PreviewField = (props) => {
    let images = []
    Preview()
    function Preview() {
        let lastGame = GameData.getGames(props.id)
        if (lastGame !== null) {
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
        alignItems: 'center',
        justifyContent: 'center',
    },
})