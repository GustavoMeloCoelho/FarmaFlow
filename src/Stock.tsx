import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  image_url: string;
  product_name: string;
  branch_name: string; // Nome da filial
  quantity: number; // Quantidade disponível na filial
}

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  // Requisição GET para buscar produtos
  useEffect(() => {
    axios.get(process.env.EXPO_PUBLIC_API_URL + '/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        Alert.alert("Erro", "Não foi possível carregar os produtos.");
        console.error(error);
      });
  }, []);

  // Função para filtrar produtos com base no campo de pesquisa
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filteredData = products.filter(item =>
        item.product_name.toLowerCase().includes(text.toLowerCase()) || item.branch_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
  };

  // Renderização de cada card de produto
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.branch}>Filial: {item.branch_name}</Text>
        <Text style={styles.quantity}>Disponível: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Campo de pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar produto..."
        value={search}
        onChangeText={handleSearch}
      />
      
      {/* Lista de produtos */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E3F2FD',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  branch: {
    fontSize: 14,
    color: 'black',
  },
  quantity: {
    fontSize: 14,
    color: 'black',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
