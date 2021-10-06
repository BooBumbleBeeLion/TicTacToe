import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { GameScreen } from './src/Screens/GameScreen/GameScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import { LastGameScreen } from "./src/Screens/LastGameScreen/LastGameScreen";

/**
 * Базовый класс, регулирует отрисовку нужных экранов */
export default class App extends Component {
    /**
     * Инциализируем state в конструкторе */
    constructor(props) {
        super(props);
        this.state = {
            screenId: 0,
            botLeftScore: 0,
            botRightScore: 0,
            playersLeftScore: 0,
            playersRightScore: 0
        }
    }

    render() {
        return (
            <View style={styles.background}>
                { this.asScreen(this.state.screenId) }
            </View>
        );
    }
    /**
     * Изменяет в State счет указанного игрока
     * @param {string} prop-чей счет увеличить */
    changeScore = (prop) => {
        switch (prop) {
            case 'botLeftScore':
                this.setState({
                    botLeftScore: this.state.botLeftScore+1
                })
                break;
            case 'botRightScore' :
                this.setState({
                    botRightScore: this.state.botRightScore+1
                })
                break;
            case 'playersLeftScore':
                this.setState({
                    playersLeftScore: this.state.playersLeftScore+1
                })
                break;
            case 'playersRightScore':
                this.setState({
                    playersRightScore: this.state.playersRightScore+1
                })
                break;
        }
    }
    /**
     * Изменяет в State screenId выбранного экрана
     * @param {number} id - задаваемый id экранa */
    changeScreen = (id) => {
        this.setState({
            screenId: id,
        })
    }
    /**
     * Возвращает выбранный экран
     * @param {number} screenId - ID нужного нам экрана
     * @return {Component} Компонент выбранного экрана */
    asScreen = (screenId) => {
        switch (screenId){
            case 1:
                return (<LastGameScreen changeScreen={this.changeScreen} />)
            case 2:
                return (<GameScreen changeScreen={this.changeScreen} changeScore={this.changeScore} bot={true}
                                    leftScore={this.state.botLeftScore} rightScore={this.state.botRightScore}/>)
            case 3:
                return (<GameScreen changeScreen={this.changeScreen} changeScore={this.changeScore} bot={false}
                                    leftScore={this.state.playersLeftScore} rightScore={this.state.playersRightScore}/>)
            case 4:
                return (<TableScreen changeScreen={this.changeScreen} />)
            default:
                return (<MainScreen changeScreen={this.changeScreen} />)
        }
    }
}
const styles = StyleSheet.create({
    background : {
        flex : 1,
        backgroundColor: '#363237'
    },
})
