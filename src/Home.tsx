import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Header from '../components/Header'; 

export default function Home({ navigation }) {
    const [userName, setUserName] = useState('');

    // Busca o nome do usuário no AsyncStorage
    useEffect(() => {
        async function fetchUserName() {
            const storedName = await AsyncStorage.getItem('userName');
            if (storedName) {
                setUserName(storedName);
            }
        }
        fetchUserName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header com foto e nome do usuário */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Substituir por imagem real
                    style={styles.userImage}
                />
                <Text style={styles.greeting}>Olá, {userName}</Text>
            </View>
            <Header imageUrl='https://via.placeholder.com/50' />

            {/* Cards de Estoque e Usuários */}
            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <MaterialCommunityIcons
                        name = 'bank'
                        size = {55}
                        color = '#1565C0'
                    />

                    
                    <Text style={styles.cardTitle}>Estoque</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Stock')}>
                        <Text style={styles.buttonText}>Ir para Estoque</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <MaterialCommunityIcons
                        name='account-plus-outline'
                        size={55}
                        color='#1565C0'
                    />
                    <Text style={styles.cardTitle}>Usuários</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('UserRegistration')}>
                        <Text style={styles.buttonText}>Cadastrar Usuários</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1565C0',
        marginTop: 10,
        marginBottom: 15,
    },
    cardButton: {
        backgroundColor: '#1565C0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
