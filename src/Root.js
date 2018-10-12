import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

export default class Root extends Component() {
  render() {
    return (
      <Router>
        <Scene
        key='Root'>
          <Scene>
          key='Form'
          initial />
        </Scene>
      </Router>
    );
 }
}
