import React, { Component } from "react";
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
} from "react-native";

import IconHouse from "../../assets/house1.png"
import { colors, commonStyles } from '../../config/styles'
import { SCREENS } from '../../config/constants'

export default class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      emailString: "juanito@gmail.com",
      passwordString: "1234",
      isLoading: false,
      message: "",
      data: ""
    };
  }

  _onSearchPressed = () => {
    if (
      this.state.emailString == "juanito@gmail.com" &&
      this.state.passwordString == "1234"
    ) {
      this.props.navigation.navigate(SCREENS.GRID_VIEW);
    } else {
      alert("Wrong user or password.");
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
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={IconHouse}
          />
        </View>
        {spinner}
        <View style={styles.formContainer}>
          <View style={styles.containerForm}>
            <StatusBar barStyle="light-content" />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType="email-address"
              value={this.state.emailString}
              onChange={this._onSearchTextChangedEmail}
              underlineColorAndroid={"transparent"}
              returnKeyType="next"
              placeholder="Email"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />
            <TextInput
              style={styles.input}
              returnKeyType="go"
              ref={input => (this.passwordInput = input)}
              placeholder="Password"
              value={this.state.passwordString}
              onChange={this._onSearchTextChangedPassword}
              underlineColorAndroid={"transparent"}
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onSearchPressed}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.containerLink}>
              <Text style={styles.textLink}>Register</Text>
              <Text style={styles.textLink}>Forgot your password?</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  containerForm: {
    padding: 20
  },
  containerLink: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#000000"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    flex: 1,
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  textLink: {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    margin: 6
  },
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: "center",
    opacity: 0.9
  }
});
