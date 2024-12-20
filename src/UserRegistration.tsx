import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';


export default function UserRegistration() {
    const [profile, setProfile] = useState('motorista');
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [full_address, setFullAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {



        //validações básicas
        if (!name || !document || !full_address || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        //construção do JSON
        const userData = {
            profile, // motorista ou filial
            name,
            document,
            full_address,
            email,
            password,
        };

        try {
            // Enviar requisição POST
            await axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', userData);
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
            setName('');
            setDocument('');
            setFullAddress('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.');
            console.error(error);
        }
    };



    return (
        <View style={styles.container}>

            {/* Título */}
            <Text style={styles.titleText}>Cadastro de Usuários</Text>

            {/* Botões para selecionar Motorista ou Filial */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, profile === 'motorista' ? styles.selected : styles.unselected]}
                    onPress={() => setProfile('motorista')}
                >
                    <Text style={styles.toggleText}>Motorista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, profile === 'filial' ? styles.selected : styles.unselected]}
                    onPress={() => setProfile('filial')}
                >
                    <Text style={styles.toggleText}>Filial</Text>
                </TouchableOpacity>
            </View>


            {/* Formulário de cadastro */}
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Nome completo"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder={profile === 'motorista' ? 'CPF' : 'CNPJ'}
                value={document}
                onChangeText={setDocument}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Endereço completo"
                value={full_address}
                onChangeText={setFullAddress}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
            />


            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showPasswordText}>
                    {showPassword ? 'Ocultar Senha' : 'Exibir Senha'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                <Text style={styles.buttonText}>Adicionar Novo Usuário</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#E3F2FD',
    },
    titleText: {
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1565C0',
        marginVertical: 50,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    toggleButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        borderColor: '#ccc'
    },
    selected: {
        backgroundColor: '#A5D6A7',
    },
    unselected: {
        backgroundColor: '#F5F5F5',

    },
    toggleText: {
        color: 'black',
    },
    input: {
        height: 45,
        padding: 5,
        marginBottom: 20,
    },
    showPasswordText: {

        color: '#1A237E',
        // color: '#1565C0',
        // textAlign: 'right',
    },
    button: {
        backgroundColor: '#1565C0',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
