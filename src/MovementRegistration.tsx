import React, { useState, useEffect } from 'react';
import { Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';


interface Branch {
  id: number;
  name: string;
}

interface Product {
  product_id: number;
  product_name: string;
  quantity: number;
  branch_name: string;
}


const MovementRegistration = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [originBranch, setOriginBranch] = useState<number | null>(null);
  const [destinationBranch, setDestinationBranch] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState('');
  const [observations, setObservations] = useState('');
  const [productStock, setProductStock] = useState(0);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);


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


  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.product_id === Number(selectedProduct));
      setProductStock(product ? product.quantity : 0);
    }
  }, [selectedProduct, products]);

  //Filtra o picker de produto para conter apenas os produtos que tem naquela filial
  useEffect(() => {
    if (originBranch !== null) {
      const productsInBranch = products.filter(product =>
        branches.find(branch => branch.id === originBranch)?.name === product.branch_name
      );
      setFilteredProducts(productsInBranch);
      setSelectedProduct(null);
      setProductStock(0);
    }
  }, [originBranch, products, branches]);

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
        originBranchId: originBranch,
        destinationBranchId: destinationBranch,
        productId: selectedProduct,
        quantity: parseInt(quantity),
      };

      console.log('Payload being sent:', payload);
      await axios.post(process.env.EXPO_PUBLIC_API_URL + '/movements', payload);
      Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso.');
      // Atualiza o estoque disponível após cadastro de movimentação bem-sucedida
      setProductStock(prevStock => prevStock - parseInt(quantity));

    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 400 && error.response.data.message === 'estoque insuficiente') {
        Alert.alert('Erro', 'Estoque insuficiente para o produto selecionado.');
      } else {
        console.error('Error registering movement:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a movimentação.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Cadastro de movimentações</Text>
      <Text style={styles.label}>Filial de Origem</Text>
      <Picker
        selectedValue={originBranch}
        onValueChange={(itemValue) => setOriginBranch(itemValue as number)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma filial de origem" value={null} />
        {branches.map(branch => (
          <Picker.Item key={branch.id.toString()} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Filial de Destino</Text>
      <Picker
        selectedValue={destinationBranch}
        onValueChange={(itemValue) => setDestinationBranch(itemValue as number)}
        style={styles.picker}

      >
        <Picker.Item label="Selecione uma filial de destino" value={null} />
        {branches.map(branch => (
          <Picker.Item key={branch.id.toString()} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Produto</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={itemValue => setSelectedProduct(itemValue)}
        style={styles.picker}
      >

        {filteredProducts.map(product => (
          <Picker.Item key={product.product_id.toString()} label={product.product_name} value={product.product_id} />
        ))}
      </Picker>

      <Text style={styles.label}>Quantidade Disponível: {productStock}</Text>
      <TextInput
        placeholder="Quantidade"
        mode="outlined"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        placeholder="Observações"
        mode="outlined"
        multiline
        value={observations}
        onChangeText={setObservations}
        style={[styles.input, styles.textArea]}
      />

      {/* <Button  title="Cadastrar" onPress={handleRegister} /> */}
      <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
  },
  picker: {
    height: 50,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#1565C0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MovementRegistration;
