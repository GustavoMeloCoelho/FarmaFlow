import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function Login({navigation}) {

    const [showPassword, setShowPassword] = useState(false);

    // const [email, setEmail] = useState('')


    // useEffect(() => {
    //     // consulta o local storage
    //     if(name) {
    //         navigation.dispatch(
    //             CommonActions.reset({
    //               index: 0,
    //               routes: [{ name: 'Home' }],
    //             })
    //           ); 
    //     }
    // }, [])

    function handleLogin() {

        console.log("entrei na login")
        navigation.navigate('Home');

        // axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
        //     email: 'admin@gmail.com',
        //     password: '123456'
        // })
        // .then((response) => {
        //     console.log("cai no then")
        //     if(response.data.profile === "admin") {
        //         // navegue tela HOME

        //         navigation.navigate("Home")

        //         /*
        //         navigation.dispatch(
        //             CommonActions.reset({
        //               index: 0,
        //               routes: [{ name: 'Home' }],
        //             })
        //           );
        //           */

        //     } else if(response.data.profile === 'filial') {
        //         // navegue tela movimentao
        //     } else {
        //         // naegue tela movimentacao dos motorista
        //     }
        // })
        // .catch(() => {
        //     console.log("caiu no catch")
        //     // Alert.alert("")
        // })
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.title}>
                FarmaFlow
            </Text>

            <LottieView
                source={require('../assets/login-animation2.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <View style = {styles.inputContainer}>
                <TextInput
                    label="Email"
                    mode="outlined"
                    textColor='black'
                    style={styles.input}
                />

                <TextInput
                    label="Senha"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showPasswordText}>
                        {showPassword ? 'Ocultar Senha' : 'Exibir Senha'}
                    </Text>
                </TouchableOpacity>
            </View>
            
 
            <Button
                mode="contained"
                style={styles.button}
                buttonColor='#1565C0'
                textColor='#FFFFFF'
                onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Entrar</Text>
            </Button>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        // backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 38,
        textAlign: 'center',
        marginTop: 30,
        paddingBottom: 20
    },
    animation: {
        width: 230,
        height: 230,
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        // borderBlockColor: '#2E7D32',
        marginBottom: 5,
        width: '100%',
        alignSelf: 'center'
    },
    showPasswordText: {
        
        color: '#1A237E',
        // color: '#1565C0',
        // textAlign: 'right',
    },
    inputContainer: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 17
    },
    button: {
        borderRadius: 8,
        width: '60%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        height: 50
    },
    errorText: {
        color: '#FF9800',
        marginTop: 10,
    },
  });

