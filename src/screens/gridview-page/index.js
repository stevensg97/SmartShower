import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import IconLogo from '../../assets/logo.png';
import IconSettings from '../../assets/settings.png';

const images = [IconLogo, IconSettings];
const options = ['Smart Shower', 'Settings'];
const optionsScreens = ['Shower', 'Settings'];

export default class GridViewPage extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor() {
        super();
        this.state = {
            dataSource: {},
        };
    }
    componentDidMount() {
        let items = Array.apply(null, Array(2)).map((v, i) => {
            return { id: i, src: images[i], option: options[i], optionScreen: optionsScreens[i] };
        });
        this.setState({
            dataSource: items,
        });
    };

    _onOptionPressed = (screen) => {
        return this.props.navigation.navigate(screen);
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <TouchableOpacity onPress={() => this._onOptionPressed(item.optionScreen)}>
                                <Image style={styles.imageThumbnail} source={item.src} />
                                <Text style={styles.optionText}>{item.option}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 8,
    },
    mainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#ffffff',
    },
    optionText: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000000",
    },
});