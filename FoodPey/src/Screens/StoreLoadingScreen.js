import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../Constants';
import Lottie from 'lottie-react-native';

const StoreLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Lottie source={Images.STORE_LOADING} style={styles.animatoin} autoPlay />
    </View>
  );
};

export default StoreLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatoin: {
    marginBottom: 100,
  },
});
