import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import IconHouse from '../../assets/house1.png';
import { colors, commonStyles } from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  PLACEHOLDERS,
  BUTTONS
} from '../../config/constants';

export default class Login extends Component {
  static navigationOptions = {
    title: SCREENS.Login
  };

  constructor(props) {
    super(props);
    this.state = {
      emailString: "juanito@gmail.com",
      passwordString: "1234",
      isLoading: false,
    };
  }

  _onSearchPressed = () => {
    if (
      this.state.emailString == "juanito@gmail.com" &&
      this.state.passwordString == "1234"
    ) {
      this.props.navigation.navigate(SCREENS.HOME);
    } else {
      alert(ALERTS.WRONG);
    }
  };

  _onSearchTextChangedEmail = event => {
    this.setState({
      emailString: event.nativeEvent.text
    });
  };

  _onSearchTextChangedPassword = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            style={styles.logo}
            source={IconHouse}
          />
        </View>
        {spinner}
        <View style={styles.formContainer}>
          <View style={styles.containerForm}>
            <StatusBar barStyle='light-content' />
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType='email-address'
              value={this.state.emailString}
              onChange={this._onSearchTextChangedEmail}
              underlineColorAndroid={colors.transparent}
              returnKeyType='next'
              placeholder={PLACEHOLDERS.EMAIL}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              returnKeyType='go'
              ref={input => (this.passwordInput = input)}
              placeholder={PLACEHOLDERS.PASSWORD}
              value={this.state.passwordString}
              onChange={this._onSearchTextChangedPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onSearchPressed}
            >
              <Text style={styles.buttonText}>{BUTTONS.LOGIN}</Text>
            </TouchableOpacity>
            <View style={styles.containerLink}>
              <Text style={styles.textLink}>{BUTTONS.REGISTER}</Text>
              <Text style={styles.textLink}>{BUTTONS.FORGOT}</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '60%',
    resizeMode: 'contain',
    resizeMode: 'contain',
    width: '60%',
  },
  containerForm: {
    padding: 20
  },
  input: {
    backgroundColor: colors.inputColor,
    color: colors.black,
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  containerLink: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  textLink: {
    color: colors.black,
    fontWeight: '700',
    margin: 6,
    textAlign: 'center',
  },
});
