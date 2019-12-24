import React from 'React';
import {Text, View, StyleSheet, FlatList, ScrollView, Image, AsyncStorage, TouchableOpacity} from 'react-native';
//import DialogInput from 'react-native-dialog-input';
import { Rating } from 'react-native-ratings';
import NumericInput from 'react-native-numeric-input';

import {Dropdown} from 'react-native-material-dropdown';
import { onReserve, userHistory } from './UserFunctions';

import jwt_decode from 'jwt-decode';


const add = 'http://yourip:5000/products/'


class Product extends React.Component {

    static navigationOptions = {
        title: 'Product Details And Reservation',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
      }


    constructor(props) {
        super(props);

        this.state ={
            product_id : this.props.navigation.getParam('prod_id'),
            prod_name: this.props.navigation.getParam('prod_name'),
            prod_price: this.props.navigation.getParam('prod_price'),
            prod_avail: this.props.navigation.getParam('prod_status'),
            prod_desc: this.props.navigation.getParam('prod_description'),
            prod_quantity: this.props.navigation.getParam('prod_quantity'),
            prod_ratings: parseInt(this.props.navigation.getParam('prod_rating')),
            prod_category: this.props.navigation.getParam('prod_category'),
            prod_image: this.props.navigation.getParam('prod_image'),

            isDialogVisible: false,
            reserved_quantity: 1,
            reservation_date: '',
            reserved_time: '',

            success: '',

            customer_id: '',

            quan: false,

            all: '',

            all2: '',

            cart: 'closed',

            cart_quantity: 1,

            search: this.props.navigation.getParam('prod_id')
            
        }
    }

    saveSearch() {
      console.log(this.state.search);

      userHistory(this.state.search).then(data => {
        console.log(data)
      })
    }

   
   /****************USE WITH BACKEND**********************/

