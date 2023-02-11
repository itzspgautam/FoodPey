import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Header, Separator} from '../Components';
import {Colors, Fonts, Images} from '../Constants';
import {Display} from '../Utils';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import UserActions from '../Actions/UserActions';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {error} = useSelector(state => state.userState);

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    setIsLoading(true);
    let cred = {email, password};
    dispatch(UserActions.Login(cred));

    // let cred = {email, password};
    // UserActions.login(cred).then(res => {
    //   setIsLoading(false);
    //   console.log(res);

    //   if (!res.success) {
    //     return setErrorMessage(res.message);
    //   }
    //   if (res.success) {
    //     setErrorMessage('');
    //     console.log('final', res.token);
    //     StorageServices.setToken(res?.token).then(() => {
    //       dispatch(GeneralAction.setToken(res?.token));
    //     });
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Separator height={StatusBar.currentHeight} />

      <Header title="Sign In" navigation={navigation} />

      <Separator height={Display.setHeight(4)} />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to FoodPey</Text>
        <Text style={styles.description}>
          Enter your phone number or email to sign in & explore delicious foods
          around you.
        </Text>
        <Separator height={Display.setHeight(2)} />
        <Text style={styles.errorMessage}> {error}</Text>

        <View style={styles.textInputView}>
          <FeatherIcon name="user" style={styles.textInputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Email or Phone"
            placeholderTextColor={Colors.DARK_FIVE}
            value={email}
            onChangeText={e => setEmail(e)}
          />
        </View>
        <View style={styles.textInputView}>
          <FeatherIcon name="lock" style={styles.textInputIcon} />
          <TextInput
            secureTextEntry={visible ? false : true}
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={Colors.DARK_FIVE}
            value={password}
            onChangeText={e => setPassword(e)}
          />
          <FeatherIcon
            name={visible ? 'eye-off' : 'eye'}
            style={styles.textInputIcon}
            onPress={() => setVisible(!visible)}
          />
        </View>
        <View style={styles.extraContent}>
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <Text style={styles.forgotPasswordText}>Forgot Password!</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInButton}
          onPress={() => login()}>
          {isLoading ? (
            <Lottie source={Images.LOADING} autoPlay style={{width: 40}} />
          ) : (
            <Text style={styles.signInButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Separator height={Display.setHeight(4)} />
        <View style={styles.signAltContainer}>
          <Text style={styles.SignAltText}>Dont have an account?</Text>
          <Text
            style={styles.SignAltLinkText}
            onPress={() => navigation.navigate('Register')}>
            Register here
          </Text>
        </View>
        <Separator height={Display.setHeight(2)} />
        <Text style={styles.SignAltText}>OR</Text>
        <Separator height={Display.setHeight(3)} />

        <TouchableOpacity activeOpacity={0.8} style={styles.socialLoginBtn}>
          <IonIcon style={styles.socialLoginLogo} name="logo-google" />
          <Text style={styles.socialLoginText}>Continue with Google</Text>
        </TouchableOpacity>
        <Separator height={Display.setHeight(2)} />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.socialLoginBtn,
            backgroundColor: Colors.FABEBOOK_BLUE,
          }}>
          <IonIcon
            style={{...styles.socialLoginLogo, color: Colors.FABEBOOK_BLUE}}
            name="logo-google"
          />
          <Text style={styles.socialLoginText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },

  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  description: {
    paddingTop: 2,
    fontSize: 16,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DARK_FOUR,
  },

  textInputView: {
    backgroundColor: Colors.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY2,
    height: 55,
    overflow: 'hidden',
    marginTop: 20,
  },
  textInputIcon: {
    color: Colors.DARK_FIVE,
    fontSize: 24,
    paddingHorizontal: 10,
  },
  textInput: {
    width: Display.setWidth(68),
    color: Colors.DARK_THREE,
    padding: 0,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    height: 50,
  },
  extraContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  rememberMeText: {
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 12,
  },
  forgotPasswordText: {
    color: Colors.DEFAULT_GREEN,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 12,
  },

  signInButton: {
    height: 50,
    marginTop: 22,
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  signInButtonText: {
    fontSize: 16,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },

  signAltContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SignAltText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
  },
  SignAltLinkText: {
    paddingHorizontal: 4,
    fontSize: 16,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_GREEN,
  },

  socialLoginBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  socialLoginText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    textAlign: 'center',
    width: Display.setWidth(70),
  },
  socialLoginLogo: {
    fontSize: 26,
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 5,
    color: Colors.GOOGLE_BLUE,
    borderRadius: 8,
  },
  errorMessage: {
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 13,
    marginLeft: 5,
  },
});

export default SignInScreen;
