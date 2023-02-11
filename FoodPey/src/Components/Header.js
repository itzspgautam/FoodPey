import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../Constants';
import {Display} from '../Utils';

const Header = ({title, navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <IonIcon
        name="chevron-back"
        color={Colors.DEFAULT_BLACK}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'black',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 20,
    width: Display.setWidth(75),
    textAlign: 'center',
  },
});
