import React from 'React';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
//import { renderers } from 'react-native-popup-menu';

import {updatepassword} from './UserFunctions'

class Password extends React.Component{

    static navigationOptions = {
        title: 'RESET PASSWORD',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
        headerLeft: <View></View> 
      }

    constructor(props){
        super(props);

        this.state = {
            email: '',
            newpass: '',
            confirm: '',
            empty: '',
            matcherr: ''

        }
    }

    onPassword() {

        const newpassword = {
            email: this.props.navigation.state.params.email,
            password: this.state.newpass
        }

        console.log(newpassword)

        updatepassword(newpassword).then (data =>{
            console.log(data)

            if (data.result == "Password Updated")
            {
                this.props.navigation.navigate('LogIn')
            }
        })

    }

    render() {
        return (
            <ImageBackground
                style= {{width: '100%', height: '100%'}}
                resizeMode= {'cover'}
                source= {require('../images/forgot.jpg')}
            >

            {!!this.state.empty && ( <Text style={{ color: "red" , alignSelf: 'center', marginTop: '5%', fontWeight: 'bold', fontSize: 20}}>{this.state.empty}</Text>)}

            {!!this.state.matcherr && ( <Text style={{ color: "red" , alignSelf: 'center', marginTop: '5%', fontWeight: 'bold', fontSize: 20}}>{this.state.matcherr}</Text>)}


            <View style= {{width: '70%', alignSelf: 'center', height: 300, marginTop: 100, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>

            
                <View style={{alignItems:'center', justifyContent:'center', marginTop: 15}}>

                    <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginLeft: '10%', marginRight: '10%', color: 'white'}}>
                        Enter New Password Below
                    </Text>
                
                    <TextInput placeholder="New Password" placeholderTextColor='skyblue' textContentType="password" secureTextEntry style={styles.entry} onChangeText={(val)=>this.setState({newpass: val, empty: null, matcherr: null})}/>
                
                    <TextInput placeholder="Re-Enter New Password" placeholderTextColor='skyblue' textContentType="password" secureTextEntry style={styles.entry} onChangeText={(val)=>this.setState({confirm: val, empty: null, matcherr: null})}/>
                </View>


                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '50%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                 
                      onPress= {() =>{
                        if (this.state.newpass.trim() === "" || this.state.confirm.trim() === "")
                        {
                            this.setState(()=> ({empty: 'Please Fill In Both The Fields'}))
                        }

                        else if (this.state.newpass.trim() !== this.state.confirm.trim())
                        {
                            this.setState(()=> ({empty: null}))
                            this.setState(()=> ({matcherr: 'The Two Fields Do Not Match'}))
                        }

                        else
                        {
                            this.setState(()=> ({empty: null}))
                            this.setState(()=> ({matcherr: null}))
                            this.onPassword()
                           // this.props.navigation.navigate('LogIn') /*testing*/
                        }
                      }
                    }>

                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SUBMIT</Text>

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
         width: '70%',
         height: '20%',
        // flexGrow: 1,
         alignSelf: 'center',
         marginTop: '10%',
         textAlign:'center',
         fontSize: 15
  
     }
})

export default Password;