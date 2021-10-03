import React from "react";
import { AsyncStorage } from "react-native";

export class GameData {

    static result = []
    static checkResponse
    static id = 0
    static gameData = {}

    static getGames(id){
        return this.result[id];
    }

    static getLastGame(){
        if(this.result.length)
            return this.result[this.result.length - 1]
        else
            return null
    }

    static async saveGameData(gData) {
        try {
            this.gameData = gData
            this.gameData.id = this.id
            await AsyncStorage.setItem(`SaveGameState_${this.id++}`,JSON.stringify(this.gameData))

        } catch (error) {
            alert("Не удалось сохранить игру")
        }
    }

    static async loadGameData() {
        try {
            let id = 0
            this.result = []
            while ((this.checkResponse =  await AsyncStorage.getItem(`SaveGameState_${id}`)) !== null) {
                this.result.push(JSON.parse(this.checkResponse));
                id++
            }

            this.id = id
        } catch (error) {
            alert("Не удалось загрузить результаты игр")
        }
    }

    static async clearGameData(){
        try {
            await AsyncStorage.clear()
            alert("Кэш игры очишен")
        } catch (error) {
            alert("Не удалось очистить кэш")
        }
    }
}