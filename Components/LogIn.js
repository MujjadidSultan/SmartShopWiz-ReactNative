import React from 'react';
import {Text, View, TextInput, StyleSheet, AsyncStorage, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { login } from './UserFunctions';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import jwt_decode from 'jwt-decode';

class LogIn extends React.Component {

  static navigationOptions = {
    title: 'LOG IN',
    headerStyle: { backgroundColor: 'skyblue'},
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},
    headerLeft: <View></View>
  }

        constructor(props){
            super(props);
    
            this.state= {
                email: '',
                password: '',
           //     username: '',
                errors: {},
                error: '',
                errorlog: null,
                id: ''
            }
        }

        

    onLogIn() {

      this.notificationsfunc() 

   /*   console.log(this.state.id + 'lol')

        const user = {
            email: this.state.email.toLowerCase().trim(),
            password: this.state.password.toLowerCase().trim(),
            device_id: this.state.id

        }

        login(user).then(data => {
          if (data =='Invalid username and password')
          {
              this.setState({errorlog: 'Invalid Email/Username/Password'})
          }

          else if (data == 'No results found')
          {
            this.setState({errorlog: 'Invalid Email/Username/Password'})
          }

          else {
          console.log('Log in success')

          _storeData = async () => {
            try {
              await AsyncStorage.setItem('usertoken', data);
            } catch (error) {
              // Error saving data
            }
          };

          _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                // We have data!!
                console.log(value);
                const decoded= jwt_decode(value);
                console.log(decoded);
              }
            } catch (error) {
              // Error retrieving data
            }
          };

          _storeData();
          _retrieveData();

          
          this.props.navigation.navigate('Home');
         
            }
          }).catch(err => {
            console.log(err)
        }) */

      }

     async notificationsfunc() {

        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }

        console.log(finalStatus)
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        this.setState({id: token}, ()=> console.log(this.state.id))

        console.log(this.state.id + 'lol')

        const user = {
            email: this.state.email.toLowerCase().trim(),
            password: this.state.password.toLowerCase().trim(),
            device_id: this.state.id

        }

        login(user).then(data => {
          if (data =='Invalid username and password')
          {
              this.setState({errorlog: 'Invalid Email/Username/Password'})
          }

          else if (data == 'No results found')
          {
            this.setState({errorlog: 'Invalid Email/Username/Password'})
          }

          else {
          console.log('Log in success')

          _storeData = async () => {
            try {
              await AsyncStorage.setItem('usertoken', data);
            } catch (error) {
              // Error saving data
            }
          };

          _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                // We have data!!
                console.log(value);
                const decoded= jwt_decode(value);
                console.log(decoded);
              }
            } catch (error) {
              // Error retrieving data
            }
          };

          _storeData();
          _retrieveData();

          
          this.props.navigation.navigate('Home');
         
            }
          }).catch(err => {
            console.log(err)
        })


        

      }

    render() {
      return(
        <ImageBackground
          style= {{width: '100%', height: '100%'}}
          resizeMode= {'cover'}
          source= {require('../images/login.jpg')}
        >

          <ScrollView>

          <View style={{marginTop: 20}}>

            {!!this.state.errorlog && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{this.state.errorlog}</Text>)}

            {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{this.state.error}</Text>)}

          </View>

          <View style= {{width: '70%', alignSelf: 'center', height: 400, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>

              <TextInput style= {styles.entry} keyboardType= "email-address" textContentType= "emailAddress" placeholder= "Email/Username" placeholderTextColor='skyblue' onChangeText= {(val)=>this.setState({email: (val), error: null, errorlog: null})} />

              <TextInput style = {styles.entry} textContentType= "password" placeholder= "Password" secureTextEntry placeholderTextColor='skyblue' onChangeText= {(val)=>this.setState({password: val,  error: null, errorlog: null})}/>

              <Text onPress={()=> this.props.navigation.navigate('Forgot')} style= {{marginTop: 15, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', color: 'white'}}> Forgot Password</Text>

              <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
               <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                  onPress= {() => {
                    if (this.state.email.trim()=== "" || this.state.password.trim() === "" ) {
                        this.setState(() => ({ error: "All Fields Are Required" }));
                      }

                    else {
                        this.setState(() => ({ error: null }));
                        this.setState(() => ({errorlog: null}))
                        this.onLogIn();
                      //  this.props.navigation.navigate('Home') /*testing*/
                      }
                    }
                  }>
                  
                  <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>LOG IN</Text>

                </TouchableOpacity>
              </View>

              <Text style= {{marginTop: 15, alignSelf: 'center', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', color: 'white'}}>Don't Have An Account?</Text>
              
              <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                    onPress= {()=> {this.props.navigation.navigate('SignUp')}}
                  >
                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SIGN UP</Text>
                  </TouchableOpacity>
                
              </View>

          </View>


          </ScrollView>

        </ImageBackground>
      )
    }


}

const styles = StyleSheet.create({
   


    entry: {
      // flex: 1,
       borderColor: 'skyblue',
       backgroundColor:'white',
       borderRadius: 20,
       color:'black',
       borderWidth: 2,
       borderStyle: 'solid',
       width: 200,
       height: 60,
      // flexGrow: 1,
       alignSelf: 'center',
       marginTop: 25,
       textAlign:'center',
       fontSize: 15

   },
  

});

export default LogIn;