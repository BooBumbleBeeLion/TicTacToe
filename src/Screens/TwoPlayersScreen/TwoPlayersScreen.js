import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { CountDisplay } from '../../Screens/Widgets/CountDisplay'
import { PlayField } from "../../PlayField/PlayField"

export const TwoPlayersScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.playersView}>
                {/* Короче text-выводимый текст; player- с какой он стороны; move-чей щас ход; person-какую картинку ставить*/}
                <CountDisplay text={999} player={'left'} move={false} person={'human'}/>
                <CountDisplay text={666} player={'right'} move={true} person={'human'}/>
            </View>
            <PlayField style={styles.playField}/>
            <TouchableOpacity style={styles.btnChild} onPress={() => props.changeState(0)}>
                <Text style={styles.btnText}> Назад </Text>
            </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    playField: {
        bottom: 50
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