import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { EXPO_PUBLIC_API_URL } from '@env';

export default function Login({navigation}) {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const name = await AsyncStorage.getItem('@user_name');
                if (name !== null) {
                    // Usuário já está logado, redirecione para a tela Home
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    );
                }
            } catch (e) {
                console.error("Erro ao verificar login", e);
                Alert.alert("Erro ao ver login");
            }
        };
    
        checkLoginStatus();
    }, []);


    function validateFields() {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    }

    function handleLogin() {

        if (!validateFields()) {
            return;
        }
        console.log("entrei na login")
        // navigation.navigate('Home');

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            email: email,
            password: password
            // email: 'admin@gmail.com',
            // password: '123456'
        })
        .then(async (response) => {
            console.log("cai no then")
            if(response.data.profile === "admin") { 
                Alert.alert("sou um admin");
                const { name, profile } = response.data;
                try {
                    await AsyncStorage.setItem('@user_name', name);
                    await AsyncStorage.setItem('@user_profile', profile);
                    console.log("Dados do usuário salvos no AsyncStorage");
                    Alert.alert("nome: "+name+"profile "+profile);
                } catch (e) {
                    console.error("Erro ao salvar dados do usuário", e);
                }

                // navigation.navigate('Home')
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Home' }],
                    })
                  );

            } 
            // else if(response.data.profile === 'filial') {
            //     // navegue tela movimentao
            // } else {
            //     // naegue tela movimentacao dos motorista
            // }
        })
        .catch(() => {
            console.log("caiu no catch")
            Alert.alert("Usuário ou senha incorreto")
        })
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
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    label="Senha"
                    mode="outlined"
                    secureTextEntry = {!showPassword}
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
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
        width: '30%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        height: 50,
       
    },
    errorText: {
        color: '#FF9800',
        marginTop: 10,
    },
  });

