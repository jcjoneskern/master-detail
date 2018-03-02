import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }

    static navigationOptions = {
        title: 'r/aww'
    };

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
        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color='orangered' size='large' />
                </View>
            );
        }

        return (
            <View>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => 
                        <Text style={styles.listItem} onPress={() => navigate('Detail', { id: item.data.id, img: item.data.thumbnail, title: item.data.title })}>
                            {item.data.title}
                        </Text>}
                    keyExtractor={(post, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});