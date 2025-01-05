import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AboutScreen from './screens/AboutScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: 'Avaleht' }}
        >
          {(props) => <HomeScreen {...props} cart={cart} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen
          name="ProductList"
          options={{ title: 'Tooted' }}
        >
          {(props) => <ProductListScreen {...props} cart={cart} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetail"
          options={{ title: 'Toote detailid' }}
        >
          {(props) => <ProductDetailScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen
          name="About"
          options={{ title: 'Kontakt' }}
          component={AboutScreen}
        />
        <Stack.Screen
          name="Cart"
          options={{ title: 'Ostukorv' }}
        >
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
