import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    MapScreen: { origin: { latitude: number; longitude: number }; destination: { latitude: number; longitude: number } };
    
  };

  
// interface Location {
//   latitude: number;
//   longitude: number;
// }

// interface MapScreenProps {
//     route: RouteProp<{ params: { origin: Location; destination: Location } }, 'params'>;
//   }

type MapScreenProps = {
    route: RouteProp<RootStackParamList, 'MapScreen'>;
    navigation: StackNavigationProp<RootStackParamList, 'MapScreen'>;
  };



const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const { origin, destination } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marca a origem */}
        <Marker coordinate={origin} title="Origem" pinColor="green" />
        
        {/* Marca o destino */}
        <Marker coordinate={destination} title="Destino" pinColor="red" />
        
        {/* Marca o trajeto
         */}
        <Polyline
          coordinates={[origin, destination]}
          strokeColor="#1565C0" 
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
