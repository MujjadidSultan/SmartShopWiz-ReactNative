import React from 'react';
import { StyleSheet, Header,Text, View, Button } from 'react-native';
//import App from './AppNavigator';
import AppNav from './AppNavigator';


export default class App extends React.Component {
  render() {
    return (
      <AppNav/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
