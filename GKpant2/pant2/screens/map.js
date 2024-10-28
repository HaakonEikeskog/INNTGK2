import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { cityCoordinates } from '../data/const';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [cities, setCities] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedCities = await AsyncStorage.getItem('cityCoordinates');
        if (storedCities) {
          setCities(JSON.parse(storedCities));
        } else {
          // Store initial cityCoordinates from const.js into AsyncStorage
          await AsyncStorage.setItem('cityCoordinates', JSON.stringify(cityCoordinates));
          setCities(cityCoordinates);
        }
      } catch (error) {
        console.error("Error loading cities data:", error);
      }
    };
    initializeData();
  }, []);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
      });
    })();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          location || {
            latitude: 59.91, // Midt i norge
            longitude: 10.75,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }
        }
      >
        {Object.entries(cities).map(([cityName, coords]) => (
          <Marker
            key={cityName}
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            title={cityName}
          />
        ))}
      </MapView>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});