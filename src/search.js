import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Navigator,
  TextInput,
  TouchableHighlight,
  StyleSheet } from 'react-native';

import { InputGroup, Input, ListItem, List} from 'native-base';

import {
  UBER_ROOT_URL,
  LYFT_ROOT_URL,
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
  UBER_SERVER_TOKEN,
  GOOGLE_MAPS_ROOT_URL
} from './config';


import SearchHeader from './search_header';
import Results from './results';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Search',
      startLocation: '',
      endLocation: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <SearchHeader />

        <View style={styles.searchContainer}>

          <View>
            <Text style={styles.bigText}>Find the lowest price for your travel among ride sharing apps like Uber and Lyft</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.startLocation}
              onChangeText={(text) => this.setState({ startLocation: text})}
              placeholder="  Your current location"
              style={styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.endLocation}
              onChangeText={(text) => this.setState({ endLocation: text})}
              placeholder="   Your destination" />
          </View>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                title: 'Results',
                component: Results,
                passProps: {
                  startLocation: this.state.startLocation,
                  endLocation: this.state.endLocation
                }
              })
            }}><Text style={styles.buttonText}>Search</Text></TouchableHighlight>

        </View>

      </View>
    );
  }
}

// <View style={styles.banner}>
//   <View><Text style={styles.bannerText}></Text></View>
// </View>

let width = Dimensions.get('window').width * .8;
let height = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({


  searchContainer: {
    height: height,
    width: width,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },

  bigText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 30,
    color: '#d3dcde',
    marginBottom: 40
  },

  input: {
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    borderColor: '#ecf0f1',
  },

  inputContainer: {
    paddingBottom: 20
  },

  searchPrompt: {
    color: '#d6dfe1',
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 30,
    lineHeight: 50
  },

  button: {
    backgroundColor: '#21ce99',
    width: width,
    alignSelf: 'center',
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontFamily: 'AvenirNext-DemiBold',
    color: 'white',
    fontSize: 16
  }
});

export default Search;
