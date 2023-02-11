import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts, Images} from '../Constants';
import {Display} from '../Utils';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
      />
      <Image source={Images.LOGO} resizeMode="contain" style={styles.logo} />
      <Text style={styles.title}>FoodPey</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  logo: {
    height: Display.setHeight(25),
    width: Display.setWidth(50),
  },
  title: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 36,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
