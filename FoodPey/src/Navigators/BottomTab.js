import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../Constants';
import {
  CartScreen,
  HomeScreen,
  LocationScreen,
  ProfileScreen,
} from '../Screens';
import {Display} from '../Utils';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: Display.setHeight(7),
          backgroundColor: Colors.DEFAULT_WHITE,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.DEFAULT_GREEN,
        tabBarInactiveTintColor: Colors.INACTIVE_GREY,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <IonIcon name="home" size={23} color={color} />
            ) : (
              <IonIcon name="home-outline" size={23} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={LocationScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <IonIcon name="compass" size={28} color={color} />
            ) : (
              <IonIcon name="compass-outline" size={28} color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <IonIcon name="cart" size={28} color={color} />
            ) : (
              <IonIcon name="cart-outline" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <IonIcon name="person" size={25} color={color} />
            ) : (
              <IonIcon name="person-outline" size={25} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
