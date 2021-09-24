import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import { SingleGameScreen } from './src/Screens/SingleGameScreen/SingleGameScreen';
import { PlayersGameScreen } from './src/Screens/PlayersGameScreen/PlayersGameScreen';


export default class App extends Component {
    // Конструктор для объявления state для дальнейшего его изменения.
    constructor() {
        // Дефолтный вызов конструктора суперкласса Component.
        super();

        this.state = {
            screen: '',
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
                return (<SingleGameScreen changeState={this.changeState}/>)
            case 2:
                return (<PlayersGameScreen changeState={this.changeState}/>)
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