import React from 'react';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import { panteStats } from '../data/const';


export default function StatsScreen() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedStats = await AsyncStorage.getItem('panteStats');
        if (storedStats) {
          // Hvis data allerede finnes, bruk den lagrede dataen
          setStats(JSON.parse(storedStats));
        } else {
          // Hvis ikke, lagre den forhåndsdefinerte dataen fra const.js i AsyncStorage
          await AsyncStorage.setItem('panteStats', JSON.stringify(panteStats));
          setStats(panteStats);
        }
      } catch (error) {
        console.error("Feil ved lasting av statistikk:", error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pante Statistikk</Text>
      {stats ? (
        Object.entries(stats).map(([month, data]) => (
          <View key={month} style={styles.statsContainer}>
            <Text style={styles.monthText}>{month}</Text>
            <Text>Antall pantet: {data.antall}</Text>
            <Text>CO₂ spart: {data.co2} kg</Text>
          </View>
        ))
      ) : (
        <Text>Laster statistikk...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});