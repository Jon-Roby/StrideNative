import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,

  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import {
  Spinner,
  ListItem,
  List
} from 'native-base';

import {
  UBER_ROOT_URL,
  LYFT_ROOT_URL,
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
  UBER_SERVER_TOKEN,
  GOOGLE_MAPS_ROOT_URL
} from './config';

import ResultsCompanyLogo from './resultsCompanyLogo';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Results',
      rides: [{"company":"Uber","type":"POOL","currency":"USD","minPrice":null,"maxPrice":7},{"company":"Uber","type":"TAXI","currency":null,"minPrice":null,"maxPrice":null},{"company":"Lyft","type":"Lyft Line","currency":"USD","minPrice":"6.00","maxPrice":"6.00"},{"company":"Uber","type":"uberX","currency":"USD","minPrice":7,"maxPrice":14},{"company":"Uber","type":"ASSIST","currency":"USD","minPrice":7,"maxPrice":14},{"company":"Uber","type":"uberXL","currency":"USD","minPrice":9,"maxPrice":20},{"company":"Uber","type":"WAV","currency":"USD","minPrice":9,"maxPrice":26},{"company":"Lyft","type":"Lyft","currency":"USD","minPrice":"9.57","maxPrice":"15.75"},{"company":"Uber","type":"SELECT","currency":"USD","minPrice":11,"maxPrice":30},{"company":"Lyft","type":"Lyft Plus","currency":"USD","minPrice":"14.10","maxPrice":"21.75"},{"company":"Uber","type":"BLACK","currency":"USD","minPrice":15,"maxPrice":39},{"company":"Uber","type":"SUV","currency":"USD","minPrice":25,"maxPrice":50}]
    }
  }

  componentDidMount() {
    // this.props.startLocation;
    // this.props.endLocation;

    //this.getEstimates();
  }

  async fetchUber() {
    let sLat = 37.777506;
    let sLng = -122.407620;
    let eLat = 37.767372;
    let eLng = -122.452966;
    try {
      let response = await fetch(`${UBER_ROOT_URL}start_latitude=${sLat}&start_longitude=${sLng}&end_latitude=${eLat}&end_longitude=${eLng}&server_token=${UBER_SERVER_TOKEN}`, {
        headers: {
          'Authorization': `Token ${UBER_SERVER_TOKEN}`
        }
      });
      let responseJSON = await response.json();
      let uberEstimates = responseJSON.prices.map(car => {
        return {
          company: "Uber",
          type: car.display_name,
          currency: car.currency_code,
          minPrice: car.minimum,
          maxPrice: car.high_estimate
        }
      }).sort((left, right) => { return left.minPrice - right.minPrice });

      return uberEstimates;
    } catch(error) {
      console.error(error);
    }
  }

  async fetchLyft() {
    let sLat = 37.777506;
    let sLng = -122.407620;
    let eLat = 37.767372;
    let eLng = -122.452966;

    try {
      const LYFT_BEARER_TOKEN = await AsyncStorage.getItem('token');
      let response = await fetch(`${LYFT_ROOT_URL}start_lat=${sLat}&start_lng=${sLng}&end_lat=${eLat}&end_lng=${eLng}`, {
        headers: {
          'Authorization': `Bearer ${LYFT_BEARER_TOKEN}`
        }
      });
      let responseJSON = await response.json();

      let lyftEstimates = responseJSON.cost_estimates.map(car => {
        return {
          company: "Lyft",
          type: car.display_name,
          currency: car.currency,
          minPrice: (car.estimated_cost_cents_min/100).toFixed(2),
          maxPrice: (car.estimated_cost_cents_max/100).toFixed(2)
        }
      }).sort((left, right) => { return left.minPrice - right.minPrice });

      return lyftEstimates;
    } catch(error) {
      console.error(error);
    }
  }

  async getEstimates() {
    let lyftEst = await this.fetchLyft();
    let uberEst = await this.fetchUber();

    const rides = [...uberEst, ...lyftEst].sort((left, right) => {
      return left.minPrice - right.minPrice
    });

    this.setState({ rides });
  }

  renderRides() {
    return this.state.rides.map(ride => {
      return (
        <ListItem style={styles.listItem} key={ride.type}>
          <View style={styles.textContainer}>
            <View style={styles.textContainerLeft}>
              <ResultsCompanyLogo company={ride.company} />
              <Text style={styles.listText}>   {ride.type}</Text>
            </View>
            <Text style={styles.listText}>{ride.minPrice}</Text>
          </View>
        </ListItem>
      )
    });
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerSpace}></View>
          <View style={styles.header}>

            <TouchableHighlight onPress={() => this.props.navigator.pop()}>
              <Text style={styles.headerTitle}>Back</Text>
            </TouchableHighlight>
            <Text style={styles.headerTitle}>Results</Text>
            <Text style={styles.headerTitle}></Text>
          </View>
        </View>

        <List>
          {this.renderRides()}
        </List>
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
    height: 20
  },
  header: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0,

    color: '#21ce99',
    fontSize: 18
  },

  space: {
    height: 20,
    backgroundColor: 'red'
  },
  listItem: {
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  textContainerLeft: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  listText: {
    fontFamily: 'AvenirNext-Regular',
    color: '#484848',
    alignSelf: 'center',
    fontSize: 16
  },
});

export default Results;
