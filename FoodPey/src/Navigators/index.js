import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddressSelectScreen,
  LocationPermissionScreen,
  NewAddressScreen,
  RegisterScreen,
  SignInScreen,
  SplashScreen,
  StoreLoadingScreen,
  WelcomeScreen,
} from '../Screens';

import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {GeneralActions} from '../Actions';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const Navigators = () => {
  const dispatch = useDispatch();

  const {isAppLoading, isFirstTimeUse, token, locationPermission} = useSelector(
    state => state?.generalState,
  );
  const {storeLoading} = useSelector(state => state.storeState);

  // console.log('App Loading:', isAppLoading);
  // console.log('Token:', token);
  // console.log('First time use:', isFirstTimeUse);

  useEffect(() => {
    dispatch(GeneralActions.AppStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}

            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : locationPermission ? (
          <>
            {storeLoading ? (
              <Stack.Screen
                name="StoreLoading"
                component={StoreLoadingScreen}
              />
            ) : (
              <>
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen
                  name="AddressInput"
                  component={AddressSelectScreen}
                />
                <Stack.Screen name="NewAddress" component={NewAddressScreen} />
              </>
            )}
          </>
        ) : (
          <Stack.Screen
            name="LocationPermission"
            component={LocationPermissionScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
