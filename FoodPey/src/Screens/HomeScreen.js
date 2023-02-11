import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Mock} from '../Constants';
import {StatusBar} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Sli from 'react-native-vector-icons/SimpleLineIcons';
import Mui from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  CategoriesMenuItem,
  FeatureCard,
  Separator,
  SortlistCard,
} from '../Components';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Display} from '../Utils';
import {FoodCard} from '../Components';
import {useSelector} from 'react-redux';

const Restaurants = [
  {
    _id: '1',
    name: 'Spicy Hut',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    tags: ['Biryani', 'Burger', 'Indian Dishes'],
    rating: '4.9',
    ratingCount: '309',
    distance: '4KM',
    time: '30m',
  },
  {
    _id: '2',
    name: 'Sanjha Chulha',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    tags: ['Biryani', 'Burger', 'Indian Dishes'],
    rating: '4.9',
    ratingCount: '309',
    distance: '4KM',
    time: '30m',
  },
  {
    _id: '3',
    name: 'Sheree Ram Sweets',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    tags: ['Biryani', 'Burger', 'Indian Dishes'],
    rating: '4.9',
    ratingCount: '309',
    distance: '4KM',
    time: '30m',
  },
  {
    _id: '4',
    name: 'Season 33',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    tags: ['Biryani', 'Burger', 'Indian Dishes'],
    rating: '4.9',
    ratingCount: '309',
    distance: '4KM',
    time: '30m',
  },
];

const food = [
  {
    _id: '_1',
    name: 'Biryani',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    restaurant: 'Spicy Hut',
    amount: '150',
  },
  {
    _id: '_2',
    name: 'Butter Roti and Naan',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    restaurant: 'Sanjha Chulha',
    amount: '140',
  },
  {
    _id: '_3',
    name: 'Pizza',
    poster:
      'https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg',
    restaurant: 'Season 33',
    amount: '450',
  },
];

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.LIGHT_GREY};

const HomeScreen = ({navigation}) => {
  const {initLocation, selectedAddress} = useSelector(
    state => state.locationState,
  );

  const {stores} = useSelector(state => state.storeState);

  const [activeCategory, setActiveCategory] = useState('');
  const [activeSortItem, setActiveSortItem] = useState('recent');

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.DEFAULT_GREEN}
      />
      <View style={styles.headerCurvedContainer}></View>
      <Separator height={10} />
      <View style={styles.topIConContainer}>
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={() => navigation.navigate('AddressInput')}>
          <Sli name="location-pin" color={Colors.DEFAULT_WHITE} size={16} />
          <Text style={styles.deliverText}>
            Delivered to
            <Text style={styles.addressText}>
              {' '}
              {!selectedAddress?._id
                ? 'CURRENT LOCATION'
                : selectedAddress.title.toUpperCase()}{' '}
              <Ionicon name="md-chevron-down" color={Colors.DEFAULT_YELLOW} />
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.notificationIconContainer}>
          <Mui name="bell-outline" size={30} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>10</Text>
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicon
            name="search-outline"
            size={25}
            color={Colors.DEFAULT_GREY}
          />
          <Text style={styles.searchText}>Search..</Text>
        </View>
        <Feather
          name="sliders"
          size={20}
          color={Colors.DEFAULT_YELLOW}
          style={{marginRight: 10}}
        />
      </View>
      <View style={styles.categoriesContainer}>
        {Mock.CATEGORIES.map(({name, icon}) => (
          <CategoriesMenuItem
            key={name}
            name={name}
            icon={icon}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        ))}
      </View>
      <Separator height={Display.setHeight(6)} />
      <FeatureCard data={stores} title={'Top Rated'} link={''} />

      <View style={styles.sortListContainer}>
        <TouchableOpacity
          style={sortStyle(activeSortItem === 'recent')}
          activeOpacity={0.8}
          onPress={() => setActiveSortItem('recent')}>
          <Text style={styles.sortListItemText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortStyle(activeSortItem === 'favorite')}
          activeOpacity={0.8}
          onPress={() => setActiveSortItem('favorite')}>
          <Text style={styles.sortListItemText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortStyle(activeSortItem === 'rating')}
          activeOpacity={0.8}
          onPress={() => setActiveSortItem('rating')}>
          <Text style={styles.sortListItemText}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortStyle(activeSortItem === 'popular')}
          activeOpacity={0.8}
          onPress={() => setActiveSortItem('popular')}>
          <Text style={styles.sortListItemText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortStyle(activeSortItem === 'trending')}
          activeOpacity={0.8}
          onPress={() => setActiveSortItem('trending')}>
          <Text style={styles.sortListItemText}>Trending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortListDataContainer}>
        {Restaurants?.map(item => (
          <SortlistCard key={item._id} data={item} />
        ))}
      </View>

      <Separator height={Display.setHeight(3)} />
      <FoodCard data={food} title={'Order again'} link={''} />
      <Separator height={Display.setHeight(8)} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_WHITE,
  },

  headerCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },

  topIConContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addressContainer: {
    flexDirection: 'row',
  },
  deliverText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    paddingLeft: 5,
    fontSize: 12,
  },
  addressText: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_YELLOW,
    paddingLeft: 1000,
  },
  notificationIconContainer: {},
  notificationBadge: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 32,
    position: 'absolute',
    padding: 2,
    height: 20,
    width: 20,
  },
  notificationText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },

  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10,
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
  },

  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },

  sortListDataContainer: {
    backgroundColor: Colors.LIGHT_YELLOW,
    paddingBottom: 30,
  },
});
