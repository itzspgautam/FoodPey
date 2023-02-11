import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {Header} from '../Components';
import {Colors, Fonts} from '../Constants';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {Display} from '../Utils';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import Sli from 'react-native-vector-icons/SimpleLineIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {LocationActions} from '../Actions';

const NewAddressScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {initLocation, selectedAddress} = useSelector(
    state => state.locationState,
  );

  const mapRef = createRef();

  const india = {latitude: 20.5937, longitude: 78.9629};
  const [updating, setUpdating] = useState(false);
  const [locationType, setLocationType] = useState('HOME');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [title, setTitle] = useState('');

  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  const handleLocateMePress = async () => {
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
      };
      await Geolocation.getCurrentPosition(
        async success => {
          setRegion({
            ...region,
            latitude: success.coords.latitude,
            longitude: success.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => {},
        options,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveAddress = async () => {
    const newAddress = {
      title: locationType === 'OTHER' ? title : locationType,
      street,
      city,
      state,
      zip,
      country: 'india',
      latitude: region.latitude,
      longitude: region.longitude,
    };
    dispatch(LocationActions.createAddress(newAddress, navigation));
  };
  useEffect(() => {
    if (!updating && mapRef.current) {
      setUpdating(true);
      mapRef.current.animateToRegion(region, 2000);
      setTimeout(() => {
        setUpdating(false);
      }, 1000);
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header title="Add new Address" navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapView}
            region={region}
            onRegionChange={newRegion => {
              if (!updating) {
                setRegion(newRegion);
              }
            }}
            onRegionChangeComplete={() => setUpdating(false)}
            ref={mapRef}>
            {selectedAddress && (
              <Marker
                // key={index}
                // draggable
                // onDragEnd={e => {
                //   console.log('dragEnd', e.nativeEvent.coordinate);
                // }}
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}></Marker>
            )}
          </MapView>
          <TouchableOpacity
            onPress={() => handleLocateMePress()}
            style={styles.locateMeButton}
            activeOpacity={0.6}>
            <Mci name="crosshairs-gps" color={Colors.DEFAULT_RED} size={20} />
            <Text style={styles.locateMeButtonText}>Locate Me</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.formContainer}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Sli name="location-pin" style={styles.InputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Street"
                placeholderTextColor={Colors.DARK_FIVE}
                value={street}
                onChangeText={e => setStreet(e)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Sli name="location-pin" style={styles.InputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="City"
                placeholderTextColor={Colors.DARK_FIVE}
                value={city}
                onChangeText={e => setCity(e)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Sli name="location-pin" style={styles.InputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="State"
                placeholderTextColor={Colors.DARK_FIVE}
                value={state}
                onChangeText={e => setState(e)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Sli name="location-pin" style={styles.InputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Zip Code"
                placeholderTextColor={Colors.DARK_FIVE}
                value={zip}
                onChangeText={e => setZip(e)}
              />
            </View>
            <View style={styles.locationTypeContainer}>
              <TouchableOpacity
                onPress={() => setLocationType('HOME')}
                activeOpacity={0.8}
                style={
                  locationType === 'HOME'
                    ? {
                        ...styles.locationType,
                        backgroundColor: Colors.DEFAULT_GREEN,
                      }
                    : styles.locationType
                }>
                <IonIcon
                  name="home-outline"
                  size={22}
                  color={
                    locationType === 'HOME'
                      ? Colors.DEFAULT_WHITE
                      : Colors.INACTIVE_GREY
                  }
                />
                <Text
                  style={
                    locationType === 'HOME'
                      ? {
                          ...styles.locationTypeText,
                          color: Colors.DEFAULT_WHITE,
                        }
                      : styles.locationTypeText
                  }>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLocationType('OFFICE')}
                activeOpacity={0.8}
                style={
                  locationType === 'OFFICE'
                    ? {
                        ...styles.locationType,
                        backgroundColor: Colors.DEFAULT_GREEN,
                      }
                    : styles.locationType
                }>
                <IonIcon
                  name="briefcase-outline"
                  size={22}
                  color={
                    locationType === 'OFFICE'
                      ? Colors.DEFAULT_WHITE
                      : Colors.INACTIVE_GREY
                  }
                />
                <Text
                  style={
                    locationType === 'OFFICE'
                      ? {
                          ...styles.locationTypeText,
                          color: Colors.DEFAULT_WHITE,
                        }
                      : styles.locationTypeText
                  }>
                  Office
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLocationType('OTHER')}
                activeOpacity={0.8}
                style={
                  locationType === 'OTHER'
                    ? {
                        ...styles.locationType,
                        backgroundColor: Colors.DEFAULT_GREEN,
                      }
                    : styles.locationType
                }>
                <IonIcon
                  name="location-outline"
                  size={22}
                  color={
                    locationType === 'OTHER'
                      ? Colors.DEFAULT_WHITE
                      : Colors.INACTIVE_GREY
                  }
                />
                <Text
                  style={
                    locationType === 'OTHER'
                      ? {
                          ...styles.locationTypeText,
                          color: Colors.DEFAULT_WHITE,
                        }
                      : styles.locationTypeText
                  }>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
            {locationType === 'OTHER' && (
              <View style={styles.inputGroup}>
                <Sli name="location-pin" style={styles.InputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Specify Other (Ex: Room, College)"
                  placeholderTextColor={Colors.DARK_FIVE}
                  value={title}
                  onChangeText={e => setTitle(e)}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addButton}
          onPress={() => handleSaveAddress()}>
          <Text style={styles.addButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  content: {
    flex: 1,
    top: 0,
  },
  mapContainer: {
    height: Display.setHeight(35),
    position: 'relative',
    alignItems: 'center',
  },
  mapView: {
    height: '100%',
    width: '100%',
  },

  locateMeButton: {
    position: 'absolute',
    backgroundColor: Colors.DEFAULT_WHITE,
    bottom: 20,
    padding: 5,
    borderRadius: 12,
    elevation: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  locateMeButtonText: {
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    paddingLeft: 2,
  },

  formContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: Display.setHeight(65),
  },

  addButton: {
    marginVertical: 15,
    height: 50,
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  inputGroup: {
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY2,
    backgroundColor: Colors.LIGHT_GREY,
    marginTop: 15,
  },
  InputIcon: {
    color: Colors.DEFAULT_GREY,
    fontSize: 28,
    marginLeft: 8,
  },
  textInput: {
    position: 'absolute',
    width: '100%',
    paddingLeft: 45,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },

  locationTypeContainer: {flexDirection: 'row', paddingTop: 10},
  locationType: {
    marginHorizontal: 5,
    backgroundColor: Colors.LIGHT_GREY2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  locationTypeText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 16,
    color: Colors.INACTIVE_GREY,
    paddingLeft: 2,
    paddingRight: 10,
  },
});
