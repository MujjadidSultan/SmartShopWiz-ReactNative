import React from "react";
import {Text, View, AsyncStorage, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';

import {changepassword} from './UserFunctions';

import jwt_decode from 'jwt-decode';

class ChangePass extends React.Component {

    static navigationOptions = {
      title: 'CHANGE PASSWORD',
      headerStyle: { backgroundColor: 'skyblue' },
      headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: '20%'},
      headerLeft: <View></View> 
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            newpassword: '',
            confirmpassword: '',
            error: '',
            error2: '',
            passerror: '',
            matcherror:'',
            success: ''
        }

    }

    onPassword() {

        const changepasswordUser = {
          email: this.state.email,
          password: this.state.password,
          newpassword: this.state.newpassword
        }
  
        changepassword(changepasswordUser).then(data => {
          console.log(data.result);
          if (data.result == 'Password Not Changed') {
            console.log('error')
            this.setState({passerror: 'Old Password Is Incorrect'})
          }
  
          else{
            console.log('Success')
            this.setState({passerror: null, success: 'Password Changed. Please Wait.'})
            setTimeout(()=> {this.props.navigation.navigate('LogIn')}, 5000);
            }
        }).catch(err => {
        console.log(err)
      })
  
    }

    componentWillMount(){
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                console.log(value);
                const decoded= jwt_decode(value);
                console.log(decoded);
               

                this.setState({email: decoded.identity.email});
               
              }
            } catch (error) {
              
            }
          };
  
            _retrieveData();
        
    }

    render(){
        return(
            <ImageBackground
              style= {{width: '100%', height: '100%'}}
              resizeMode= {'cover'}
              source= {require('../images/forgot.jpg')}
            >
                  <View style={{alignItems:'center', justifyContent:'center', marginTop: '5%'}}>
                    {!!this.state.passerror && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.passerror}</Text>)}
                    
                    {!!this.state.error2 && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.error2}</Text>)}

                    {!!this.state.matcherror && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.matcherror}</Text>)}

                  </View>

                  <View style= {{width: '80%', alignSelf: 'center', height: 400, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>
                        <View style= {{backgroundColor: 'skyblue', height: 30}}>
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>FIll In The Fields Below To Reset Password</Text>
                        </View>

                <TextInput placeholderTextColor='skyblue' textContentType="password" style={styles.entry} secureTextEntry placeholder="Old Password" onChangeText= {(val)=> this.setState({password: val, passerror: null, error2: null})}/>

                <TextInput placeholderTextColor='skyblue' textContentType="password" style={styles.entry} secureTextEntry placeholder="New Password" onChangeText= {(val)=> this.setState({newpassword: val, error2: null, matcherror: null})}/>

                <TextInput placeholderTextColor='skyblue' textContentType="password" style={styles.entry} secureTextEntry placeholder="Re-enter Password" onChangeText= {(val)=> this.setState({confirmpassword: val, error2: null, matcherror: null})}/>

                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '80%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress={()=>{
                            if (this.state.password.trim()==="" || this.state.newpassword.trim()==="" || this.state.confirmpassword.trim()==="") {
                                this.setState(() => ({ error2: "Please Fill In All The Fields" }));
                            }

                            else if (this.state.newpassword.trim() !== this.state.confirmpassword.trim()) {
                            this.setState({matcherror: "The New Password Fields Do Not Match"})
                            }

                            else {
                                this.setState(() => ({ error2: null }));
                                this.setState(() => ({ matcherror: null }));
                                this.setState(()=> ({passerror: null}))
                                
                                this.onPassword();

                            } 

                           
                        } 
                        
                    }>

                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>CHANGE PASSWORD</Text>

                    </TouchableOpacity>
                </View>

                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '80%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress={()=>{
                            this.props.navigation.navigate('Account')
                        } 
                        
                    }>

                <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>BACK</Text>

                </TouchableOpacity>

                </View>

            </View>

            {!!this.state.success && (<Text style={{ color: "blue" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.success}</Text>)}

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
         width: '70%',
         height: '10%',
        // flexGrow: 1,
         alignSelf: 'center',
         marginTop: '10%',
         textAlign:'center',
         fontSize: 15
  
     }
})

export default ChangePass;