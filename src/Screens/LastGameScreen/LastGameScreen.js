import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";
import { GameData } from "../../GameData";

export const LastGameScreen = (props) => {

    let lastGame = {}
    let [bot, setBot] = useState(true)
    let [move, setMove] = useState(true)
    let [leftState, setLeftState] = useState('');
    let [rightState, setRightState] = useState('');
    loadData()

    function loadData() {
        lastGame = GameData.getLastGame();

        if(lastGame !== null) {
            bot = lastGame.bot
            move = lastGame.winner
            leftState = lastGame.leftState
            rightState = lastGame.rightState
        }else alert("Вы еще не сыграли ни одной игры!")
    }

    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                <CountDisplay text={leftState} player={'left'} move={move} bot={false}/>
                <CountDisplay text={rightState} player={'right'} move={!move} bot={bot}/>
            </View>
            <PlayField goPlay={false} bot={false} />
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
