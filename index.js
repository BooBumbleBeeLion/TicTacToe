import React, { Component } from "react";
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './src/store'
import {GameData} from "./src/GameData";

class index extends Component {

    constructor(){
        super()
        GameData.loadGoFinishGame()
        // GameData.saveGoFinishGame('string')
        // GameData.clearGameData()
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
