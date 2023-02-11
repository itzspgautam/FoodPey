import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Fonts, Images} from '../Constants';
import {AddressListItem, Header} from '../Components';
import {Display} from '../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {LocationActions, StoreActions} from '../Actions';
import Geolocation from '@react-native-community/geolocation';
import {StorageServices} from '../Services';
import {ScrollView} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';

const AddressSelectScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {addresses, addressLoading} = useSelector(state => state.locationState);

  const getCurrentLocation = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    await Geolocation.getCurrentPosition(
      async success => {
        const address = {
          _id: null,
          title: 'Current Location',
          coordinates: [success.coords.longitude, success.coords.latitude],
        };
        await StorageServices.setAddress(JSON.stringify(address));
        dispatch(LocationActions.setAddress(address));
      },
      error => {},
      options,
    );
  };
  useEffect(() => {
    dispatch(LocationActions.getAllAddress());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.DEFAULT_WHITE}
      />
      <Header title="Select an Address" navigation={navigation} />

      <View style={styles.content}>
        <ScrollView>
          <View style={styles.locationContainer}>
            <TouchableOpacity onPress={() => getCurrentLocation()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Mci
                  name="crosshairs-gps"
                  color={Colors.DEFAULT_RED}
                  size={20}
                />
                <Text style={styles.locationText}>Use Current Location</Text>
              </View>
              <Text style={styles.locationTextDescription}>
                Use current location or pin marker on the map
              </Text>
            </TouchableOpacity>
            <Mci name="chevron-right" color={Colors.DEFAULT_BLACK} size={28} />
          </View>

          <View style={styles.savedAddressContainer}>
            <Text style={styles.savedText}>Saved Address</Text>
            {addressLoading ? (
              <View style={styles.storeLoading}>
                <Lottie
                  source={Images.ADDRESS_LOADING}
                  autoPlay
                  size="1000"
                  style={{height: 100}}
                />
              </View>
            ) : (
              addresses?.map(item => (
                <AddressListItem key={item._id} data={item} />
              ))
            )}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addButton}
            onPress={() => navigation.navigate('NewAddress')}>
            <Text style={styles.addButtonText}>+ Add new address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddressSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },

  content: {
    height: Display.setHeight(91),
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.LIGHT_YELLOW,
    paddingVertical: 20,
    borderBottomColor: Colors.LIGHT_RED,
    borderBottomWidth: 2,
  },
  locationText: {
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    marginHorizontal: 5,
  },
  locationTextDescription: {
    color: Colors.SECONDARY_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
    opacity: 0.6,
    marginLeft: 25,
  },

  savedAddressContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  savedText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
  },

  addButton: {
    height: 50,
    marginTop: 22,
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
  storeLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
});
