import React from "react";
import {View, Text, ScrollView, ImageBackground, TextInput, StyleSheet, Slider, TouchableOpacity } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import { signup_customer } from './UserFunctions';

var radio_props = [
  {label: 'Male  ', value: 'Male' },
  {label: 'Female', value: 'Female'}
];

var city_props = [
  {label: 'Islamabad  ', value: 'Islamabad' },
  {label: 'Rawalpindi', value: 'Rawalpindi'}
]

class SignUp extends React.Component {
    static navigationOptions = {
        title: 'SIGN UP',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
        headerLeft: <View></View>
      } 

      constructor(props){
        super(props);

        this.state= {
     //       screenHeight: height,
     //       array: ['a', 'b', 'c'],
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmpassword: '',
            phonenumber: '',
            age: 'Move Slider Below To Pick Age',
            gender: 'Male',
            houseno: '',
            streetno: '',
            area: '',
            city: 'Islamabad',
            role: 'customer',
            username: '',
            errors: {},
            //address:[],
           //address:{house: '', street:'', area:'' ,city:''},
            error: '',
            regerror: '',
            error2:'',
         //   errorreg: null,
            ageError: ''
         
        }
    }

    onSignUp() { 
       
        const newUser= {
            first_name: this.state.first_name.trim(),
            last_name: this.state.last_name.trim(),
            username: this.state.username.toLowerCase().trim(),
            email: this.state.email.toLowerCase().trim(),
            password: this.state.password.toLowerCase().trim(),
            confirmpassword: this.state.confirmpassword.toLowerCase().trim(),
            phonenumber: this.state.phonenumber.trim(),
            age: this.state.age.trim().toString(),
            gender: this.state.gender.trim(),
            houseno: this.state.houseno.trim(),
            streetno: this.state.streetno.trim(),
            area: this.state.area.trim(),
            city: this.state.city.trim(),
            role: this.state.role.trim()

        }

        signup_customer(newUser).then(data => {
          console.log(data)
          
          if (data == 'Customer Already Registered!') 
           {
             this.setState({regerror: 'Email Already Registered'})
           }

           else if (data == 'Username Already Taken!')
           {
             this.setState({regerror: 'Username Already Taken'})
           }

           else if (data == 'Email And Username')
           { 
               this.setState({regerror: 'Email And Username Already Taken'})
           }

           else 
           {
            this.setState({regerror: null})
            this.props.navigation.navigate('LogIn')
           }
          

        }).catch(err => {
          console.log(err)
        })
        
    } 

    checkAge(value) {
      this.setState({ageError: ''});

      if (value < 16){
        this.setState({ageError: 'Must Be 16 Or Older'})
      }
      else {
        this.setState({age: value});
      }

    }
    
    render() {

     

        return (
            <ImageBackground
              style= {{width: '100%', height: '100%'}}
              resizeMode= {'cover'}
              source= {require('../images/signuppage.jpg')}
            >
            
                <ScrollView>
                    <View>
                        {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.error}</Text>)}

