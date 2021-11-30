import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { setAuth, setScreen } from "../../store/reducers/ScreenSlice";
import { useDispatch } from "react-redux";
import { GameData } from "../../GameData";
import login from "../../../assets/login.png";
/**
 * Компонент отрисовки кнопки возвращения в главное меню */
export const AuthBtnTop = (props) => {

    const dispatch  = useDispatch();
    function onPress(){
        if(props.title === "Войти"){
            dispatch(setScreen(props.id))
        } else {
            GameData.logoutUser().then()
            dispatch(setAuth(false))
        }
    }

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.btnBack}
                              onPress={() => onPress() }>
                <Image style={styles.image} source={login}/>
                <Text style={styles.text}> {props.title} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: 45,
    },
    btnBack: {
        marginLeft: 10,
        height: 45,
        width: 110,
        flexDirection: 'row',
        backgroundColor: '#D4DDE1',
        borderRadius: 20,
    },
    image: {
        marginTop: 5,
        marginLeft: 5,
        height: 35,
        width: 35,
    },
    text: {
        width: "50%",
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000',
        fontSize: 20,
        marginLeft: 10,
    },
})
