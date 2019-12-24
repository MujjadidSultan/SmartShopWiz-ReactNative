import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, FlatList, ScrollView} from 'react-native';

import jwt_decode from 'jwt-decode';
import { logout } from './UserFunctions';

class Account extends React.Component {

    static navigationOptions = {
        title: 'Smart ShopWiz',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontSize: 40, fontWeight: 'bold'},
        headerLeft: <View></View>
      }

      constructor(props){
          super(props);

          this.state ={

            loggedout: '',
            customer_id: ''
          }
      }

      onLogout() {

        logout().then(data=>{
            console.log(data)
        
        if (data == 'Logged Out') {

        _removeData = async () => {
            try {
              await AsyncStorage.removeItem('usertoken');
            } catch (error) {
              // Error saving data
            }
          };

          _removeData()
          this.props.navigation.navigate('LogIn')
          _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken')
              if (value == null) {
                  console.log('token cleared')
                
              }
            }
            catch (error) {
                // Error retrieving data
              }
            }

            _retrieveData()

        }

        });
        }

    /*********************USE WITH BACKEND**************************/

        componentWillMount() {
            _retrieveData = async () => {
                try {
                  const value = await AsyncStorage.getItem('usertoken');
                  if (value !== null) {
                   
                    const decoded= jwt_decode(value);
                    console.log(decoded);
                 
    
                    this.setState({customer_id: decoded.identity.customer_id})
                   
                    console.log(this.state.customer_id);
                  }
                } catch (error) {
                  // Error retrieving data
                }
              };
      
                _retrieveData();
        }

      /***************************************************************/  

    render () {
        return (
            <View>
                <View style= {styles.top}>

                    <View style= {{flex: 1, flexDirection: 'row', alignItems: 'stretch', borderRightWidth: 1, borderStyle: 'solid', borderColor: 'white'}}>

                        <View style= {{width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                                <Text style= {{color: 'white', fontWeight: 'bold', fontSize: 20}}>Home</Text>
                        </TouchableOpacity>
                        </View>

                        <View style= {{width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue'}}>
                            <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Account')}>
                                <Text style= {{color: 'white', fontWeight: 'bold', fontSize: 20}}>Account</Text>
                            </TouchableOpacity>
                        </View>    

                    </View>

                    </View>


                        <ScrollView>

                        
                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Profile'))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/signup.png')}/>   Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Reserved', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/reservedicon.png')}/>   Reserved Products</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Estimate', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/estimate.png')}/>   Estimated Bill</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Reviews', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/reviewsicon.png')}/>   Review Products</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Purchases', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/purchaseicon.png')}/>   Purchase History</Text>
                            </TouchableOpacity>
                        </View>
                        
                   {/*    <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Reviews', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/reviewsicon.png')}/>   Past Reviews</Text>
                            </TouchableOpacity>
                        </View> */}

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Complaints', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/complaintsicon.png')}/>   Submitted Complaints</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('NewComplaint', {customer_id: this.state.customer_id}))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/problemicon.png')}/>   Report A Problem</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('ChangePass'))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/passwordicon.png')}/>   Change Password</Text>
                            </TouchableOpacity>
                        </View>


                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.props.navigation.navigate('Help'))}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/helpicon.png')}/>   Help</Text>
                            </TouchableOpacity>
                        </View>

                        <View style= {styles.options}>
                            <TouchableOpacity onPress={()=> (this.onLogout())}>
                                <Text style= {styles.optionstext}><Image style= {styles.optionimage} source= {require('../images/logouticon.png')}/>   Log Out</Text>
                            </TouchableOpacity>
                        </View>

                        </ScrollView>
     
                </View>
               
                
        )
    }
}

const styles = StyleSheet.create({
    
    top: {
        // flex: 1,
        // flexDirection: 'horizontal',
         marginTop: '1%',
         backgroundColor: 'white',
         width: '100%',
         height: 50,
         //color: 'white',
         //backgroundColor: 'skyblue',
         borderBottomWidth: 1,
         borderBottomColor: 'white',
         borderStyle: 'solid'
     },

     options : {
        height: 70,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        borderStyle: 'dashed',
      //  justifyContent: 'center',
        textAlign:'left',
        marginLeft: 5

     },

     optionstext : {
        fontSize: 15, 
        fontWeight: 'bold',
        marginLeft: '5%',
        color: 'skyblue'
     },

     optionimage: {
        //marginBottom: 2,
        width: 30,
        height: 40
     }
})

export default Account;
