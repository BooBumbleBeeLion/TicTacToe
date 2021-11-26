import React from "react"
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native"
import { BackBtnTop } from "../Widgets/BackBtnTop"
import icon from '../../../assets/icon.png';
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/reducers/ScreenSlice";


export const LoginScreen = () => {
    const dispatch  = useDispatch();

    /**  Когда аутентифицируешь пользователя пропиши это
     * или false когда выход пользователя
     * dispatch(setAuth(true)) */
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <BackBtnTop/>
            <View style={ styles.navBar }>
                <Image style={ styles.navImage } source={icon}/>
                <View style={ styles.textInputsContainer }>
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="E-MAIL"
                    />
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="PASSWORD"
                    />
                    <TouchableOpacity 
                        style={{ 
                        ...styles.textInput,
                        backgroundColor: '#FFD04A',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 25
                        }}
                    >
                        <Text style={{
                            fontSize: 22,
                        }}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
navBar: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
},
navImage: {
    height: 256,
    width: 256,
},
mainBtns:{
    marginTop: '10%',
    flexDirection: 'column',
},
btnContainer: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
},
textInputsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
},
textInput: {
    height: 50,
    width: 270,
    borderColor: '#888888',
    textAlign: 'center',
    backgroundColor: '#D4DDE1',
    borderRadius: 15,
    margin: 10
}
})
