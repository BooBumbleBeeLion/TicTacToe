import React from "react";
import {Alert, AsyncStorage, ToastAndroid } from "react-native";
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

    static isAuth = true
    static userName = ""
    static userToken = "ihcXzehAjHOtdbx5blMsA8AD0p3hl6mXmhBEKXZttcI" //TODO: ПОСЛЕ ТЕСТОВ УБРАТЬ ТОКЕН
    static userGames = []

    static serverMessage = ""

    /**
     * Метод для передачи конкретной партии
     * @param {number} id-номер партии
     * @return {object} Конкретная партия*/
    static getGame(id){
        return this.result[id];
    }
    /**
     * Метод для передачи последней сыгранной партии
     * @return {object} Последняя партия
     * @description При отстутствии игр возвращает null*/
    static getLastGame(){
        if(this.result.length)
            return this.result[this.result.length - 1]
        else
            return null
    }
    /**
     * Возвращает последнее последнее состояние игры
     * @return {object} Последнее состояние игры */
    static getGoFinishGame(){
        return this.goFinish
    }
    /**
     * Асинхронный метод для задания информации о пользователе.
     * @param {string} userName - Имя пользователя
     * @param {string} userToken - Токен пользователя*/
    static async saveUser(userName, userToken){
        try{
            await GameData.clearGameData();
            await AsyncStorage.setItem(`UserName`,userName)
            await AsyncStorage.setItem(`UserToken`,userToken)
            await AsyncStorage.setItem(`isAuth`,"true")
            this.userName = userName
            this.userToken = userToken
            this.isAuth = true
        } catch(error){
            ToastAndroid.show("Не удалось сохранить данные о пользователе", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для загрузки данных о пользователе из памяти. */
    static async loadUser(){
        try{
            if((await AsyncStorage.getItem("isAuth")) === "true") {

                this.userName = await AsyncStorage.getItem("UserName")
                this.userToken = await AsyncStorage.getItem("UserToken")
            } else
                this.isAuth = true // TODO: ИЗМЕНИТЬ НА false для прода
        } catch(error){
            ToastAndroid.show("Не удалось загрузить данные о пользователе", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для выхода из текущей учетной записи. */
    static async logoutUser(){
        try{
            await GameData.clearGameData();
            this.userName = undefined
            this.userToken = undefined
            this.isAuth = false
        } catch(error){
            ToastAndroid.show("Не удалось выйти из учетной записи", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для сохранения результатов партии
     * @param {object} gData - сформированный литерал объект с данными партии*/
    static async saveGameData(gData) {
        try {
            this.gameData = gData
            this.gameData.id = this.id
            await AsyncStorage.setItem(`SaveGameState_${this.id++}`,JSON.stringify(this.gameData))
            console.log(JSON.stringify(this.gameData))

            if(this.isAuth){
                let request = 'http://mrjaxi-tictactoe.ml/gameMethod.saveGameData?' +
                    'bot=' + gData.bot +
                    '&winner=' + gData.winner +
                    '&leftState=' + gData.leftState +
                    '&rightState=' + gData.rightState +
                    '&imagesID=' + JSON.stringify(gData.imagesId) +
                    '&date=' + gData.date +
                    '&token=' + this.userToken
                await fetch(request)
                    .then(response => response.json())
                    .then(json => this.serverMessage = json)

                if (this.serverMessage.hasOwnProperty("error"))
                    ToastAndroid.show(this.serverMessage["error"], ToastAndroid.SHORT);
                if(!this.serverMessage.hasOwnProperty("response"))
                    ToastAndroid.show("Не удалось сохранить игру в облако", ToastAndroid.SHORT);
            }

        } catch (e) {
            ToastAndroid.show('Ошибка: ' + e.name, ToastAndroid.LONG);
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
            ToastAndroid.show("Не удалось загрузить результаты игр", ToastAndroid.LONG)
        }
    }
    /**
     * Метод для загрузки всех сохраненных партий
     * @param {string} userToken - Токен пользователя
     * @description Помещает все партии в массив result, также калибрует id */
    static async loadUserGames(userToken) {
        try {
            let request = 'http://mrjaxi-tictactoe.ml/gameMethod.getGamesByToken?' +
                'token=' + userToken
            await fetch(request)
                .then(response => response.json())
                .then(json => this.serverMessage = json)

            if (this.serverMessage.hasOwnProperty("error"))
                ToastAndroid.show(this.serverMessage["error"], ToastAndroid.SHORT);
            else if(this.serverMessage.hasOwnProperty("response")){
                console.log("USERGAMES::"+JSON.stringify(this.serverMessage["response"])) //TODO: ПОЛУчаю уже игры по токену, осталось сериализовать и распихать его в массив result
            } else
                ToastAndroid.show("Не удалось загрузить игры из облака", ToastAndroid.SHORT);

        } catch (error) {
            ToastAndroid.show("Не удалось загрузить игры пользователя", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для сохранение состояния игры в приложении
     * @param {object,string} gData - записываемое поле
     * @description Строкое значение обозначает дефолтное состояние игры*/
    static async saveGoFinishGame(gData){
        try {
            console.log("saveGoFinishGame")
            if(typeof gData === 'string')
                await AsyncStorage.setItem(`GoFinish`, 'string')
            else
                await AsyncStorage.setItem(`GoFinish`, JSON.stringify(gData))


        } catch (error) {
            ToastAndroid.show("Не удалось сохранить состояние игры", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для загрузки последнего состояния игры перед выходом
     * @description Помещает последнее состояние в переменную goFinish */
    static async loadGoFinishGame(){
        console.log("LOADGOFINISH")
        try {
            this.checkResponse =  await AsyncStorage.getItem(`GoFinish`)

            this.goFinish = this.checkResponse === 'string'   ? this.checkResponse
                                                            : JSON.parse(this.checkResponse)

            console.log("LOAD: " + this.goFinish)
        } catch (error) {
            ToastAndroid.show("Не удалось загрузить данные последней игры", ToastAndroid.LONG)
        }
    }
    /**
     * Метод для палной очистки кэша AsyncStorage */
    static async clearGameData(){
        try {
            await AsyncStorage.clear()
            ToastAndroid.show("Кэш игры очишен", ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show("Не удалось очистить кэш", ToastAndroid.LONG)
        }
    }
}