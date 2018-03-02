import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Master from './Master';
import Detail from './Detail';

const RootStack = StackNavigator({
  Master: { screen: Master },
  Detail: { screen: Detail }
});

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}