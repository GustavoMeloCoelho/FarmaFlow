import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
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
  };
  destino: {
    nome: string;
  };
}



const MovementDriverScreen = ({ navigation }) => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [userName, setUserName] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_name'); // Limpa o nome do usuário
    navigation.navigate('Login'); // Navega para a tela de login
  };
  
  useEffect(() => {

    AsyncStorage.getItem('@user_name')
    .then(name => {
      setUserName( name || '' )
      console.log('peguei o usuário')
    })
    .catch(err => console.log('Erro ' + err))

}, [])


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

      fetchMovements();
    }, [])
  );

  // Function to handle starting the delivery with photo capture
  const handleStartDelivery = async (movementId: number) => {
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

   

    if (!image.canceled) {
      const formData = new FormData();
      formData.append('motorista', userName);
      formData.append('file', {
        uri: image.assets[0].uri,
        name: 'file.jpg',
        type: image.assets[0].mimeType as string,
      } as any);

      try {
        await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/movements/${movementId}/start`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements');
        setMovements(response.data);
      } catch (error) {
        console.error('Erro ao iniciar entrega:', error);
      }
    }
  };

  
  const handleEndDelivery = async (movementId: number) => {
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled) {
      const formData = new FormData();
      formData.append('motorista', userName);
      formData.append('file', {
        uri: image.assets[0].uri,
        name: 'file.jpg',
        type: image.assets[0].mimeType as string,
      } as any);

      try {
        await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/movements/${movementId}/end`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // Re-fetch movements after finishing delivery
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements');
        setMovements(response.data);
      } catch (error) {
        console.error('Erro ao finalizar entrega:', error);
      }
    }
  };

  
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
        
        <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />
        <Text style={styles.cardText}>ID: {item.id}</Text>
        <Text style={styles.cardText}>Produto: {item.produto.nome}</Text>
        <Text style={styles.cardText}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.cardText}>Origem: {item.origem.nome}</Text>
        <Text style={styles.cardText}>Destino: {item.destino.nome}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
        
        {item.status === 'created' && (
          <>
            <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleStartDelivery(item.id)}
          >
            <Text style={styles.buttonText}>Iniciar Entrega</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.mapButton}
              onPress={() => navigation.navigate('MapScreen', { origin: item.origem, destination: item.destino })}
            >
              <Text style={styles.buttonText}>Ver Mapa</Text>
            </TouchableOpacity>
          </>
          
          
        )}

        {item.status === 'em transito' && (
          <>
            <TouchableOpacity
              style={styles.endButton}
              onPress={() => handleEndDelivery(item.id)}
            >
              <Text style={styles.buttonText}>Finalizar Entrega</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => navigation.navigate('MapScreen', { origin: item.origem, destination: item.destino })}
            >
              <Text style={styles.buttonText}>Ver Mapa</Text>
            </TouchableOpacity>
          </>
        )}

        
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Movimentações para Motorista</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      <FlatList
        data={movements}
        renderItem={renderMovement}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginBottom: 16,
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
  awaitingCollection: {
    backgroundColor: '#D3D3D3', 
  },
  inTransit: {
    backgroundColor: '#FFAB91', 
  },
  collectionCompleted: {
    backgroundColor: '#81C784', 
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
    marginBottom: 4,
  },
  startButton: {
    backgroundColor: '#1565C0',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#E5533D',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  mapButton: {
    backgroundColor: '#42A5F5',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#B0BEC5', // Cor do botão de logout
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10, // Margem para separação
},
});

export default MovementDriverScreen;
