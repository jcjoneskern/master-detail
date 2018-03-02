import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';

export default class Master extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: `Comments for ${params.title}`
        }
    };

    componentDidMount() {
        const { params } = this.props.navigation.state; 
        
        return fetch(`https://www.reddit.com/r/aww/comments/${params.id}.json`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    comments: responseJson[1].data.children.slice(1)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        }
        return (

            <View style={styles.container}>
                <View style={styles.imgStyle}>
                    <Image 
                        source={{uri: params.img}}
                        style={{ height: 140, width: 140 }}
                        resizeMode='contain' />
                </View>

                <View style={styles.list}>
                    <FlatList
                        data={this.state.comments}
                        renderItem={({ item }) => <Text style={styles.listItem}><Text style={styles.author}>{item.data.author}:</Text> {item.data.body}</Text>}
                        keyExtractor={(post, index) => index}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list : {
        flex: 3
    },
    listItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    author: {
        fontWeight: 'bold'
    },
    imgStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});