import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
//import MapViewDirections from 'react-native-maps-directions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants';
import {useSelector} from 'react-redux';
import {Display} from '../Utils';
import {FeatureCard, Separator} from '../Components';

const LocationScreen = () => {
  const {initLocation, selectedAddresss} = useSelector(
    state => state.locationState,
  );

  const {stores} = useSelector(state => state.storeState);

  const india = {latitude: 20.5937, longitude: 78.9629};

  const getCurrentPosition = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    Geolocation.getCurrentPosition(
      success => {
        console.log(success),
          setCoords({
            lat: success.coords.latitude,
            lon: success.coords.longitude,
          });
      },
      error => console.log('error', error),
      options,
    );
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: !initLocation ? india.latitude : initLocation.latitude,
          longitude: !initLocation ? india.longitude : initLocation.longitude,
          latitudeDelta: !initLocation ? 10 : 0.04,
          longitudeDelta: !initLocation ? 10 : 0.04,
        }}>
        {initLocation && (
          <Marker
            // key={index}
            // draggable
            // onDragEnd={e => {
            //   console.log('dragEnd', e.nativeEvent.coordinate);
            // }}
            coordinate={{
              latitude: initLocation.latitude,
              longitude: initLocation.longitude,
            }}>
            <View style={styles.userMarker}>
              <Ionicon name="person" color={Colors.DEFAULT_WHITE} size={24} />
            </View>
          </Marker>
        )}
        {stores &&
          stores.map(store => (
            <Marker
              key={store._id}
              title={store.name}
              coordinate={{
                latitude: store.coordinates[1],
                longitude: store.coordinates[0],
              }}></Marker>
          ))}
      </MapView>
      <View style={styles.RestaurantContainer}>
        <FeatureCard data={stores} title={null} link={null} />
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  RestaurantContainer: {
    height: Display.setHeight(38),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  userMarker: {
    backgroundColor: Colors.DEFAULT_GREEN,
  },
});
