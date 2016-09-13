/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
 * Kill any running react-native projects:
 * ps aux | grep react
 * kill <process>

 * To start project:
 * react-native init <project-name>
 * npm install native-vector-icons --save
 * npm install react-native-vector-icons --save
 * react-native link react-native-vector-icons
 * react-native run-ios
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './src/app_navigator';

class StrideNative extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}



AppRegistry.registerComponent('StrideNative', () => StrideNative);
