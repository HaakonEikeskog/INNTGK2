import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import map from './screens/map';
import pant from './screens/pant';
import profil from './screens/profil';
import homescreen from './screens/homescreen';
import stats from './screens/stats';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
    <Tab.Navigator>
    <Tab.Screen name="Home" component={homescreen} />
    <Tab.Screen name="Map" component={map} />
    <Tab.Screen name="Pant" component={pant} />
    <Tab.Screen name="Stats" component={stats} />
    <Tab.Screen name="Profil" component={profil} />
    </Tab.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
