import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { colors, commonStyles } from "../../config/styles";
import { SCREENS, BUTTONS, VALUES } from "../../config/constants";

export default class Shower extends Component {
  static navigationOptions = {
    title: SCREENS.STATISTICS
  };

  constructor(props) {
    super(props);
    this.state = {
      waterLevel: VALUES.PERCENTAGE25,
      switchSoapValue: false,
      soapValue: "f",
      waterTemperature: VALUES.COLD
    };
  }

  _selectedButtonStyle = function(value) {
    if (
      this.state.waterLevel == value ||
      this.state.waterTemperature == value
    ) {
      return commonStyles.selectedButtonContainer;
    } else {
      return styles.buttonContainer;
    }
  };

  _selectedButtonTextStyle = function(value) {
    if (
      this.state.waterLevel == value ||
      this.state.waterTemperature == value
    ) {
      return commonStyles.selectedButtonText;
    } else {
      return styles.buttonText;
    }
  };

  _selectedWaterLevel = value => {
    this.setState({ waterLevel: value });
  };

  _selectedWaterTemperature = value => {
    this.setState({ waterTemperature: value });
  };

  _toggleSoapSwitch = value => {
    this.setState({ switchSoapValue: value });
    if (value) {
      this.setState({ soapValue: "t" });
    } else {
      this.setState({ soapValue: "f" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_LEVEL}</Text>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE25)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE25)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE25)}>
              {BUTTONS.PERCENTAGE25}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE50)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE50)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE50)}>
              {BUTTONS.PERCENTAGE50}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE75)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE75)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE75)}>
              {BUTTONS.PERCENTAGE75}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE100)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE100)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE100)}>
              {BUTTONS.PERCENTAGE100}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.SOAP}</Text>
          <Switch
            style={styles.switch}
            trackColor={{ true: colors.black, false: colors.grey }}
            thumbColor={colors.black}
            backgroundColor={colors.white}
            onValueChange={this._toggleSoapSwitch}
            value={this.state.switchSoapValue}
          />
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_TEMPERATURE}</Text>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.COLD)}
            onPress={() => this._selectedWaterTemperature(VALUES.COLD)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.COLD)}>
              {BUTTONS.COLD}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.WARM)}
            onPress={() => this._selectedWaterTemperature(VALUES.WARM)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.WARM)}>
              {BUTTONS.WARM}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.HOT)}
            onPress={() => this._selectedWaterTemperature(VALUES.HOT)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.HOT)}>
              {BUTTONS.HOT}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.AUTO)}
            onPress={() => this._selectedWaterTemperature(VALUES.AUTO)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.AUTO)}>
              {BUTTONS.AUTOMATIC}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.TURN_ON}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.DONE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  containerOption: {
    padding: 5
  },
  title: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 30
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: colors.black,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    width: 100
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
    textAlign: "center"
  },
  switch: {
    alignSelf: "center"
  }
});
