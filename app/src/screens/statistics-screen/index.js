import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DatePicker from 'react-native-datepicker';
import { colors, commonStyles } from "../../config/styles";
import { SCREENS, BUTTONS, VALUES } from "../../config/constants";

export default class Shower extends Component {
  static navigationOptions = {
    title: SCREENS.STATISTICS
  };

  constructor(props) {
    super(props);
    this.state = {
      initialDate: '',
      finalDate: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{VALUES.WATER_CONSUMPTION}</Text>
          <DatePicker
            style={{ width: 175, alignSelf: 'center', margin: 5 }}
            date={this.state.initialDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Initial date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                marginRight: 36,
                borderRadius: 15,
              }
            }}
            onDateChange={(date) => { this.setState({ initialDate: date }) }}
          />
          <DatePicker
            style={{ width: 175, alignSelf: 'center', margin: 5 }}
            date={this.state.finalDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Final date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                marginRight: 36,
                borderRadius: 15,
              }
            }}
            onDateChange={(date) => { this.setState({ finalDate: date }) }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              Alert.alert(
                VALUES.WATER_CONSUMPTION,
                '20 Liters',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              )}
          >
            <Text style={styles.buttonText}>
              {BUTTONS.PERCENTAGE50}
            </Text>
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
