import React from 'React';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';

import {sendemail} from './UserFunctions';

class Forgot extends React.Component {

    static navigationOptions = {
        title: 'FORGOT PASSWORD',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
        headerLeftStyle: {color: 'white'} 
      }

    constructor(props){
        super(props);

        this.state= {
            email: '',
            errors: {},
            error: '',
            notfound: '',
            failed: '',
            wait:''
        }
    }

    onEmail() {

        const useremail = {
            email: this.state.email
        }

        sendemail(useremail).then(data => {
            this.setState(()=>({wait: null}))
            console.log(data)
           if (data == "User not found : " + this.state.email + "None")
            {
                this.setState({notfound: 'Email Not Registered'})
            }

            else if (data== "Email failed to send")
            {
                this.setState({failed: 'Failed To Send Email. Please Try Again'})
            }

            else if (data == "Email sent successfully" )
            {
                this.props.navigation.navigate('Code', {email : this.state.email})
                
            }

          })
          .catch(err => {
            console.log(err)
          })
      }

    render () {

        return (

            <ImageBackground
                style= {{width: '100%', height: '100%'}}
                resizeMode= {'cover'}
                source= {require('../images/forgot.jpg')}
            >

                <View style={{marginTop: 100}}>

                {!!this.state.error && ( <Text style={{ color: "red", fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.error}</Text>)}

                {!!this.state.notfound && ( <Text style={{ color: "red" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.notfound}</Text>)}

                {!!this.state.failed && ( <Text style={{ color: "red" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.failed}</Text>)}

                <View style= {{width: '70%', alignSelf: 'center', height: 220, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>

                <View style={{alignItems:'center', justifyContent:'center', marginTop: 15}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginLeft: '10%', marginRight: '10%', color: 'white'}}>
                        Enter Your Email Address To Recieve Password Reset Details
                    </Text>
                    <TextInput placeholder="Email" style={styles.entry} placeholderTextColor='skyblue' onChangeText={(val)=>this.setState({email: val.trim().toLowerCase(), notfound: null, error: null, failed: null})}/>
                </View>

                {!!this.state.wait && ( <Text style={{ color: "white" , fontSize:20, alignSelf: 'center', marginTop: 10, fontWeight: 'bold'}}>{this.state.wait}</Text>)}

                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '50%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                      
                      onPress= {() =>{
                        
                        if (this.state.email.trim()==="")
                        {
                            this.setState(() => ({ error: "Please Enter Your Email To Proceed" }));
                        }

                        else {
                            this.setState(() => ({ error: null }));
                            this.setState(()=> ({wait: 'Please Wait'}))
                            
                            this.onEmail()
                            //this.props.navigation.navigate('Code') /*testing*/
                        }}}>
                    
                     <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SUBMIT</Text>

                    </TouchableOpacity>

                   
                </View>

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
         width: 250,
         height: 40,
        // flexGrow: 1,
         alignSelf: 'center',
         marginTop: '10%',
         textAlign:'center',
         fontSize: 15
  
     },
})

export default Forgot;