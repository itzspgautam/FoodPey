import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../Constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Mui from 'react-native-vector-icons/MaterialIcons';

const SortlistCard = ({data}) => {
  return (
    <View style={styles.sortListCard} key={data._id}>
      <Image
        style={styles.posterImage}
        source={{
          uri: 'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
        }}
      />
      <View style={styles.dataContainer}>
        <View style={styles.upperSection}>
          <View style={styles.upperLeftSection}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Mui
                  name="fastfood"
                  size={16}
                  style={{lineHeight: 14}}
                  color={Colors.DEFAULT_YELLOW}
                />
                <Text style={styles.badgeText}> {data.tags[0]}</Text>
              </View>
              <View style={styles.badge}>
                <IonIcon
                  name="stopwatch"
                  size={16}
                  color={Colors.DEFAULT_GREEN}
                />
                <Text style={styles.badgeText}> 15m</Text>
              </View>
            </View>
          </View>
          <View style={styles.upperLeftSection}>
            <IonIcon name="bookmark" size={22} color={Colors.DEFAULT_RED} />
          </View>
        </View>
        <View style={styles.lowerSection}>
          <View style={styles.badge}>
            <IonIcon name="star" size={16} color={Colors.DEFAULT_YELLOW} />
            <Text
              style={{
                ...styles.badgeTextLower,
                color: Colors.DEFAULT_BLACK,
                fontSize: 14,
              }}>
              {' '}
              4.9
            </Text>
          </View>
          <View style={styles.badge}>
            <IonIcon
              name="location-outline"
              size={16}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.badgeTextLower}> 4.3km</Text>
          </View>
          <View style={styles.badge}>
            <IonIcon
              name="call-outline"
              size={16}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.badgeTextLower}> Contact</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SortlistCard;

const styles = StyleSheet.create({
  sortListCard: {
    flexDirection: 'row',
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    height: 110,
    marginTop: 15,
    padding: 10,
    elevation: 1,
    marginHorizontal: 10,
  },
  posterImage: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  dataContainer: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
  },

  upperSection: {
    flex: 1,
    flexGrow: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },

  badgeContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  badge: {
    paddingHorizontal: 2,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.DARK_FIVE,
  },
  lowerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeTextLower: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.DARK_THREE,
  },
});
