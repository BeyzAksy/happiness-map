/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Root from './src/Root';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Root />
      </View>
    );
  }
}
