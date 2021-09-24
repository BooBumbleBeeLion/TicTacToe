import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MainScreen } from './src/MainScreen/MainScreen';
import { TableScreen } from './src/TableScreen/TableScreen';
import { SingleGameScreen } from './src/SingleGameScreen/SingleGameScreen';
import { PlayersGameScreen } from './src/PlayersGameScreen/PlayersGameScreen';


export default class App extends Component {
    // Конструктор для объявления state для дальнейшего его изменения.
    constructor() {
        // Дефолтный вызов конструктора суперкласса Component.
        super();

        this.state = {
            screen : 0,
        }
    }

    changeState = (prop) => {
        this.setState({
            screen: prop
        })
    }

    asScreen = (prop) => {
        switch (prop){
            case 1:
                return (<SingleGameScreen/>)
            case 2:
                return (<PlayersGameScreen/>)
            case 3:
                return (<TableScreen/>)
            default:
                return (<MainScreen changeState={this.changeState}/>)
        }
    }

    // Отрисовка компонентов.
    render() {
        return (
            <View style={styles.background}>
                { this.asScreen(this.state.screen) }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    background : {
        flex : 1,
        backgroundColor: '#363237'
    },
})
