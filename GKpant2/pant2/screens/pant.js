import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function PantScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Sjekk kamera- og QR-skannertillatelse
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Håndter når QR-koden er skannet
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR-kode skannet!", `Data: ${data}`)
  };

  // Vis en melding om brukeren ikke har gitt kameratillatelse
  if (hasPermission === null) {
    return <Text>Behandler tillatelse til kamera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Ingen tilgang til kamera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skann QR-kode for panting</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <Button title={'Skann igjen'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
