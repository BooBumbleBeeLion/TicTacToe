import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';

//Images
import krest from '../../res/krest.png';
import circle from '../../res/circle.png';

export const PlayField = (props) => {

    return (
        <View style={styles.gridView}>
            <View style={styles.rowview}>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rowview}>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rowview}>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ticbutton}>
                    <Image style={styles.image}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    gridView: {
        //backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticbutton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    rowview: {
        flexDirection: 'row',
    },
    image:{
        width: '90%',
        height: '90%',
        shadowOpacity: 0,
        marginTop: 5,
        marginLeft: 5,
    },
    maingrid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    maingrid1: {
        flex:1,
        backgroundColor: '#ffffff'
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})