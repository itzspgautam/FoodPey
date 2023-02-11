import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../Constants';
import {Display} from '../Utils';

const WelcomeCard = ({title, content, image}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 22,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  content: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    fontFamily: Fonts.POPPINS_LIGHT,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});
