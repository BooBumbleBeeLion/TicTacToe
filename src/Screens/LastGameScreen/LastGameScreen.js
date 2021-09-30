import React, {useState} from "react";
import {AsyncStorage, StyleSheet, View} from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";

export const LastGameScreen = (props) => {
    let result = ''
    let person
    const [bot,setBot] = useState(true)
    const [move,setMove] = useState(true)
    const [leftState,setLeftState] = useState('');
    const [rightState,setRightState] = useState('');

    loadLastWinnerData()

    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                {/* Короче text-выводимый текст; player- с какой он стороны; move-чей щас ход; person-какую картинку ставить*/}
                <CountDisplay text={leftState} player={'left'} move={move} bot={false}/>
                <CountDisplay text={rightState} player={'right'} move={!move} bot={bot}/>
            </View>
            <PlayField goPlay={false} bot={props.bot}/>
        </View>
    )

    async function loadLastWinnerData() {
        try {
            result = await AsyncStorage.getItem("lastWinner");
            if(result === 'krest') {
                setLeftState('Win')
                setRightState('Lose')
                setMove(true)
            }
            else {
                setLeftState('Lose')
                setRightState('Win')
                setMove(false)
            }
            person = await AsyncStorage.getItem("lastWinnerPerson");
            if(person === 'bot')
                setBot(true)
            else
                setBot(false)

        } catch (error) {
            console.log(error);
        }
    }
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
        // backgroundColor: '#000000'
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
