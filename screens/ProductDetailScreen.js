import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductDetailScreen({ route, navigation, addToCart }) {
  const { product } = route.params;

  const handleAddToCart = () => {
    addToCart(product); // Lisa toode ostukorvi
    navigation.navigate('Cart'); // Suuna ostukorvi
  };

  return (
    <ScrollView style={styles.container}>
      {/* Navigatsiooniriba */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItem}>Avaleht</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
          <Text style={styles.navItem}>Tooted</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.navItem}>Kontakt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Toote detailid */}
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price.toFixed(2)} €</Text>
      <Text style={styles.productDescription}>
        See on näidiskirjeldus tootest "{product.name}". See toode on kvaliteetne ja sobib suurepäraselt kingituseks.
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Lisa ostukorvi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0078D7',
    paddingVertical: 10,
  },
  navItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 20,
    color: '#0078D7',
    textAlign: 'center',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
