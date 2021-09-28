import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { PlayRow } from './PlayRow'

export const PlayField = (props) => {

    return (
        <View style={styles.gridView}>
            <PlayRow rowId={0} state={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
            <PlayRow rowId={1} state={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
            <PlayRow rowId={2} state={props.states} changeImage={props.changeImage} getImage={props.getImage}/>
        </View>
    );
}
const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        // backgroundColor: '#347298',
        alignItems: 'center',
        justifyContent: 'center',
    },
})