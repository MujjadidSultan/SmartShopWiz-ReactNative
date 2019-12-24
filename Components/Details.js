import React from 'React';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { proddetails, userHistory } from './UserFunctions';

class Details extends React.Component {

  static navigationOptions = {
    title: 'Scan Product QR Code For Details',
    headerStyle: { backgroundColor: 'skyblue' },
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
  }

  constructor(props) {
    super(props);

    this.state ={
      hasCameraPermission: null,
      scannedProductId: '',

      scanned: '',
      product: [],
      search: ''
    //  product_name: ''
  }

  }

  saveSearch() {
    console.log(this.state.search);

    userHistory(this.state.search).then(data => {
      console.log(data)
    })
  }


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
        if (result.data !== this.state.scannedProductId) {
         
        //  console.log(result.data);
          this.setState({ scannedProductId: result.data}, () =>  
         // this.props.navigation.navigate('ProductDetails', {scanned: this.state.scannedProductId}));

         this.gettingDetails());
       //   
    
      }
    };

        gettingDetails() {
          const prod = {
            product_id: this.state.scannedProductId
          };
          
          proddetails(prod).then (data => {
            this.setState({product: data[0]}, () => this.setState({product_name: this.state.product.product_name, search: this.state.product.product_id}, ()=> this.saveSearch()));
            
           // console.log('Product')
          

          }).catch(err => {
            console.log(err)
        });

        };

   /*     close() {
          this.setState({product: []});
          this.forceUpdate();
        } */

        
    render () {

        return (
            <View style={styles.container}>

              <View style= {{width: '90%', alignSelf: 'center'}}>
                <TouchableOpacity style= {{width: '60%', height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 30}}
                  onPress={()=> this.props.navigation.navigate('Estimate')}>
                  <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>VIEW ESTIMATED BILL</Text>
                </TouchableOpacity>
              </View>
            
                {this.state.hasCameraPermission === null
                ? <Text>Requesting for camera permission</Text>
                : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                Camera permission is not granted
                </Text>
                    : <BarCodeScanner
                        onBarCodeScanned={this._handleBarCodeRead}
                        style={{height: '70%', width: Dimensions.get('window').width, alignSelf:'center'}}
      
                      >

                     {this.state.product.length !== 0 && (
                     <View style= {{width: '60%', height: '40%', alignSelf: 'center', alignContent: 'center', marginTop: 15, /*backgroundColor: 'rgba(3, 169, 244, 0.3)'*/}}>
                            <Text style={{color: 'skyblue', fontSize: 18, fontWeight: 'bold', marginLeft: '10%'}}>Product:  {this.state.product.product_name}</Text>
                            <Text style={{color: 'skyblue', fontSize: 18, fontWeight: 'bold', marginLeft: '10%'}}>Availability: {this.state.product.status.toLowerCase() == 'available' && (<Text>In Stock</Text>)} {this.state.product.status.toLowerCase() !== 'available' && (<Text>Out Of Stock</Text>)}</Text>
                            <Text style={{color: 'skyblue', fontSize: 18, fontWeight: 'bold', marginLeft: '10%'}}>Price: Rs.{this.state.product.price}</Text>
                            <TouchableOpacity onPress = {()=> {this.props.navigation.navigate('ProductDetails', {product: this.state.product})}} style= {{marginTop: 15, width: '70%', height: 30, alignSelf: 'center', backgroundColor: 'skyblue', borderWidth: 1, borderRadius: 15, borderColor: 'lightgray'}}>
                              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15, justifyContent: 'center', textAlignVertical: 'center', textAlign: 'center'}}>View Details</Text>
                            </TouchableOpacity>
                          
                      </View>
                      )} 
                </BarCodeScanner>}  
     
            </View>            

            )

    }    
   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    }

})

export default Details;