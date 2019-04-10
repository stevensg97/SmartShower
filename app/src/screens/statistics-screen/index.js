import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { colors } from '../../config/styles';
import { SCREENS, BUTTONS, VALUES, PLACEHOLDERS } from '../../config/constants';

export default class Shower extends Component {
  static navigationOptions = {
    title: SCREENS.STATISTICS
  };

  constructor(props) {
    super(props);
    this.state = {
      initialDate: '',
      finalDate: '',
      dateLiters: '25',
      todayLiters: ''
    };
  }

  _onWaterConsumptionByDatePressed = async () => {
    Alert.alert(
      VALUES.WATER_CONSUMPTION,
      this.state.dateLiters+VALUES.LITERS,
      [{ text: BUTTONS.OK, onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{VALUES.WATER_CONSUMPTION}</Text>
          <DatePicker
            style={styles.datePicker}
            date={this.state.initialDate}
            mode={VALUES.DATE}
            placeholder={PLACEHOLDERS.INITIAL_DATE}
            format={VALUES.DATE_FORMAT}
            minDate={VALUES.MIN_DATE}
            maxDate={VALUES.MAX_DATE}
            confirmBtnText={BUTTONS.CONFIRM}
            cancelBtnText={BUTTONS.CANCEL}
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput
            }}
            onDateChange={date => {
              this.setState({ initialDate: date });
            }}
          />
          <DatePicker
            style={styles.datePicker}
            date={this.state.finalDate}
            mode={VALUES.DATE}
            placeholder={PLACEHOLDERS.FINAL_DATE}
            format={VALUES.DATE_FORMAT}
            minDate={VALUES.MIN_DATE}
            maxDate={VALUES.MAX_DATE}
            confirmBtnText={BUTTONS.CONFIRM}
            cancelBtnText={BUTTONS.CANCEL}
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput
            }}
            onDateChange={date => {
              this.setState({ finalDate: date });
            }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onWaterConsumptionByDatePressed}
          >
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
  datePicker: {
    width: 175,
    alignSelf: "center",
    margin: 5
  },
  dateIcon: {
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 36,
    marginRight: 36,
    borderRadius: 15
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
