import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen({ navigation, cart, addToCart }) {
  const products = [
    { id: 1, name: 'Käsitööline savivaas', price: 25.00, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Puidust lõikelaud', price: 15.00, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Käsitsi kootud sall', price: 30.00, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Nahast rahakott', price: 40.00, image: 'https://via.placeholder.com/150' },
  ];

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

      {/* Banner */}
      <Image source={{ uri: 'https://via.placeholder.com/600x200' }} style={styles.banner} />
      <Text style={styles.bannerText}>Tere tulemast meie käsitööpoodi!</Text>

      {/* Tutvustav tekst */}
      <Text style={styles.introText}>
        Avasta unikaalseid ja kvaliteetseid käsitöötooteid, mis on loodud südame ja hoolivusega.
      </Text>

      {/* Esiletõstetud tooted */}
      <Text style={styles.sectionTitle}>Esiletõstetud tooted</Text>
      <View style={styles.products}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product, addToCart })}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price.toFixed(2)} €</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
              <Text style={styles.addButtonText}>Lisa ostukorvi</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
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
  banner: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  introText: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '45%',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#0078D7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
