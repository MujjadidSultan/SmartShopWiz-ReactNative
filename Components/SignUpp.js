import React from "react";
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Slider, TouchableOpacity} from "react-native";
import RadioForm from 'react-native-simple-radio-button';

import { signup_customer } from './UserFunctions';
//import NumericInput from 'react-native-numeric-input';


var radio_props = [
  {label: 'MALE  ', value: 'Male' },
  {label: 'FEMALE', value: 'Female'}
];

class SignUpp extends React.Component {
    static navigationOptions = {
        title: 'SIGN UP',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontSize: 40, fontWeight: 'bold', marginLeft: '25%'},
        headerLeft: <View></View>
      } 

      constructor(props){
        super(props);

        this.state= {
    
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmpassword: '',
            phonenumber: '',
            age: 16,
            gender: 'Male',
            houseno: '',
            streetno: '',
            area: '',
            city: '',
            role: 'customer',
            username: '',
            errors: {},
           
            error: '',
            regerror: '',
            error2:'',
        
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
    
    

    render () {


        return (
        
            <ImageBackground
            style= {{width: '100%', height: '100%'}}
            resizeMode= {'cover'}
            source= {require('../images/signuppage.jpg')}
            >
         

            <View>
                 {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.error}</Text>)}

                 {!!this.state.regerror && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.regerror}</Text>)}

                 {!!this.state.error2 && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.error2}</Text>)}

                {!!this.state.ageError && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.ageError}</Text>)}
            </View>

            

            <View style = {{flex: 1, flexDirection: 'column'}}>

            <View style={{flex: 1, flexDirection: 'row', marginTop: '2%'}}>
                <View style={{width:'50%'}}>
                    <TextInput textContentType="name" style={styles.entry} placeholder= "First Name" onChangeText= {(val)=> this.setState({first_name: val})} />
                    <TextInput style={styles.entry} placeholder= "House Number" onChangeText= {(val)=> this.setState({houseno: val})}/>
                    <TextInput style={styles.entry} placeholder= "Area" onChangeText= {(val)=> this.setState({area: val})}/>
                    <TextInput keyboardType="phone-pad" textContentType="telephoneNumber" maxLength={11} style={styles.entry} placeholder= "Mobile Number (03xxxxxxxxx)" onChangeText= {(val)=> this.setState({phonenumber: val})}/>
                    <TextInput keyboardType="email-address" textContentType="emailAddress" style={styles.entry} placeholder= "Email" onChangeText= {(val)=>this.setState({email: val, regerror: null})}/>
                    <TextInput textContentType="password" style={styles.entry} secureTextEntry placeholder= "Password" onChangeText= {(val)=>this.setState({password: val, error2: null})} />
                    
               </View>

                <View style={{width:'50%'}}>
                   <TextInput textContentType="name" style={styles.entry} placeholder= "Last Name" onChangeText= {(val)=> this.setState({last_name: val})}/>
                   <TextInput  style={styles.entry} placeholder= "Street Number" onChangeText= {(val)=> this.setState({streetno: val})}/>
                   <TextInput textContentType="addressCity" style={styles.entry} placeholder= "City" onChangeText= {(val)=> this.setState({city: val})}/>
                    <TextInput style={styles.entry} keyboardType="number-pad" placeholder= "Age" onChangeText= {(val)=> this.setState({age: val})}/>
                   <TextInput textContentType="username"  style={styles.entry} placeholder= "Username" onChangeText= {(val)=> this.setState({username: val, regerror: null})}/>
                   <TextInput textContentType="password" style={styles.entry} secureTextEntry placeholder= "Re-enter Password" onChangeText= {(val)=>this.setState({confirmpassword: val, error2: null})}/>
                </View>

            </View>
     
            </View>

            <View style={{flex: 1, flexDirection: 'column'}}>

            <View style={{alignItems: 'center', marginTop: '5%'}}>
                    
             <RadioForm
               buttonColor= 'cornflowerblue'
               buttonSize={20}
               buttonOuterSize={30}
               labelStyle= {{fontSize: 20, fontWeight: 'bold'}}
               radio_props={radio_props}
               formHorizontal= {true}
               initial={0}
               onPress={(value) => {this.setState({gender:value})}}
            />
                 
            </View>
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
                
                        this.setState(() => ({ error: null }));
                        this.setState(() => ({ error2: null}));
                      
                        this.onSignUp()
                      
                      }}}>


               <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SIGN UP</Text>
               </TouchableOpacity>

              </View>   

              <Text style= {{ marginTop: '3%', alignSelf: 'center', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'}}>Already Have An Account?</Text>
             
              <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                    onPress= {()=> {this.props.navigation.navigate('LogIn')}}
                  >
                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>LOG IN</Text>
                  </TouchableOpacity>

                </View>
                    
             
            </View>

           

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
        width: '90%',
        height: '10%',
       // flexGrow: 1,
        alignSelf: 'center',
        marginTop: '10%',
        textAlign:'center'

    },

})

export default SignUpp;