import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text } from "react-native";
import {PlayField} from '../../PlayField/PlayField'
import {CountDisplay} from "../Widgets/CountDisplay";
import {BackBtnTop} from "../Widgets/BackBtnTop";
import {TwoPlayersScreen} from "../TwoPlayersScreen/TwoPlayersScreen";

export const SinglePlayerScreen = (props) => {
    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                {/* Короче text-выводимый текст; player- с какой он стороны; move-чей щас ход; person-какую картинку ставить*/}
                <CountDisplay text={props.leftScore} player={'left'} move={props.states.move} person={'human'} states={props.states}/>
                <CountDisplay text={props.rightScore} player={'right'} move={!props.states.move} person={'bot'} states={props.states}/>
            </View>
            <PlayField state={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
    playersView: {
        flex: .4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        //backgroundColor: '#000000'
    },
    btnChild: {
        height: 70,
        width: 300,
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: '#D4DDE1',
        borderRadius: 20,
    },
    btnText: {
        fontSize: 20,
        flex: 1,
        textAlignVertical : 'center',
    },
})
