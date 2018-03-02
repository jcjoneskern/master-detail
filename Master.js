import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }

    componentDidMount() {
        return fetch('https://www.reddit.com/r/aww.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    posts: responseJson.data.children.slice(1)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => <Text>{item.data.title}</Text>}
                    keyExtractor={(post, index) => index}
                />
            </View>
        );
    }
}