    componentWillMount() {
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                // We have data!!
             //   console.log(value);
                const decoded= jwt_decode(value);
                console.log(decoded);
              //  console.log(decoded.identity.address.city);

                this.setState({customer_id: decoded.identity.customer_id})
               
                console.log(this.state.customer_id);
              }
            } catch (error) {
              // Error retrieving data
            }
          };
  
            _retrieveData();

            this.saveSearch();

           
    } 
    


    reserve_prod() {

      this.setState({quan: false});

      const res_prod = {
        product_id: this.state.product_id,
        customer_id: this.state.customer_id,
        reserved_quantity: this.state.reserved_quantity.toString(),
      //  reservation_date: this.state.reservation_date,
        reserved_time: parseInt(this.state.reserved_time),
      //  reservation_date: (new Date().getDate() + "/" + (parseInt(new Date().getUTCMonth()) + 1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes())
            
      }

      onReserve(res_prod).then(data => {
          if (data) {
              this.setState({success: 'Product Reserved!'});
             
          }

          else {
              this.setState({success: 'Product Reservation Failed'})
          }
      }).catch(err => {
        console.log(err)
      })
     }

     close() {
      this.forceUpdate();
    }

      cart_prod(){
        alert('Added')
      }
    
   
    

    render () {

      let data = [{value: '1'},
      {
        value: '15',
      }, {
        value: '30',
      }, {
        value: '45',
      }, {
        value: '60'
      }
    ];

        return (
            <ScrollView>

                  {/*  <View>
                    <DialogInput isDialogVisible={this.state.isDialogVisible}
                        title={"Quantity Of The Product To Reserve"}
                      //  message={"Message for DialogInput #1"}
                        hintInput ={"Enter Quantity Here (1, 2, 3, etc.)"}
                        submitInput= {(value)=>{this.reserve_prod(value)}}
                        textInputProps= {{keyboardType: "numeric"}}
                        closeDialog={ () => {this.setState({isDialogVisible : false})}}>
                    </DialogInput>
                  </View> */}

                    <View style= {{width: '90%', alignSelf:'center', marginTop:20}}>

                    {!!this.state.all && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 15}}>{this.state.all}</Text>)} 

                    {!!this.state.all2 && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 15}}>{this.state.all2}</Text>)} 

                        <Text style= {{fontSize: 20, fontWeight: 'bold', alignSelf:'center'}} numberOfLines={1}>{this.state.prod_name}</Text>
                    </View>

                    <View style= {{width: '90%', alignSelf:'center', marginTop:20}}>
                    <Rating
                      readonly={true}
                      startingValue={this.state.prod_ratings}
                      ratingCount={5}
                      imageSize={40}
                    //  onFinishRating={(rating)=> {const obj = {'product_id': item.product_id, 'rating' : rating} ; this.state.ratings.push(obj); console.log(this.state.ratings);}}
                      />
                    </View>

                    {this.state.prod_quantity > 5 && this.state.quan === false && (

                    <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                        <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                         onPress = {() => {this.setState({quan: true})}}>
                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>RESERVE</Text>
                         </TouchableOpacity>
                    </View>

                    )}

                    {this.state.quan === true && (
                      <View style= {{borderWidth: 2, borderColor: 'lightgray', margin: 5}}>
                          {/*<TextInput placeholder= 'Quantity To Reserve' style= {{height: 40, width: '60%', alignSelf: 'center', backgroundColor: 'white', borderWidth: 2, borderColor: 'lightgray', marginTop: 10, borderTopWidth: 2, textAlign: 'center', justifyContent: 'center'}} onChangeText = {(val)=> {this.setState({reserved_quantity : val, all: ''}), console.log(val)}}></TextInput>*/}
                        <View style={{flex: 1, flexDirection: 'row', height: 40, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 10}}>
                          <Text style={{alignSelf:'center', fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center'}}>Quantity To Reserve: </Text>
                          <NumericInput type='up-down' editable= {false} totalWidth={100} totalHeight={40} rounded= {true} value={this.state.reserved_quantity} upDownButtonsBackgroundColor= 'skyblue' onChange={value => this.setState({reserved_quantity: value}, ()=> console.log(this.state.reserved_quantity))} minValue={1} maxValue={parseInt(this.state.prod_quantity)-5} />
                          
                        </View>
                          
                        <View style={{width: '80%', alignSelf:'center', marginTop: 2}}>
                          <Dropdown
                            label={'--Select Reservation Time (in minutes)--'}
                            bgColor={'white'}
                            containerStyle= {{backgroundColor: 'white'}}
                            tintColor={'#666666'}
                            activityTintColor={'green'}
                            // arrowImg={}      
                            // checkImage={}   
                            // optionTextStyle={{color: '#333333'}}
                            // titleStyle={{color: '#333333'}} 
                            // maxHeight={300} 
                            onChangeText= {(value)=> this.setState({reserved_time: value, all: ''})}
                            data={data}
                          >
                          </Dropdown>

                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                            onPress= {() => { 
                              if (this.state.prod_quantity !== "" && this.state.reserved_time !== "") {
                              this.reserve_prod()
                              }
                              else {
                                this.setState({all: 'Please Provide Complete Reservation Details'})
                              }
                            }}>

                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>OKAY</Text>
                          </TouchableOpacity>
                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                           onPress={()=> {this.setState({quan: false, reserved_quantity: 1, reserved_time: ''})}}>

                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>CANCEL</Text>
                          </TouchableOpacity>
                        </View>

                        </View>
                    )}

                   

                  {this.state.prod_quantity <= 5  && (
                       <View style= {{width: '90%', alignSelf:'center', marginTop:20}}>
                         <Text style= {{fontSize: 15, fontWeight: 'bold', alignSelf:'center'}}>Insufficient Quantity For Reservation</Text>
                      </View>
                  )}

                    { /*this.state.cart== 'closed' && (
                      <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                        <TouchableOpacity style= {{width: '60%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                          onPress = {() => {this.setState({cart: 'opened'})}}>
                          <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>ADD TO BILL ESTIMATION</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {this.state.cart== 'opened' && (
                      <View style= {{borderWidth: 2, borderColor: 'lightgray', margin: 5}}>
                        <Text style={{color: 'blue', fontSize: 12, fontWeight: 'bold', alignSelf:'center'}}>*Ths is for total bill estimation only. It is not your shopping cart.</Text>
                        <View style={{flex: 1, flexDirection: 'row', height: 40, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 10}}>
                          <Text style={{alignSelf:'center', fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center'}}>Quantity To Add: </Text>
                          <NumericInput type='up-down' editable= {false} totalWidth={100} totalHeight={40} rounded= {true} value={this.state.cart_quantity} upDownButtonsBackgroundColor= 'skyblue' onChange={value => this.setState({cart_quantity: value}, ()=> console.log(this.state.cart_quantity))} minValue={1} maxValue={parseInt(this.state.prod_quantity)} /> 
                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                            onPress= {() => { 
                              if (this.state.cart_quantity !== "") {
                                this.cart_prod()
                              }
                              else {
                                this.setState({all2: 'Please Choose A Quantity To Add To Cart'})
                              }
                            }}>

                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>OKAY</Text>
                          </TouchableOpacity>
                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                           onPress={()=> {this.setState({cart: 'closed', cart_quantity: 1})}}>

                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>CANCEL</Text>
                          </TouchableOpacity>
                        </View>
                      
                      </View>
                          )*/}

                {!!this.state.success && (<Text style={{ color: "blue" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.success}</Text>)}

               {/*  {!!this.state.reservation_date && (<Text style={{ color: "lightgray" , fontSize:10, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.reservation_date}</Text>)}

                    {!!this.state.reserved_time && (<Text style={{ color: "lightgray" , fontSize:10, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.reserved_time}</Text>)} */} 

                    <View style= {{marginTop: 20, borderBottomWidth: 2, borderColor: 'lightgray', borderTopWidth: 2, height: 300}}>
                        <Image
                            style= {{width: '80%', height: '95%', alignSelf: 'center', marginBottom: 10, marginTop: 10}}
                            source= {{uri : add+ this.state.prod_image}}
                        >
                        </Image>
                    </View>

                    <View style= {{marginTop:20, borderBottomWidth: 2, borderColor: 'lightgray'}}>

                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Price: <Text style= {{fontWeight:'normal'}}>{this.state.prod_price}</Text></Text>
                            <Text>         </Text>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Availability: {this.state.prod_avail.toLowerCase() == 'available' && (<Text style= {{fontWeight:'normal'}}> In Stock</Text>)} {this.state.prod_avail.toLowerCase() !== 'available' && (<Text style= {{fontWeight:'normal'}}> Out Of Stock</Text>)}</Text>
                        </View>

                        <View style= {{marginTop:10, marginBottom: 20}}>
                            <Text style= {{fontWeight:'bold', alignSelf: 'center', fontSize: 15}}>Product Details/Description </Text>
                            <Text style={{width: '90%', alignSelf:'center'}}>{this.state.prod_desc}</Text>
                        </View>

                    </View>

                   {/* <View style={{width: '90%', alignSelf:'center', marginTop: 20}}>
                        <Text style= {{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>Reviews</Text>
                        <FlatList
                            data= {this.state.prod_reviews}
                            renderItem={({item}) => <View style={styles.item}><Text style= {{fontSize: 15, fontWeight:'bold'}}>{item.username}</Text>
                            <Text style={{fontSize: 12, color: 'lightgray'}}>{item.date}  {item.time}</Text>
                            <Text style= {{marginTop: 10}}>{item.review}</Text></View>}
                        />
                </View> */}

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    item: {
      padding: 10,
     // fontSize: 18,
    //  height: 44,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      fontWeight: 'bold'
    },
  })

export default Product;