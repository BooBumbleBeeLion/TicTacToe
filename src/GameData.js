import React from "react";
import {Alert, AsyncStorage, ToastAndroid } from "react-native";
/**
 * Класс для работы с AsyncStorage
 * @description
 * Имеет статические поля и методы для работы с стором*/
export class GameData {
    static goFinish
    static games = []
    static checkResponse
    static id = 0
    static gameData = {}

    static isAuth = true
    static userName = ""
    static userPassword = ""
    static userToken = ""
    static userGames = []

    static serverMessage = ""

    /**
     * Метод для передачи конкретной партии
     * @param {number} id-номер партии
     * @return {object} Конкретная партия*/
    static getGame(id){
        return this.games[id];
    }
    /**
     * Метод для передачи последней сыгранной партии
     * @return {object} Последняя партия
     * @description При отстутствии игр возвращает null*/
    static getLastGame(){
        if(this.games.length)
            return this.games[this.games.length - 1]
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
     * @param {string} userPassword - Пароль пользователя */
    static async saveUser(userName,userPassword){
        try{
            await GameData.clearGameData();
            await AsyncStorage.setItem(`UserName`,userName)
            await AsyncStorage.setItem(`UserPassword`,userPassword)
            await AsyncStorage.setItem(`isAuth`,"true")
            this.userName = userName
            this.userPassword = userPassword
            this.isAuth = true
            await this.loadUser(this.userName,this.userPassword)
        } catch(error){
            await this.logoutUser()
            ToastAndroid.show("Не удалось сохранить данные о пользователе", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для загрузки данных о пользователе из памяти. */
    static async loadUser(){
        try{
            let serverMessage = ""
            if((await AsyncStorage.getItem("isAuth")) === "true") {
                this.userName = await AsyncStorage.getItem("UserName")
                this.userPassword = await AsyncStorage.getItem("UserPassword")

                let request = 'http://mrjaxi-tictactoe.ml/login?' +
                    'userLogin=' + this.userName +
                    '&userPassword=' + this.userPassword
                await fetch(request)
                    .then(response => response.json())
                    .then(json => serverMessage = json)

                if (serverMessage.hasOwnProperty("error")) {
                    await this.logoutUser()
                    ToastAndroid.show(serverMessage["error"], ToastAndroid.LONG)
                }
                else if(!serverMessage.hasOwnProperty("response")) {
                    await this.logoutUser()
                    ToastAndroid.show("Не удалось сохранить войти в аккаунт", ToastAndroid.LONG)
                }
                else {
                    this.userToken = serverMessage.response.token
                    await AsyncStorage.setItem(`UserToken`, this.userToken)
                    console.log(this.userToken);
                }
            } else
                this.isAuth = false
        } catch(error){
            await this.logoutUser()
            ToastAndroid.show("Не удалось загрузить данные о пользователе", ToastAndroid.LONG)
        }
    }
    /**
     * Асинхронный метод для выхода из текущей учетной записи. */
    static async logoutUser(){
        try{
            await GameData.clearGameData();
            this.userName = ""
            this.userPassword = ""
            this.userToken = ""
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
            if(this.isAuth){
                let serverMessage = ""
                let request = 'http://mrjaxi-tictactoe.ml/gameMethod.saveGameData?' +
                    'bot=' + gData.bot +
                    '&winner=' + gData.winner +
                    '&leftState=' + gData.leftState +
                    '&rightState=' + gData.rightState +
                    '&imagesID=' + gData.imagesId +
                    '&date=' + gData.date +
                    '&token=' + this.userToken
                await fetch(request)
                    .then(response => response.json())
                    .then(json => serverMessage = json)

                if (serverMessage.hasOwnProperty("error"))
                    ToastAndroid.show(serverMessage["error"], ToastAndroid.LONG);
                else if(!serverMessage.hasOwnProperty("response"))
                    ToastAndroid.show("Не удалось сохранить игру в облако", ToastAndroid.LONG);
            }
            else {
                this.gameData = gData
                this.gameData.id = this.id
                await AsyncStorage.setItem(`SaveGameState_${this.id++}`, JSON.stringify(this.gameData))
                console.log(JSON.stringify(this.gameData))
            }

        } catch (e) {
            ToastAndroid.show('Ошибка: ' + e.name, ToastAndroid.LONG);
        }
    }
    /**
     * Асинхронный метод для загрузки всех сохраненных партий
     * @description Помещает все партии в массив games, также калибрует id */
    static async loadGameData() {
        try {
            let id = 0
            this.games = []
            while ((this.checkResponse =  await AsyncStorage.getItem(`SaveGameState_${id}`)) !== null) {
                this.games.push(JSON.parse(this.checkResponse));
                id++
            }

            this.id = id
        } catch (error) {
            ToastAndroid.show("Не удалось загрузить результаты игр", ToastAndroid.LONG)
        }
    }
    /**
     * Метод для загрузки всех сохраненных партий
     * @description Загружает и помещает все партии пользователя в массив userGames */
    static async loadUserGames() {
        try {
            let serverMessage = ""
            let request = 'http://mrjaxi-tictactoe.ml/gameMethod.getGamesByToken?' +
                'token=' + this.userToken
            await fetch(request)
                .then(response => response.json())
                .then(json => serverMessage = json)

            if (serverMessage.hasOwnProperty("error"))
                ToastAndroid.show(serverMessage["error"], ToastAndroid.LONG);
            else if(!serverMessage.hasOwnProperty("response"))
                ToastAndroid.show("Не удалось загрузить игры из облака", ToastAndroid.LONG);
            else {
                let games = serverMessage["response"]["response"]
                let game = games[0]
                console.log(serverMessage)
                console.log(game?.imagesId) // TODO: Доделать парсинг игр по токену(проблема с imagesId в api)
            }

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
        try {
            this.checkResponse =  await AsyncStorage.getItem(`GoFinish`)

            this.goFinish = this.checkResponse === 'string'   ? this.checkResponse
                                                            : JSON.parse(this.checkResponse)

            console.log("LOADGOFINISH: " + this.goFinish)
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