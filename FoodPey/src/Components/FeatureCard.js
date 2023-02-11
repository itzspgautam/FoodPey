import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../Constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Display, TimeAndDistance} from '../Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Separator} from '../Components';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FeatureCard = ({title, link, data}) => {
  return (
    <>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.titleLink}>
            See all
            <IonIcon name="md-chevron-forward" size={15} />
          </Text>
        </View>
      )}

      <FlatList
        style={styles.flatlistContainer}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        contentContainerStyle={{paddingHorizontal: 10}}
        data={data}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
            <View style={styles.posterImageContainer}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: item.poster,
                }}
              />
            </View>

            <View style={styles.cardData}>
              <View>
                <Text style={styles.dataTitle}>{item.name}</Text>
                <Text style={styles.dataTags}>{item?.tags?.join(' • ')}</Text>
              </View>

              <View style={styles.BottomData}>
                <View style={styles.ratingContainer}>
                  <FontAwesome
                    name="star"
                    color={Colors.DEFAULT_YELLOW}
                    size={16}
                  />
                  <Text style={styles.ratingText}>
                    {item.rating}
                    <Text
                      style={{
                        fontFamily: Fonts.POPPINS_MEDIUM,
                        color: Colors.DARK_FIVE,
                      }}>
                      ({item.ratingCount})
                    </Text>
                  </Text>
                </View>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                    <IonIcon
                      color={Colors.SECONDARY_RED}
                      size={16}
                      name="location-outline"
                    />
                    <Text style={styles.badgeText}>
                      {TimeAndDistance.calculateDistance(item.distance)}
                    </Text>
                  </View>

                  <View style={styles.badge}>
                    <IonIcon
                      color={Colors.SECONDARY_RED}
                      size={16}
                      name="stopwatch-outline"
                    />
                    <Text style={styles.badgeText}>
                      {TimeAndDistance.calculateTime(item.distance)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 18,
  },
  titleLink: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 14,
  },

  cardContainer: {
    height: 230,
    width: Display.setWidth(65),
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 8,
    marginVertical: 15,
  },

  posterImageContainer: {
    padding: 6,
    height: '65%',
    width: '100%',
  },
  posterImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  cardData: {
    padding: 4,
    flex: 1,
    justifyContent: 'space-between',
  },
  dataTitle: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dataTags: {
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_MEDIUM,
    paddingHorizontal: 10,
    fontSize: 11,
  },

  BottomData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
    paddingHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 12,
    paddingLeft: 2,
    lineHeight: 16,
  },

  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: Colors.LIGHT_YELLOW,
    padding: 1,
    paddingHorizontal: 2,
    paddingRight: 8,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginLeft: 2,
  },

  badgeText: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 18,
    color: Colors.SECONDARY_RED,
  },
});
