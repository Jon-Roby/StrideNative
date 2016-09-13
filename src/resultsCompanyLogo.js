import React, { Component } from 'react';
import {
  AsyncStorage,
  Navigator,
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  Image
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

class ResultsCompanyLogo extends Component {
  constructor(props) {
    super(props);
  }

  renderScene() {

  }

  render() {
    if (this.props.company === 'Lyft') {
      return (
        <Image
          style={{width: 40, height: 40, borderRadius: 3}}
          source={require('../assets/lyft_icon_2.png')}
        />
      );
    }
    if (this.props.company === 'Uber') {
      return (
        <Image
          style={{width: 40, height: 40}}
          source={require('../assets/uber_icon.png')}
        />
      );
    }
  }
}

export default ResultsCompanyLogo;
