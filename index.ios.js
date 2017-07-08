/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Pages } from 'react-native-pages';


var host = "http://localhost:8080/" 
var isDebug = true; // false if running in production mode


function addRawData(rawData_doc){

}

export default class Prototype1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true
    }
  }


  componentDidMount(){
    var dataPath = "getAllDataforUser/1";

    if (isDebug == false){
      host = "https://rocky-lake-67126.herokuapp.com/"
    }

    return fetch(host + dataPath, {method: "GET"})
      .then((response) => 
          response.json()
          // {
          //   console.log("got the data");
          //   this.setState({
          //     dataSource : {status: response.json()},
          //     isLoading : false
          //   })
          // }    
      ) 
      .then((responseJson)=> {
        var dataJson = responseJson;
        console.log("got the data");
        console.log(dataJson);
        this.setState({
          dataSource : {"status" : dataJson },
          isLoading : false
        })
      })
      .catch((error) => {
        console.error(error);
      })

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    var data = this.state.dataSource.status;
    var devices = data.device_docs;

    console.log(data);

    var viewPages = [];

    for(let i = 0; i < devices.length; i++){
      viewPages.push(
        <View key={i} style={styles.container}>
          <Text style={styles.welcome}>
            {devices[i].device_data[0].rawData_doc[0].NH3}
          </Text>
          <Text style={styles.instructions}>
            {devices[i].device_data[0].msg}
          </Text>
          <Text style={styles.instructions}>
            {devices[i].device_id}
          </Text>
        </View>
      )
    }

    return (
      <Pages>
         {viewPages}                 
      </Pages>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Prototype1', () => Prototype1);
