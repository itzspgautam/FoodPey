import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../Constants';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {LocationActions, StoreActions} from '../Actions';

const AddressListItem = ({data}) => {
  const dispatch = useDispatch();
  const {selectedAddress} = useSelector(state => state.locationState);
  const selectThisAddress = address => {
    dispatch(LocationActions.setAddress(address));
    dispatch(StoreActions.getNearbyStores(address));
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.addressContainer}
      onPress={() => selectThisAddress(data)}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IonIcon
            name={
              data.title.toUpperCase() === 'HOME'
                ? 'home-outline'
                : data.title.toUpperCase() === 'OFFICE'
                ? 'briefcase-outline'
                : 'location-outline'
            }
            color={Colors.DEFAULT_BLACK}
            size={30}
          />
          <Text style={styles.addressText}>{data.title.toUpperCase()}</Text>
        </View>
        <Text style={styles.addressTextDescription}>
          {data.street}, {data.city}
        </Text>
      </View>
      <Mci
        name={
          selectedAddress?._id === data._id
            ? 'check-circle'
            : 'check-circle-outline'
        }
        color={Colors.DEFAULT_GREEN}
        size={28}
      />
    </TouchableOpacity>
  );
};

export default AddressListItem;

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: Colors.LIGHT_GREY2,
    borderBottomWidth: 2,
  },
  addressText: {
    color: Colors.SECONDARY_BLACK,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 14,
    marginHorizontal: 10,
  },
  addressTextDescription: {
    color: Colors.SECONDARY_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
    opacity: 0.6,
    marginLeft: 40,
  },
});
