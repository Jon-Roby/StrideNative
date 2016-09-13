import React, { Component } from 'react';
import {
  AsyncStorage,
  Navigator,
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import {
  Spinner,
  Text,
  View,
  Content,
  Container,
  Header,
  Title,
  Button,
  Icon,
  InputGroup,
  Input,
  ListItem,
  List,
  Radio,
  CheckBox,
  Thumbnail,
  Card,
  CardItem,
  H3
} from 'native-base';

import Search from './search';
import Results from './results';

import {
  UBER_ROOT_URL,
  LYFT_ROOT_URL,
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
  UBER_SERVER_TOKEN,
  GOOGLE_MAPS_ROOT_URL
} from './config';

class AppNavigator extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.getLyftToken();
  }

  async getLyftToken() {
    try {
      let response = await fetch('https://api.lyft.com/oauth/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+btoa(`${LYFT_CLIENT_ID}:${LYFT_CLIENT_SECRET}`)
        },
        body: JSON.stringify({
          'grant_type': "client_credentials",
          'scope': "public"
        })
      });

      let responseJson = await response.json();
      await AsyncStorage.setItem('token', responseJson.access_token);
    } catch(error) {
      console.error(error);
    }
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{
          component: Search,
          title: 'Search'
        }}
        style={styles.navigation}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    flex: 1
  }
});


export default AppNavigator;
