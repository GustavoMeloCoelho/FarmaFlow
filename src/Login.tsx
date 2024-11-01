import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Login({ navigation }: any) {
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const name = await AsyncStorage.getItem('@user_name');
                if (name !== null) {
                    // Redireciona com base no perfil do usuário
                    if (name === "admin") {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            })
                        );
                    } else if (name === 'filial') {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'MovementList' }],
                            })
                        );
                    } else if (name === 'motorista') {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'MovementListForDriver' }],
                            })
                        );
                    }
                }
            } catch (e) {
                console.error("Erro ao verificar login", e);
                Alert.alert("Erro ao verificar login");
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

    async function handleLogin() {
        if (!validateFields()) {
            return;
        }

        setLoading(true);

        // Adiciona um delay de 2 segundos antes de iniciar a requisição (simulando uma demora no login)
        setTimeout(() => {
            axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
                email: email,
                password: password
            })
            .then(async (response) => {
                const { name, profile } = response.data;
                try {
                    await AsyncStorage.setItem('@user_name', name);
                    await AsyncStorage.setItem('@user_profile', profile);
                } catch (e) {
                    console.error("Erro ao salvar dados do usuário", e);
                }

                setLoading(false);

                // Redireciona com base no perfil do usuário
                if (profile === "admin") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    );
                } else if (profile === 'filial') {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'MovementList' }],
                        })
                    );
                } else if (profile === 'motorista') {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'MovementListForDriver' }],
                        })
                    );
                }
            })
            .catch(() => {
                setLoading(false);
                Alert.alert("Usuário ou senha incorreto");
            });
        }, 2000); // Define o delay em 2 segundos
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>FarmaFlow</Text>
            <LottieView
                source={require('../assets/login-animation2.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    label="Email"
                    mode="outlined"
                    textColor="black"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    label="Senha"
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showPasswordText}>
                        {showPassword ? 'Ocultar Senha' : 'Exibir Senha'}
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#1565C0" />
            ) : (
                <Button
                    mode="contained"
                    style={styles.button}
                    buttonColor="#1565C0"
                    textColor="#FFFFFF"
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </Button>
            )}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
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
  });

