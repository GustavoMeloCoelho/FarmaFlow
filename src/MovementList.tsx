import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movement {
  id: number;
  produto: {
    nome: string;
    imagem: string;
  };
  quantidade: number;
  status: string;
  origem: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  destino: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  dataCriacao: string;
}

const MovementList = ({ navigation }: any) => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_name'); // Limpa o nome do usuário
    navigation.navigate('Login'); // Navega para a tela de login
  };

  // Fetch movements on screen load
  useFocusEffect(
    React.useCallback(() => {
      const fetchMovements = async () => {
        try {
          const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements');
          setMovements(response.data);
        } catch (error) {
          console.error('Erro ao buscar movimentações:', error);
        }
      };

      fetchMovements(); // Buscar movimentações ao focar na tela

      // Limpeza opcional, caso precise remover efeitos ou assinaturas ao desfocar a tela
      return () => {
        // Limpeza ou código adicional ao desfocar, se necessário
      };
    }, [])
  );

  // Render each movement as a card
  const renderMovement = ({ item }: { item: Movement }) => {

    let cardStyle = styles.card;

    if (item.status === 'created') {
      cardStyle = { ...styles.card, ...styles.awaitingCollection };
    } else if (item.status === 'em transito') {
      cardStyle = { ...styles.card, ...styles.inTransit };
    } else if (item.status === 'Coleta finalizada') {
      cardStyle = { ...styles.card, ...styles.collectionCompleted };
    }
    return (
      <View style={cardStyle}>
        {/* Exibir a imagem do produto */}
        <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />
        <Text style={styles.cardText}>Produto: {item.produto.nome}</Text>
        <Text style={styles.cardText}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.cardText}>Origem: {item.origem.nome}</Text>
        <Text style={styles.cardText}>Destino: {item.destino.nome}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Movimentações cadastradas</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <FlatList
        data={movements}
        renderItem={renderMovement}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MovementRegistration')}>
        <Text style={styles.buttonText}>Adicionar Nova Movimentação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E3F2FD',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1565C0',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
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
  logoutButton: {
    backgroundColor: '#26A69A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  awaitingCollection: {
    backgroundColor: '#D3D3D3',
  },
  inTransit: {
    backgroundColor: '#FFAB91',
  },
  collectionCompleted: {
    backgroundColor: '#81C784',
  },
});

export default MovementList;
