import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductListScreen({ navigation, cart, addToCart }) {
  const [search, setSearch] = useState('');

  const products = [
    { id: 1, name: 'Keraamiline vaas', price: 25.00, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Puidust lõikelaud', price: 15.00, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Kootud sall', price: 30.00, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Nahast rahakott', price: 40.00, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Klaasist vaagen', price: 35.00, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Villane tekk', price: 50.00, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Dekoratiivpadi', price: 20.00, image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Linane laudlina', price: 22.00, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Käsitööna valminud kauss', price: 18.00, image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Keraamiline kruus', price: 12.00, image: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Metallist küünlajalg', price: 28.00, image: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Nahast võtmehoidja', price: 10.00, image: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Punutud korv', price: 32.00, image: 'https://via.placeholder.com/150' },
    { id: 14, name: 'Käsitsi maalitud taldrik', price: 27.00, image: 'https://via.placeholder.com/150' },
    { id: 15, name: 'Puust mänguasi', price: 15.00, image: 'https://via.placeholder.com/150' },
    { id: 16, name: 'Dekoratiivne peegel', price: 45.00, image: 'https://via.placeholder.com/150' },
  ];

  // Filtreerime tooted otsingusõna järgi
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
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
          <View style={styles.cartIcon}>
            <FontAwesome name="shopping-cart" size={24} color="white" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Otsingukast */}
      <TextInput
        style={styles.searchBox}
        placeholder="Otsi toodet..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Toodete nimekiri */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
            </Text>
            <Text style={styles.productPrice}>{item.price.toFixed(2)} €</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Lisa ostukorvi</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
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
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchBox: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
  },
  productList: {
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    margin: 8,
    width: '45%',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#0078D7',
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
});
