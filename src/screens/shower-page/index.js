import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Shower extends Component {
    static navigationOptions = {
        title: 'Smart Shower',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOption}>
                    <Text style={styles.title}>Water Level</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>25%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>50%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>75%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>100%</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerOption}>
                    <Text style={styles.title}>Soap</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerOption}>
                    <Text style={styles.title}>Water temperature</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Cold</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Warm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Hot</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerOption}>
                    <Text style={styles.title}>Turn on the shower?</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>No</Text>
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
        margin: 5,
        width: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    containerOption: {
        padding: 5
    },
    title: {
        color: "#000000",
        fontSize: 30,
        alignSelf: 'center',
    },
});
