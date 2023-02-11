import {Image, StatusBar, StyleSheet, Text, View, Linking} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../Constants';
import {Display} from '../Utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {GeneralActions, LocationActions, StoreActions} from '../Actions';
import {PermissionServices, StorageServices} from '../Services';
import Geolocation from '@react-native-community/geolocation';

const LocationPermissionScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const requestLocationPermission = async () => {
    setLoading(true);
    await PermissionServices.requestLocationPermission().then(
      async permission => {
        if (permission === 'granted') {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
          };
          await Geolocation.getCurrentPosition(
            async success => {
              const address = {
                _id: null,
                title: 'Current Location',
                coordinates: [
                  success.coords.longitude,
                  success.coords.latitude,
                ],
              };
              await StorageServices.setAddress(JSON.stringify(address));
              dispatch(LocationActions.setAddress(address));
              dispatch(StoreActions.getNearbyStores(address));
            },
            error => {},
            options,
          );

          await dispatch(GeneralActions.setLocationPermission(true));
          setLoading(false);
        } else if (permission === 'denied') {
          dispatch(GeneralActions.setLocationPermission(false));
          setLoading(false);
        } else if (permission === 'never_ask_again') {
          Linking.openSettings();
          dispatch(GeneralActions.setLocationPermission(false));
          setLoading(false);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.DEFAULT_GREEN}
      />
      <View style={styles.upperSection}>
        <Image style={styles.image} source={Images.LOCATION_PERMISSION} />
      </View>
      <View style={styles.bottomSection}>
        <View>
          <Text style={styles.bottomTitle}>Enable Location Services</Text>
          <Text style={styles.bottomDescription}>
            We need to know where you are in order to find nearby restaurants
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => requestLocationPermission()}>
            {loading ? (
              <Lottie source={Images.LOADING} autoPlay style={{width: 40}} />
            ) : (
              <Text style={styles.buttonText}>Enable Location Services</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  upperSection: {
    height: Display.setHeight(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Display.setWidth(85),
    height: Display.setHeight(35),
    marginLeft: 20,
  },
  bottomSection: {
    height: Display.setHeight(30),
    backgroundColor: Colors.DEFAULT_WHITE,
    borderTopEndRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 25,
    paddingBottom: 50,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  bottomTitle: {
    color: Colors.SECONDARY_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 22,
    textAlign: 'center',
  },
  bottomDescription: {
    color: Colors.INACTIVE_GREY,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    width: Display.setWidth(80),
    height: 50,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 16,
  },
});
