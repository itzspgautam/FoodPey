import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../Constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Display} from '../Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Separator} from '../Components';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FoodCard = ({title, link, data}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titleLink}>
          See all
          <IonIcon name="md-chevron-forward" size={15} />
        </Text>
      </View>

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
                <Text numberOfLines={1} style={styles.dataTitle}>
                  {item.name}
                </Text>
                <Text style={styles.dataTags}>{item.restaurant}</Text>
              </View>

              <View style={styles.BottomData}>
                <View style={styles.amountContainer}>
                  <View style={styles.amountContainer}>
                    <FontAwesome
                      name="rupee"
                      color={Colors.DEFAULT_GREEN}
                      size={16}
                    />
                    <Text style={styles.amountText}>
                      <Text>{item.amount}</Text>
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <FontAwesome
                      name="rupee"
                      color={Colors.DEFAULT_GREY}
                      size={12}
                    />
                    <Text
                      style={{
                        ...styles.amountText,
                        color: Colors.DEFAULT_GREY,
                        fontSize: 12,
                        fontFamily: Fonts.POPPINS_SEMI_BOLD,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      }}>
                      <Text>{item.amount}</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.cartButtom}>
                  <IonIcon color={Colors.DEFAULT_WHITE} size={16} name="cart" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FoodCard;

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
    height: 200,
    width: Display.setWidth(46),
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 8,
    marginVertical: 15,
  },

  posterImageContainer: {
    padding: 6,
    height: '60%',
    width: '100%',
  },
  posterImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  cardData: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dataTitle: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    paddingHorizontal: 10,
    fontSize: 14,
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
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  amountText: {
    color: Colors.DEFAULT_GREEN,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    paddingLeft: 2,
    lineHeight: 16,
  },
  cartButtom: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
