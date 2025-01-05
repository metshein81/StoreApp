import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CartScreen({ cart, removeFromCart, calculateTotal, navigation }) {
  const [localCart, setLocalCart] = useState(cart);

  // Sünkroniseeri lokaalne ostukorv globaalse olekuga
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleRemove = (productId) => {
    removeFromCart(productId); // Eemalda globaalsest olekust
    setLocalCart((prevCart) => prevCart.filter((item) => item.id !== productId)); // Eemalda lokaalsest olekust
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
        {/* Ostukorvi ikoon eemaldatud siit */}
      </View>

      {/* Ostukorvi sisu */}
      <Text style={styles.title}>🛒 Ostukorv</Text>
      {localCart.length === 0 ? (
        <Text style={styles.emptyText}>Ostukorv on tühi</Text>
      ) : (
        localCart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Hind: {item.price.toFixed(2)} €</Text>
              <Text style={styles.quantity}>Kogus: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Text style={styles.removeButton}>Eemalda</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <Text style={styles.total}>Kogusumma: {calculateTotal()} €</Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Mine maksma</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0078D7',
    paddingVertical: 10,
    marginBottom: 10,
  },
  navItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    color: '#555',
  },
  quantity: {
    fontSize: 12,
    color: '#777',
  },
  removeButton: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
