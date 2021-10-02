import React from "react";
import { AsyncStorage } from "react-native";

export class GameData {

    static result = []
    static checkResponse
    static id = 0
    static gameData = {}

    static getLastGame(){
        // console.log(this.result.length+"Возвращаю: " + JSON.stringify(this.result[this.result.length - 1]))
        if(this.result.length) {
            return this.result[this.result.length - 1]
        }
        else
            return null
    }

    static async saveGameData(gData) {
        try {
            this.gameData = gData
            await AsyncStorage.setItem(`SaveGameState_${this.id++}`,JSON.stringify(this.gameData))

            console.log('Успешно gdata' + this.id+'\n    ' + JSON.stringify(this.gameData))
            // await this.loadGameData()
        } catch (error) {
            console.log('НЕ Успешно сохарнил\n' + error)
        }
    }
    static async loadGameData() {
        try {
            let id = 0
            this.result = []
            console.log('       НАЧАЛО ЦИКЛА ')
            while ((this.checkResponse =  await AsyncStorage.getItem(`SaveGameState_${id}`)) !== null) {
                this.result.push(JSON.parse(this.checkResponse));
                console.log(id +'  ' + JSON.stringify((this.result[id])))
                id++
            }
            // for(let i=0;i<10;i++) console.log(id +'  ' + await AsyncStorage.getItem(`SaveGameState_${id++}`))

            this.id = id
            console.log('       КОНЕЦ ЦИКЛА('  + this.result.length)
            return this.result
        } catch (error) {
            console.log('(((error load)))');
            return this.result
        }
    }

    static async clearGameData(){
        try {
            await AsyncStorage.clear()
            console.log('Очищены игры')
        } catch (error) {
            console.log('(((error clear)))');
        }
    }
}