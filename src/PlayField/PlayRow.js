import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { PlayBtn } from './PlayBtn'

export const PlayRow = (props) => {

    return (
        <View style={styles.rowView}>
            <PlayBtn btnId={0+(props.rowId * 3)} states={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
            <PlayBtn btnId={1+(props.rowId * 3)} states={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
            <PlayBtn btnId={2+(props.rowId * 3)} states={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
        </View>
    );
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
    },
})