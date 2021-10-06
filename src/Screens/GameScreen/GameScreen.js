import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";
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

    const [move,setMove] = useState(true)

    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                <CountDisplay text={props.leftScore} player={'left'} move={move} bot={false}/>
                <CountDisplay text={props.rightScore} player={'right'} move={!move} bot={props.bot}/>
            </View>
            <PlayField move={move} leftScore={props.leftScore} rightScore={props.rightScore} bot={props.bot}
                       setMove={setMove} changeScore={props.changeScore}/>
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
