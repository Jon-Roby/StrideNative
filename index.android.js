/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
