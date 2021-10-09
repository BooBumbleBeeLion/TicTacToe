import React, { Component } from "react";
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './src/store'

class index extends Component {

    constructor(){
        super()
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
