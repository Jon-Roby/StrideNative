import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SearchHeader extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerSpace}></View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>STRIDE</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'column',
    height: 70
  },
  headerSpace: {
    height: 30
  },
  header: {
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 8,

    color: '#21ce99',
    fontSize: 20
  }
});

export default SearchHeader;
