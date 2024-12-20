import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
  imageUrl: string; // URL da minifoto
}

const Header: React.FC<HeaderProps> = ({ imageUrl }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar o nome do usuário no async storage
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@user_name');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.log('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.greetingText}>
        Olá, {userName ? userName : 'Usuário'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#E3F2FD',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default Header;
