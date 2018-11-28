import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Form from './components/Form';
import Map from './components/Map';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Scene key='Root'>
          <Scene
          key='Form'
          component={Form}
          hideNavBar
          initial
          />

          <Scene
            key='Map'
            component={Map}
            hideNavBar
          />

        </Scene>
      </Router>
    );
 }
}
