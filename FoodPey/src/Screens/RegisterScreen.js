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
import {AuthenticationService} from '../Services';
import Lottie from 'lottie-react-native';

const RegisterScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cvisible, setcVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const register = () => {
    setIsLoading(true);
    let user = {name, email, password, cPassword};
    AuthenticationService.register(user).then(res => {
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.message);
      }
      if (res.success) {
        setErrorMessage('');
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Separator height={StatusBar.currentHeight} />

      <Header title="Register" navigation={navigation} />

      <Separator height={Display.setHeight(4)} />
      <View style={styles.content}>
        <Text style={styles.title}>Create new account</Text>
        <Text style={styles.description}>
          Enter your name, email and password to register.
          <Text
            style={styles.SignAltLinkText}
            onPress={() => navigation.navigate('SignIn')}>
            Already have an account?
          </Text>
        </Text>
        <Separator height={Display.setHeight(2)} />
        <Text style={styles.errorMessage}> {errorMessage}</Text>

        <View style={styles.textInputView}>
          <FeatherIcon name="user" style={styles.textInputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            placeholderTextColor={Colors.DARK_FIVE}
            value={name}
            onChangeText={e => setName(e)}
          />
        </View>
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
        <View style={styles.textInputView}>
          <FeatherIcon name="lock" style={styles.textInputIcon} />
          <TextInput
            secureTextEntry={cvisible ? false : true}
            style={styles.textInput}
            placeholder="Confirm password"
            placeholderTextColor={Colors.DARK_FIVE}
            value={cPassword}
            onChangeText={e => setCPassword(e)}
          />
          <FeatherIcon
            name={cvisible ? 'eye-off' : 'eye'}
            style={styles.textInputIcon}
            onPress={() => setcVisible(!cvisible)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInButton}
          onPress={() => register()}>
          {isLoading ? (
            <Lottie source={Images.LOADING} autoPlay style={{width: 40}} />
          ) : (
            <Text style={styles.signInButtonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <Separator height={Display.setHeight(3)} />
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
    marginTop: 15,
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

export default RegisterScreen;
