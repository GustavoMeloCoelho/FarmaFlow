import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, FlatList, Switch, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


interface User {
    id: number;
    name: string;
    profile: string;
    status: boolean;
}

const UserList = ({ navigation }) => {
    const [users, setUsers] = useState<User[]>([]);
    

    useFocusEffect(
        useCallback(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/users');
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }, []) 
    );

    const toggleStatus = async (id: number) => {
        
        
        try {
            const url = `${process.env.EXPO_PUBLIC_API_URL}/users/${id}/toggle-status`;
            await axios.patch(url);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, status: !user.status } : user
                )
            );
            
        } catch (error) {
            console.error('Error toggling user status:', error);
            
        }
    };

    const renderItem = ({ item }: { item: User }) => (
        <View
            style={[
                styles.card,
                item.status ? styles.activeCard : styles.inactiveCard,
            ]}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.profile}>{item.profile}</Text>
            <Switch
                value={item.status}
                onValueChange={() => toggleStatus(item.id)}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('UserRegistration')}
            >
                <Text style={styles.addButtonText}>Cadastrar Novo Usuário</Text>
            </TouchableOpacity>
            <FlatList
                data={users}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        backgroundColor: '#1565C0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 10,
        borderWidth: 2,
    },
    activeCard: {
        borderColor: '#2E7D32',
    },
    inactiveCard: {
        backgroundColor: '#FFCDD2',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default UserList;
