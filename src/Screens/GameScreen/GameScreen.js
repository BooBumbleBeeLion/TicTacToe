import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { PlayField } from '../../PlayField/PlayField'
import { CountDisplay } from "../Widgets/CountDisplay";
import { BackBtnTop } from "../Widgets/BackBtnTop";

export const GameScreen = (props) => {

    const [move,setMove] = useState(true)
    const [leftScore,setLeftScore] = useState(0)
    const [rightScore,setRightScore] = useState(0)

    return (
        <View style={styles.container}>
            <BackBtnTop changeScreen={props.changeScreen}/>
            <View style={styles.playersView}>
                {/* Короче text-выводимый текст; player- с какой он стороны; move-чей щас ход; person-какую картинку ставить*/}
                <CountDisplay text={leftScore} player={'left'} move={move} bot={false}/>
                <CountDisplay text={rightScore} player={'right'} move={!move} bot={props.bot}/>
            </View>
            <PlayField move={move} leftScore={leftScore} rightScore={rightScore} bot={props.bot} goPlay={true}
                       setMove={setMove} setLeftScore={setLeftScore} setRightScore={setRightScore}/>
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
