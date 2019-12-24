import React from 'React';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';

import {verifyCode} from './UserFunctions';

class Code extends React.Component {

    static navigationOptions = {
        title: 'CODE',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
        headerLeftStyle: {color: 'white'} 
      }

    constructor(props){
        super(props);
        this.state = {
            code: '',
            email: '',
            error: '',
            incorrecterr:'',
            display: null
        }
    }

    onCode() {

        this.setState({email: this.props.navigation.state.params.email})
        
        const codeDetails = {
            email: this.props.navigation.state.params.email,
            code: parseInt(this.state.code)
        }

        console.log(codeDetails)

      verifyCode(codeDetails).then(data => {
          console.log(data)
          if (data == "Correct code") {
            console.log('success')
            this.setState({incorrecterr: null})
            this.props.navigation.navigate('Password', {email: this.state.email})
          }
          else if (data== "Verification Failed"){
            console.log('error')
            this.setState({incorrecterr: "Incorrect Code"})
          }
          else {
             console.log('errorcode')
             this.setState({incorrecterr: "Incorrect Code"})
          }
      }).catch (err => {
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

            <View style= {{marginTop: 100}}>

              {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', marginTop: '5%', fontWeight: 'bold', fontSize: 20}}>{this.state.error}</Text>)}

              {!!this.state.incorrecterr && ( <Text style={{ color: "red" , alignSelf: 'center', marginTop: '5%', fontWeight: 'bold', fontSize: 20}}>{this.state.incorrecterr}</Text>)}

              <View style= {{width: '70%', alignSelf: 'center', height: 200, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>

                <View style={{alignItems:'center', justifyContent:'center', marginTop: 15}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                        Enter The Code Below
                    </Text>
                    <TextInput placeholder="Code" placeholderTextColor='skyblue' placeholderTextColor='skyblue' maxLength={4} keyboardType="phone-pad" style={styles.entry} onChangeText={(val)=>this.setState({code: val, error: null, incorrecterr: null})}/>
                </View>

                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '50%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                      onPress= {() =>{

                    if (this.state.code.trim()==="")
                      {  
                        this.setState(() => ({ error: "Please Enter The Code Received" }));
                      }
                    
                    else if ((this.state.code).length < 4) {
                        this.setState(() => ({ error: "Incomplete Code" }));
                        this.setState(()=> ({incorrecterr: null}));
                    }

                    else 
                    {
                        this.setState(() => ({ error: null}));
                        this.setState(()=> ({incorrecterr: null}));
                        this.onCode();
                      
                    }}}>

                <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SUBMIT</Text>

                </TouchableOpacity>

                   
                </View>
                    
                    <Text style={{alignItems: 'center', justifyContent: 'center', alignSelf:'center'}}>{this.state.display}</Text>
              
              </View>

              </View>

            </ImageBackground>

            )

            

    }
    
   
}

const styles = StyleSheet.create({

  entry: {
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


export default Code;