import React, {useState} from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { GameData } from "../../GameData";
import { PreviewField } from "../Widgets/PreviewField";
import {useDispatch} from "react-redux";
import {setScreenAction} from "../../store/reducers/ScreenReducer";
/**
 * Компонент отображения последней сыгранной игры
 *
 * @param props - содержит:
 * changeScreen()-изменение id отображаемого экрана */
export const LastGameScreen = (props) => {
    const dispatch = useDispatch();
    let lastGame = {}
    let [bot, setBot] = useState(true)
    let [move, setMove] = useState(true)
    let [leftState, setLeftState] = useState('');
    let [rightState, setRightState] = useState('');
    loadData()
    /**
     * Загружает данные о последней игры, помещает их в стейты */
    function loadData() {
        lastGame = GameData.getLastGame();

        if(lastGame !== null) {
            bot = lastGame.bot
            move = lastGame.winner
            leftState = lastGame.leftState
            rightState = lastGame.rightState
        }else alert("Вы еще не сыграли ни одной игры!")
    }
    BackHandler.addEventListener("hardwareBackPress", () => {
        dispatch(setScreenAction(0))
        return true
    })

    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                <CountDisplay text={leftState} player={'left'} move={move} bot={false}/>
                <CountDisplay text={rightState} player={'right'} move={!move} bot={bot}/>
            </View>
            <PreviewField last={true} />
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
        // top: '5%'
    },
    previewField: {

    }
})
