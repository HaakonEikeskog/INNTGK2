import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';


export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til PantApp!</Text>
      <Text style={styles.description}>
        PantApp hjelper deg med å holde oversikt over dine pantevaner og reduserte CO₂-utslipp.
      </Text>

      <Text style={styles.sectionHeader}>Slik bruker du appen:</Text>
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instruction}>
          1. Gå til <Text style={styles.highlight}>Pant</Text>-skjermen for å skanne QR-koden på dine pantbare flasker og bokser.
        </Text>
        <Text style={styles.instruction}>
          2. Se din <Text style={styles.highlight}>Statistikk</Text> for en oversikt over dine pantede enheter og reduserte CO₂-utslipp hver måned.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Skann QR-kode"
          onPress={() => navigation.navigate('Pant')}
        />
        <Button
          title="Se statistikk"
          onPress={() => navigation.navigate('Stats')}
          color="#4682B4"
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});