                        {!!this.state.regerror && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.regerror}</Text>)}

                        {!!this.state.error2 && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.error2}</Text>)}

                        {!!this.state.ageError && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.ageError}</Text>)}
                    </View>
           
                    <View style= {{width: '70%', alignSelf: 'center', height: 850, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>
                        <View style= {{backgroundColor: 'skyblue', height: 30}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Basic Information</Text>
                        </View>
                        
                        <TextInput textContentType="name" style={styles.entry} placeholder= "First Name" placeholderTextColor='skyblue' onChangeText= {(val)=> this.setState({first_name: val})} />
                        <TextInput textContentType="name" style={styles.entry} placeholder= "Last Name" placeholderTextColor='skyblue' onChangeText= {(val)=> this.setState({last_name: val})}/>
                        <Text style= {{color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: 15, fontSize: 15}}>Age: {this.state.age}</Text>
                        <Slider
                            minimumValue={16}
                            maximumValue={90}
                            step={1}
                            onValueChange={(value)=> this.setState({age: value.toString()})}
                            minimumTrackTintColor='skyblue'
                            thumbTintColor='skyblue'
                            style={{marginTop: 10, width: 200, alignSelf: 'center'}}
                            trackStyle={{height: 50}}
                          
                        />
                        <View style= {{width: 200, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
                        <RadioForm
                          buttonColor= 'skyblue'
                          buttonSize={15}
                          buttonOuterSize={20}
                          labelStyle= {{fontSize: 15, fontWeight: 'bold', color: 'white'}}
                          containerStyle= {{alignSelf: 'center'}}
                          radio_props={radio_props}
                          formHorizontal= {true}
                          initial={0}
                          onPress={(value) => {this.setState({gender:value})}}
                        />
                        </View>

                        <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 15}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Contact Information</Text>
                        </View>

                        <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', marginTop: 5}}>
                          <TextInput style={styles.entryadd} placeholder= "House Number" placeholderTextColor='skyblue' onChangeText= {(val)=> this.setState({houseno: val})}/>
                          <View style={{width: 30}}></View>
                          <TextInput  style={styles.entryadd} placeholder= "Street Number" placeholderTextColor='skyblue' onChangeText= {(val)=> this.setState({streetno: val})}/>
                        </View>
                    
                        <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', marginTop: 5}}>
                          <TextInput style={styles.entryadd} placeholder= "Area" placeholderTextColor= 'skyblue' onChangeText= {(val)=> this.setState({area: val})}/>
                          <View style={{width: 30}}></View>
                          <View style= {{width: 125, marginTop: 10}}>
                          <RadioForm
                            buttonColor= 'skyblue'
                            buttonSize={15}
                            buttonOuterSize={20}
                            labelStyle= {{fontSize: 15, fontWeight: 'bold', color: 'white'}}
                            containerStyle= {{alignSelf: 'center'}}
                            radio_props={city_props}
                           // formHorizontal= {true}
                            initial={0}
                            onPress={(value) => {this.setState({city:value})}}
                        />
                        </View>
                        </View>

                        <TextInput keyboardType="phone-pad" textContentType="telephoneNumber" maxLength={11} style={{ borderColor: 'skyblue', backgroundColor:'white', borderRadius: 20, color:'black', borderWidth: 2, borderStyle: 'solid', width: 200, height: 40, alignSelf: 'center', marginTop: 20, textAlign:'center'}} placeholder= "Mobile Number (03xxxxxxxxx)" placeholderTextColor= 'skyblue' onChangeText= {(val)=> this.setState({phonenumber: val})}/>

                        <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 15}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Account Information</Text>
                        </View>
                        
                        <TextInput keyboardType="email-address" textContentType="emailAddress" style={styles.entry} placeholder= "Email" placeholderTextColor='skyblue' onChangeText= {(val)=>this.setState({email: val, regerror: null})}/>
                        <TextInput textContentType="username"  style={styles.entry} placeholder= "Username" placeholderTextColor='skyblue' onChangeText= {(val)=> this.setState({username: val, regerror: null})}/>
                        <TextInput textContentType="password" style={styles.entry} secureTextEntry placeholder= "Password" placeholderTextColor='skyblue' onChangeText= {(val)=>this.setState({password: val, error2: null})} />
                        <TextInput textContentType="password" style={styles.entry} secureTextEntry placeholder= "Re-enter Password" placeholderTextColor='skyblue' onChangeText= {(val)=>this.setState({confirmpassword: val, error2: null})}/>

                      <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                      <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress= {()=> { 

                          if (this.state.first_name.trim()=== "" || this.state.last_name.trim()=== "" || this.state.phonenumber.trim()===""
                          || this.state.email.trim()=== "" || this.state.houseno.trim()=== "" || this.state.streetno.trim()=== ""
                          || this.state.area.trim()=== ""|| this.state.city.trim()=== ""
                          || this.state.username.trim() === "" || this.state.password.trim() === "" || this.state.confirmpassword.trim() === ""
                          || this.state.age.trim() === "") {
                              this.setState(() => ({ error: "All Fields Are Required"}));
                            }

                          else if (this.state.password.trim() !== this.state.confirmpassword.trim())
                          {
                            this.setState(() => ({ error: null}));
                            this.setState(() => ({ error2: "The Two Password Fields Do Not Match"}))
                          }

                          else {
                      //       this.setState(() => ({address: [this.state.houseno, this.state.streetno, this.state.area, this.state.city]})
                              this.setState(() => ({ error: null }));
                              this.setState(() => ({ error2: null}));
                            //  this.state.address.push(this.state.houseno.toString(), this.state.streetno.toString(), 
                            //  this.state.area.toString(), this.state.city.toString())
                              this.onSignUp()
                            // this.props.navigation.navigate('LogIn') /*testing*/
                            }}}>


                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SIGN UP</Text>
                    </TouchableOpacity>

                    </View>   

                    <Text style= {{ marginTop: '3%', alignSelf: 'center', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', color: 'white'}}>Already Have An Account?</Text>
                  
                    <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                      <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                          onPress= {()=> {this.props.navigation.navigate('LogIn')}}
                        >
                          <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>LOG IN</Text>
                        </TouchableOpacity>

                      </View>
                    
                      <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 15}}>
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
        height: 40,
       // flexGrow: 1,
        alignSelf: 'center',
        marginTop: 10,
        textAlign:'center'

    },

    entryadd: {
      // flex: 1,
       borderColor: 'skyblue',
       backgroundColor:'white',
       borderRadius: 20,
       color:'black',
       borderWidth: 2,
       borderStyle: 'solid',
       width: 125,
       height: 40,
      // flexGrow: 1,
       alignSelf: 'center',
       marginTop: 10,
       textAlign:'center'

   }

})

export default SignUp;