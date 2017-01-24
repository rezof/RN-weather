import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {TabView} from './src';

export default class weather extends Component {
  render() {
    return (
        <TabView />
    )
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('weather', () => weather);
