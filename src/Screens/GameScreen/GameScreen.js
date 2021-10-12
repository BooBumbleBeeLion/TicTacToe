import React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import {useDispatch, useSelector} from "react-redux";
import {GameData} from "../../GameData";
import {setScreen} from "../../store/reducers/ScreenSlice";
import {setGame} from "../../store/reducers/GameSlice";
/**
 * Компонент отображения игрового экрана */
export const GameScreen = (props) => {
    const dispatch = useDispatch();
    const bot = useSelector(state => state.GameSlice.bot)

    const move = useSelector(state =>
        (bot  ? state.GameSlice.singleMove
            : state.GameSlice.playersMove))
    const leftScore = useSelector(state =>
        (bot  ? state.ScoreSlice.playerScore
            : state.ScoreSlice.firstPlayerScore))
    const rightScore = useSelector(state =>
        (bot  ? state.ScoreSlice.botScore
            : state.ScoreSlice.secondPlayerScore))

    const goFinish = GameData.getGoFinishGame()
    dispatch(setGame(goFinish))

    BackHandler.addEventListener("hardwareBackPress", () => {
        dispatch(setScreen(0))
        return true
    })
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
