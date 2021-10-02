import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";

import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png"
import nothing from "../../../assets/nothing.png"

export const HistoryPlayItem = ({ item }) => {
    return (
        <TouchableOpacity key={item.id} style={styles.mainItemBody}
                          onPress={() => {}}>
            <View style={styles.endTypeGameBlock}>
                <Image style={styles.image} source={item.winner ? krest : item.winner===false ? circle : nothing}/>
            </View>
            <View style={styles.textInfoBlock}>
                <Text style={styles.text}>{item.bot ? 'Single Player' : 'Game for Two'}</Text>
                <Text style={styles.text}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainItemBody: {
        height: 80,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#c4c4c4',
        borderRadius: 15,
        marginTop: 15
    },
    endTypeGameBlock: {
        height: '100%',
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#5C821A'
    },
    image:{
        width: 70,
        height: 70,
        shadowOpacity: 0,
        margin: 10,
        // backgroundColor: '#000000'
    },
    textInfoBlock: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 23,
    }
})