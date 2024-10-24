import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovementRegistration = ({ navigation }) => {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [originBranch, setOriginBranch] = useState('');
  const [destinationBranch, setDestinationBranch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [observations, setObservations] = useState('');
  const [productStock, setProductStock] = useState(0);

  // Fetch branches and products on screen load
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const branchesResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/branches/options');
        const productsResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/products/options');
        setBranches(branchesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching branches or products:', error);
      }
    };
    fetchOptions();
  }, []);

  // Update product stock when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct);
      setProductStock(product ? product.stock : 0);
    }
  }, [selectedProduct]);

  // Validation and submit handler
  const handleRegister = async () => {
    if (originBranch === destinationBranch) {
      Alert.alert('Erro', 'As filiais de origem e destino devem ser diferentes.');
      return;
    }

    if (parseInt(quantity) > productStock) {
      Alert.alert('Erro', 'A quantidade desejada excede o estoque disponível.');
      return;
    }

    try {
      const payload = {
        originBranch,
        destinationBranch,
        productId: selectedProduct,
        quantity: parseInt(quantity),
        observations,
      };

      await axios.post(process.env.EXPO_PUBLIC_API_URL + '/movements', payload);
      Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso.');
      navigation.goBack(); // Volta para a lista de movimentações
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'estoque insuficiente') {
        Alert.alert('Erro', 'Estoque insuficiente para o produto selecionado.');
      } else {
        console.error('Error registering movement:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a movimentação.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Filial de Origem</Text>
      <Picker
        selectedValue={originBranch}
        onValueChange={itemValue => setOriginBranch(itemValue)}
        style={styles.picker}
      >
        {branches.map(branch => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Filial de Destino</Text>
      <Picker
        selectedValue={destinationBranch}
        onValueChange={itemValue => setDestinationBranch(itemValue)}
        style={styles.picker}
      >
        {branches.map(branch => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Produto</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={itemValue => setSelectedProduct(itemValue)}
        style={styles.picker}
      >
        {products.map(product => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Quantidade Disponível: {productStock}</Text>
      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        placeholder="Observações"
        multiline
        value={observations}
        onChangeText={setObservations}
        style={[styles.input, styles.textArea]}
      />

      <Button title="Cadastrar" onPress={handleRegister} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
  },
});

export default MovementRegistration;
