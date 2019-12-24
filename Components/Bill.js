import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

class Bill extends Component {

  static navigationOptions = {
    title: 'Scan QR Code For Confirmation',
    headerStyle: { backgroundColor: 'skyblue' },
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
  }

  state = {
    hasCameraPermission: null,
    scannedInvoiceId: null,
    scanned: ''
  };


  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  


  _handleBarCodeRead = result => {
    if (result.data !== this.state.scannedInvoiceId) {
      LayoutAnimation.spring();
      this.setState({ scannedInvoiceId: result.data});

      this.props.navigation.navigate('PurchaseConfirmed', {scanned: result.data})
       
   }
  };

  

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}
                  style={{height: '70%', width: Dimensions.get('window').width, alignSelf:'center'}}
      
                />}


                <StatusBar hidden />
      </View>
    );
  }


} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

export default Bill;