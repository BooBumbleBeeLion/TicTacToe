import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { useSelector } from "react-redux";
/**
 * Компонент отображения игрового экрана
 *
 * @param props - содержит:
 * bot-с ботом или без;
 * leftScore-счет левого игрока;
 * rightScore-счет правого игрока;
 * changeScreen()-изменение id отображаемого экрана;
 * changeScore()-изменение счета игрока */
export const GameScreen = (props) => {

    const bot = useSelector(state => state.ScreenReducer.bot)
    const move = useSelector(state =>
        (bot  ? state.GameReducer.singleMove
            : state.GameReducer.playersMove))
    const leftScore = useSelector(state =>
        (bot  ? state.ScoreReducer.playerScore
            : state.ScoreReducer.firstPlayerScore))
    const rightScore = useSelector(state =>
        (bot  ? state.ScoreReducer.botScore
            : state.ScoreReducer.secondPlayerScore))
    // let move
    // let leftScore
    // let rightScore
    //
    // if(bot){
    //     move = useSelector(state =>state.GameReducer.singleMove)
    //     leftScore = useSelector(state => state.ScoreReducer.playerScore)
    //     rightScore = useSelector(state => state.ScoreReducer.botScore)
    // }else{
    //     move = useSelector(state =>state.GameReducer.playersMove)
    //     leftScore = useSelector(state => state.ScoreReducer.firstPlayerScore)
    //     rightScore = useSelector(state => state.ScoreReducer.secondPlayerScore)
    // }

    return (
        <View style={styles.container}>
            <BackBtnTop/>
            <View style={styles.playersView}>
                <CountDisplay text={leftScore} player={'left'} move={move} bot={false} />
                <CountDisplay text={rightScore} player={'right'} move={!move} bot={bot} />
            </View>
            <PlayField goPlay={true}/>
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
        flex: .7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
