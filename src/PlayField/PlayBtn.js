import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';

//Images
import krest from '../../res/krest.png';
import circle from '../../res/circle.png';

export const PlayBtn = (props) => {
    return (
        <TouchableOpacity style={styles.ticButton} onPress={() => props.changeImage(props.btnId)}>
            {/*<Text style={styles.text}>  </Text>*/}
            <Image style={styles.image} source={props.getImage(props.btnId)}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ticButton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    image:{
        width: '90%',
        height: '90%',
        shadowOpacity: 0,
        marginTop: 5,
        marginLeft: 5,
    },
    text: {
        textAlignVertical: 'center',
        color: '#000000',
        fontSize: 17,
    },
})