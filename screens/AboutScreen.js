import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function AboutScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!email) {
      errors.email = 'Palun sisesta e-mail!';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Palun sisesta korrektne e-mail!';
      valid = false;
    }

    if (!message) {
      errors.message = 'Palun sisesta sõnum!';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSend = () => {
    if (validateForm()) {
      console.log('Email:', email);
      console.log('Message:', message);
      alert('Sõnum saadetud!');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        </View>

        <Text style={styles.title}>Meist</Text>
        <Text style={styles.description}>
          Oleme perefirma, kelle eesmärk on pakkuda kvaliteetset käsitööd, mis toob rõõmu igasse koju.
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.kasitoo.ee')}>
          <Text style={styles.link}>🌐 www.kasitoo.ee</Text>
        </TouchableOpacity>

        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
            <Text style={styles.socialLink}>📘 Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')}>
            <Text style={styles.socialLink}>📸 Instagram</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.formTitle}>Võta meiega ühendust</Text>
        <TextInput
          style={styles.input}
          placeholder="Sinu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sinu sõnum"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={4}
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Saada</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#555',
  },
  link: {
    textAlign: 'center',
    fontSize: 16,
    color: '#0078D7',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  socialLink: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#0078D7',
    textDecorationLine: 'underline',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0078D7',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
