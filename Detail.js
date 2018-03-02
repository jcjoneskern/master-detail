import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }

    render() {
        return (
        <View>
            <Text>Detail</Text>
        </View>
        );
    }
}