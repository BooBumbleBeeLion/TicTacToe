import React from "react";
import { AsyncStorage } from "react-native";
/**
 * Класс для работы с AsyncStorage
 * @description
 * Имеет статические поля и методы для работы с стором*/
export class GameData {

    static goFinish
    static result = []
    static checkResponse
    static id = 0
    static gameData = {}
    /**
     * Метод для передачи конкретной партии
     * @param {number} id-номер партии
     * @return {{}}*/
    static getGame(id){
        return this.result[id];
    }
    /**
     * Метод для передачи последней сыгранной партии
     * @return {{gameData}}
     * @description При отстутствии игр возвращает null*/
    static getLastGame(){
        if(this.result.length)
            return this.result[this.result.length - 1]
        else
            return null
    }
    static getGoFinishGame(){
        return this.goFinish
    }
    /**
     * Асинхронный метод для сохранения результатов партии
     * @param {{}} gData - сформированный литерал объект с данными партии*/
    static async saveGameData(gData) {
        try {
            this.gameData = gData
            this.gameData.id = this.id
            await AsyncStorage.setItem(`SaveGameState_${this.id++}`,JSON.stringify(this.gameData))
            console.log(JSON.stringify(this.gameData))

        } catch (error) {
            alert("Не удалось сохранить игру")
        }
    }
    /**
     * Асинхронный метод для загрузки всех сохраненных партий
     * @description Помещает все партии в массив result, также калибрует id */
    static async loadGameData() {
        console.log("loadGameData")
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

    static async saveGoFinishGame(gData){
        try {
            console.log("saveGoFinishGame")
            if(typeof gData === 'string')
                await AsyncStorage.setItem(`GoFinish`, 'string')
            else
                await AsyncStorage.setItem(`GoFinish`, JSON.stringify(gData))


        } catch (error) {
            alert("Не удалось сохранить игру")
        }
    }
    static async loadGoFinishGame(){
        console.log("LOADGOFINISH")
        try {
            this.checkResponse =  await AsyncStorage.getItem(`GoFinish`)

            this.goFinish = this.checkResponse === 'string'   ? this.checkResponse
                                                            : JSON.parse(this.checkResponse)

            console.log("LOAD: " + this.goFinish)
        } catch (error) {
            alert("Не удалось загрузить данные последней игры")
        }
    }
    /**
     * Метод для палной очистки кэша AsyncStorage */
    static async clearGameData(){
        try {
            await AsyncStorage.clear()
            alert("Кэш игры очишен")
        } catch (error) {
            alert("Не удалось очистить кэш" + error.message)
        }
    }
}