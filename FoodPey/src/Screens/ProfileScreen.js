import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.userState);
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>{user?.name}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
