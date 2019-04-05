import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Shower extends Component {
    static navigationOptions = {
        title: 'Settings',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOption}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Language</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Usage Statistics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>About</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#000000',
        paddingVertical: 5,
        borderRadius: 15,
        margin: 20,
        width: 150,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    containerOption: {
        padding: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        color: "#000000",
        fontSize: 30,
        alignSelf: 'center',
    },
});
