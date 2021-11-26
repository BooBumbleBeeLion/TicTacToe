import React, { Component } from "react";
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './src/store'
import { GameData } from "./src/GameData";
/**
 * Корневой класс для инициализации магазина Redux */
class index extends Component {

    constructor(){
        super()
        GameData.loadUser()
        GameData.loadGoFinishGame()
        // GameData.clearGameData()
        // GameData.saveGoFinishGame('string')
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

registerRootComponent(index);
