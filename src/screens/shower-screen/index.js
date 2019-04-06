import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { colors } from '../../config/styles';
import {
  SCREENS,
  BUTTONS
} from '../../config/constants';

export default class Shower extends Component {
  static navigationOptions = {
    title: SCREENS.Shower,
  };

  constructor(props) {
    super(props);
    this.state = {
      switchSoapValue: false
    };
  }

  toggleSoapSwitch = (value) => {
    this.setState({ switchSoapValue: value })
    console.log('Switch 1 is: ' + value)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_LEVEL}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.PERCENTAGE25}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.PERCENTAGE50}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.PERCENTAGE75}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.PERCENTAGE100}%</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.SOAP}</Text>
          <Switch style={styles.switch}
            onValueChange={this.toggleSoapSwitch}
            value={this.state.switchSoapValue}>
          </Switch>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_TEMPERATURE}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.COLD}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.WARM}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.HOT}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.TURN_ON}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.YES}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.NO}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  containerOption: {
    padding: 5
  },
  title: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 30,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    width: 100,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  switch: {
    alignSelf: 'center'
  },
});
