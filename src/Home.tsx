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
            const storedName = await AsyncStorage.getItem('@user_name');
            if (storedName) {
                setUserName(storedName);
            }
        }
        fetchUserName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
    

            <Header imageUrl='https://i.pinimg.com/originals/8d/fd/37/8dfd372102d3e4a8102c5c928ce32047.jpg' />



            {/* Cards de Estoque e Usuários */}
            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <MaterialCommunityIcons
                        name='bank'
                        size={55}
                        color='#1565C0'
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
                        name='account-outline'
                        size={55}
                        color='#1565C0'
                    />
                    <Text style={styles.cardTitle}>Usuários</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('UserList')}>
                        <Text style={styles.buttonText}>Ver e cadastrar Usuários</Text>
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
    cardsContainer: {
        flex: 1,
        // justifyContent: 'space-around',
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
        elevation: 9,
        marginBottom: 80,
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
