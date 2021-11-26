import React from "react";
import { AsyncStorage } from "react-native";
import {useDispatch} from "react-redux";
import {setAuth} from "./store/reducers/ScreenSlice";
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
    static userToken = ""

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
            await AsyncStorage.setItem(`UserName`,userName)
            await AsyncStorage.setItem(`UserToken`,userToken)
            await AsyncStorage.setItem(`isAuth`,"true")
            this.userName = userName
            this.userToken = userToken
        } catch(error){
            alert("Не удалось сохранить данные о пользователе")
        }
    }
    static async loadUser(){
        console.log("loadUser")
        try{
            if((await AsyncStorage.getItem("isAuth")) === "true") {
                this.userName = await AsyncStorage.getItem("UserName")
                this.userToken = await AsyncStorage.getItem("UserToken")
            } else
                this.isAuth = false
        } catch(error){
            alert("Не удалось загрузить данные о пользователе")
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
            alert("Не удалось сохранить игру")
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