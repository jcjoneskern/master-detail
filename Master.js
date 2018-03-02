import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }

    componentDidMount() {
        return fetch('https://www.reddit.com/r/aww.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let posts = responseJson.data.children.slice(1);

                this.setState({
                    isLoading: false,
                    posts
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
        <View>
            <Text>Master</Text>
        </View>
        );
    }
}