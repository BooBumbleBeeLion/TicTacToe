import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler, ToastAndroid
} from "react-native";
import { BackBtnTop } from "../Widgets/BackBtnTop"
import icon from '../../../assets/icon.png';
import {useDispatch} from "react-redux";
import {setAuth, setScreen} from "../../store/reducers/ScreenSlice";
import {GameData} from "../../GameData";


export const RegisterScreen = (props) => {
    const dispatch  = useDispatch();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [responseText, setResponseText] = useState(Object);

    function serverRequest () {
        let request = "http://mrjaxi-tictactoe.ml/register?userLogin=" + login + "&userPassword=" + password
        fetch(request)
            .then(response => response.json())
            .then(json => {
                let serverResponse = json
                console.log(serverResponse)
                if (serverResponse.hasOwnProperty('response')){
                    ToastAndroid.show("Вы успешно зарегистрировались!", ToastAndroid.LONG)
                    dispatch(setScreen(0))
                    dispatch(setAuth(true))
                    GameData.saveUser(
                        serverResponse['response']['userName'],
                        serverResponse['response']['userPassword'])
                } else if(serverResponse.hasOwnProperty('error')) {
                    setResponseText(serverResponse)
                }
            })
    }

    BackHandler.addEventListener("hardwareBackPress", () => {
        dispatch(setScreen(5))
        return true
    })

    return (
        <KeyboardAvoidingView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            behavior="padding">
            <View style={ styles.navBar }>
                <View>
                    <Image style={ styles.navImage } source={icon}/>
                </View>
                <View style={ styles.textInputsContainer }>
                    <Text style={{
                        width: '80%',
                        fontSize: 20,
                        color: '#F34A4A',
                        textAlign: "center",
                        marginBottom: '10%'
                    }}>
                        { responseText.hasOwnProperty('error') && responseText['error'] }
                    </Text>
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="E-MAIL"
                        onChangeText={text => setLogin(text)}
                    />
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="PASSWORD"
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity 
                        style={{ 
                           ...styles.textInput,
                           backgroundColor: '#FFD04A',
                           justifyContent: 'center',
                           alignItems: 'center',
                           marginTop: 25
                        }}
                        onPress={() => serverRequest()}>
                        <Text style={{
                            fontSize: 22,
                        }}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    navBar: {
        width: '100%',
        alignItems: 'center',
    },
    navImage: {
        height: 256,
        width: 256,
    },
    textInputsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
    textInput: {
        height: 50,
        width: 260,
        borderColor: '#888888',
        textAlign: 'center',
        backgroundColor: '#D4DDE1',
        borderRadius: 15,
        margin: 10
    }
})
