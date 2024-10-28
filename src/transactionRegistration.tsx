import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface Branch {
  id: number;
  name: string;
}

interface Product {
  product_name: string;
  quantity: number;
}

interface BranchSelection {
  id: number | null;
  name: string | null;
}

const MovementRegistration = ({ navigation }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [originBranch, setOriginBranch] = useState<string | null>(null);
  const [destinationBranch, setDestinationBranch] = useState<BranchSelection[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState('');
  const [observations, setObservations] = useState('');
  const [productStock, setProductStock] = useState(0);

  // Fetch branches and products on screen load
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const branchesResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/branches/options');
        const productsResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/products');
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
    const product = products.find(p => String(p.product_name) === String(selectedProduct));
    setProductStock(product ? product.quantity : 0);
  }
}, [selectedProduct, products]); 

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

      
      const selectedProductData = products.find(p => p.product_name === String(selectedProduct));

      if (!selectedProductData) {
        Alert.alert('Erro', 'Produto selecionado não encontrado.');
        return;
      }

      const payload = {
        originBranch, // Agora o nome da filial de origem
        destinationBranch, // Agora o nome da filial de destino
        productName: selectedProduct,
        quantity: parseInt(quantity),
        observations,
      };

      console.log('Payload being sent:', payload); 
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
          <Picker.Item key={branch.id.toString()} label={branch.name} value={branch.name} />
        ))}
      </Picker>

      <Text style={styles.label}>Filial de Destino</Text>
      <Picker
        selectedValue={destinationBranch}
        onValueChange={itemValue => setDestinationBranch(itemValue)}
        style={styles.picker}
      >
        {branches.map(branch => (
          <Picker.Item key={branch.id.toString()} label={branch.name} value={branch.name} /> // Usa o nome como valor
        ))}
      </Picker>

      <Text style={styles.label}>Produto</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={itemValue => setSelectedProduct(itemValue)}
        style={styles.picker}
      >
        {products.map((product, index) => (
          <Picker.Item key={index} label={product.product_name} value={product.product_name} />
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
