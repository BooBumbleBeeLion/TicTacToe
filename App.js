import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import { SinglePlayerScreen } from './src/Screens/SinglePlayerScreen/SinglePlayerScreen';
import { TwoPlayersScreen } from './src/Screens/TwoPlayersScreen/TwoPlayersScreen';

//Images
import krest from './res/krest.png';
import circle from './res/circle.png';

export default class App extends Component {
    // Конструктор для объявления state для дальнейшего его изменения.
    constructor(props) {
        // Дефолтный вызов конструктора суперкласса Component.
        super(props);

        this.state = {
            screen: 0,
            move: true,
            images : [], // Изначально картинок на поле нет.
            imagesId : [],// Айди картинок на поле.(по дефолту разные чтобы не засчитывалась победа при undefined три в ряд).
            pressed : [], // Состояние нажатости ранее кнопки.
            countPressed : 0, // Число нажатых на поле кнопок.
            leftScore: 0,
            rightScore: 0
        }
    }
    restartGame = () =>{
        this.setState ({
            move: true,
            images : [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            imagesId : [0,-1,-2,-3,-4,-5,-6,-7,-8],
            pressed : [true,true,true,true,true,true,true,true,true],
            countPressed : 0,
        })
    }

    getImage = (id) => {
        return this.state.images[id]
    }

    winGame = () => {
        // Проверка всех вариантов победы (8 вариантов: 3 по горизонтали, 3 по вертикали, 2 по диагонали)
        if ((this.state.imagesId[0] === this.state.imagesId[1] && this.state.imagesId[0] === this.state.imagesId[2]) ||
            (this.state.imagesId[3] === this.state.imagesId[4] && this.state.imagesId[3] === this.state.imagesId[5]) ||
            (this.state.imagesId[6] === this.state.imagesId[7] && this.state.imagesId[6] === this.state.imagesId[8]) ||
            (this.state.imagesId[0] === this.state.imagesId[3] && this.state.imagesId[0] === this.state.imagesId[6]) ||
            (this.state.imagesId[1] === this.state.imagesId[4] && this.state.imagesId[1] === this.state.imagesId[7]) ||
            (this.state.imagesId[2] === this.state.imagesId[5] && this.state.imagesId[2] === this.state.imagesId[8]) ||
            (this.state.imagesId[0] === this.state.imagesId[4] && this.state.imagesId[0] === this.state.imagesId[8]) ||
            (this.state.imagesId[2] === this.state.imagesId[4] && this.state.imagesId[2] === this.state.imagesId[6])) {
            // Вызов Алерта на смартфоне
            Alert.alert(
                "Конец игры!",
                "Победили " + (this.state.move ? 'КРЕСТИКИ' : 'НОЛИКИ'),
                [
                    {text: "Заново", onPress: () => this.restartGame()}
                ]
            )
            this.state.move ? this.state.leftScore+=1 : this.state.rightScore+=1
        } else if (this.state.countPressed === 9) {
            Alert.alert(
                "Ничья!",
                "Победила ДРУЖБА",
                [
                    {text: "Заново", onPress: () => this.restartGame()}
                ]
            )
        }

    }

    changeImage = (id) => {
        // Если ход крестиков.
        if (this.state.move === true) {
            // Если ранее не нажата.
            if(this.state.pressed[id]) {
                this.setState({
                    move : false,
                    //countPressed : +1
                })
                this.state.images[id] = krest
                this.state.imagesId[id] = 1
                this.state.pressed[id] = false
                this.state.countPressed += 1
            }
        }
        // Если ход ноликов.
        else{
            if(this.state.pressed[id]) {
                this.setState({
                    move : true,
                    // countPressed: +1
                })
                this.state.images[id] = circle
                this.state.imagesId[id] = 2
                this.state.pressed[id] = false
                this.state.countPressed += 1
            }
        }
        // Проверка состояния выигрыша.
        this.winGame()
    }

    changeScreen = (prop) => {
        this.setState({
            screen: prop,
            leftScore: 0,
            rightScore: 0,
        })
        this.restartGame()
    }

    asScreen = (prop) => {
        switch (prop){
            case 1:
                return (<SinglePlayerScreen changeScreen={this.changeScreen} changeImage={this.changeImage} states={this.state} getImage={this.getImage}
                                            leftScore={this.state.leftScore} rightScore={this.state.rightScore}/>)
            case 2:
                return (<TwoPlayersScreen changeScreen={this.changeScreen} changeImage={this.changeImage} states={this.state} getImage={this.getImage}
                                          leftScore={this.state.leftScore} rightScore={this.state.rightScore}/>)
            case 3:
                return (<TableScreen changeScreen={this.changeScreen} />)
            default:
                return (<MainScreen changeScreen={this.changeScreen}/>)
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
