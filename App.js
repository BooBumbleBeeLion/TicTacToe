import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MainScreen } from './src/Screens/MainScreen/MainScreen';
import { GameScreen } from './src/Screens/GameScreen/GameScreen';
import { TableScreen } from './src/Screens/TableScreen/TableScreen';
import {LastGameScreen} from "./src/Screens/LastGameScreen/LastGameScreen";
import AppState from "react-native-web/src/exports/AppState";
import {MainButton} from "./src/Screens/MainScreen/MainButton";

export default class App extends Component {
    // Конструктор для объявления state для дальнейшего его изменения.
    constructor(props) {
        super(props);

        this.state = {
            screen: 0,
            appState : AppState.currentState
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
        alert(this.state.appState.toString());
    }


    render() {
        return (
            <View style={styles.background}>
                { this.asScreen(this.state.screen) }
            </View>
        );
    }

    asScreen = (prop) => {
        switch (prop){
            case 1:
                return (<LastGameScreen changeScreen={this.changeScreen}/>)
            case 2:
                return (<GameScreen changeScreen={this.changeScreen} bot={true}/>)
            case 3:
                return (<GameScreen changeScreen={this.changeScreen} bot={false}/>)
            case 4:
                return (<TableScreen changeScreen={this.changeScreen} />)
            default:
                return (<MainScreen changeScreen={this.changeScreen} app={this.state.appState}/>)
        }
    }

    changeScreen = (prop) => {
        this.setState({
            screen: prop,
        })
    }
}
const styles = StyleSheet.create({
    background : {
        flex : 1,
        backgroundColor: '#363237'
    },
})
