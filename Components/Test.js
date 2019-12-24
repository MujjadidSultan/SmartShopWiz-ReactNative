import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

 
  render() {
   return(
     <View>
       <NumericInput type='up-down' onChange={value => console.log(value)} />
     </View>
   )
  }

 
}