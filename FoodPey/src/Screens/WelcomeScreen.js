import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, General} from '../Constants';
import {Separator, WelcomeCard} from '../Components';
import {Display} from '../Utils';
import {GeneralAction, GeneralActions} from '../Actions';
import {useDispatch} from 'react-redux';
import {StorageServices} from '../Services';

const pageStyle = isActive =>
  isActive
    ? styles.page
    : {...styles.page, backgroundColor: Colors.DEFAULT_GREY, width: 8};
const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
      <View style={pageStyle} />
      <View style={pageStyle} />
      <View style={pageStyle} />
    </View>
  );
};

export default function WelcomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({changed}) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const PageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };

  const getStarted = () => {
    dispatch(GeneralActions.setFirstTimeUse());
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <Separator height={Display.setHeight(8)} />
      <View style={styles.welcomeContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(8)} />
      <Pagination index={welcomeListIndex} />
      <Separator height={Display.setHeight(8)} />

      {welcomeListIndex === General.WELCOME_CONTENTS.length - 1 ? (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={styles.startbtn}
            activeOpacity={0.8}>
            <Text style={styles.startbtnText} onPress={() => getStarted()}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => welcomeList.current.scrollToEnd()}
            activeOpacity={0.8}
            style={{...styles.button, backgroundColor: Colors.DEFAULT_WHITE}}>
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => PageScroll()}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeContainer: {height: Display.setHeight(60)},
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  page: {
    height: 8,
    width: 20,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
  },
  button: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 32,
  },
  buttonText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 16,
  },

  startbtn: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 10,
    width: Display.setWidth(60),
    alignItems: 'center',
    borderRadius: 12,
  },
  startbtnText: {
    fontSize: 18,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
});
