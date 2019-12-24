import React from "react";
import {Text, View, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground, Slider, BackHandler} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import {update} from './UserFunctions';

import jwt_decode from 'jwt-decode';

var radio_props = [
  {label: 'Male  ', value: 'Male' },
  {label: 'Female', value: 'Female'}
];

var city_props = [
  {label: 'Islamabad  ', value: 'Islamabad' },
  {label: 'Rawalpindi', value: 'Rawalpindi'}
];

class Updatee extends React.Component {

    static navigationOptions = {
      title: 'Update Profile',
      headerStyle: { backgroundColor: 'skyblue' },
      headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      headerLeft: <View></View>
    }

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phonenumber: '',
            age: this.props.navigation.getParam('ageval'),
            gender: '',
            username: '',
            houseno:'',
            streetno:'',
            area:'',
          //  address: '',
            city: '',
            error: '',
            updatesucc:'',
            updateerr:'',
            genderval: this.props.navigation.getParam('genderval'),
            cityval: this.props.navigation.getParam('cityval')
        }
    }

    onUpdate() {
        const updateUser = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          email: this.state.email,
          phonenumber: this.state.phonenumber,
          age: this.state.age,
          gender: this.state.gender,
          houseno: this.state.houseno,
          streetno: this.state.streetno,
          area: this.state.area,
          city: this.state.city,
         
          
        }
  
        update(updateUser).then(data => {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem('usertoken', data);
            } catch (error) {
              // Error saving data
            }
          };
  
          _storeData();
          console.log(data);
  
          this.setState(()=>({updatesucc: 'Changes Saved Successfully'}))
  
        }).catch(err => {
          console.log(err)
  
          this.setState(()=>({updateerr: 'An Error Occurred. Please Try Again'}))
        })
  
      }
  
      componentWillMount(){

        //  BackHandler.addEventListener('hardwareBackPress', function() {return true});
       
          _retrieveData = async () => {
              try {
                const value = await AsyncStorage.getItem('usertoken');
                if (value !== null) {
                  // We have data!!
                  console.log(value);
                  const decoded= jwt_decode(value);
                  console.log(decoded);
                  console.log(decoded.identity.address.city);
                 // console.log(decoded.identity.gender);


                  this.setState({first_name: decoded.identity.first_name, last_name: decoded.identity.last_name, phonenumber: decoded.identity.phonenumber,
                  email: decoded.identity.email, age: decoded.identity.age, gender: decoded.identity.gender, username: decoded.identity.username,
                  houseno: decoded.identity.address.houseno, streetno: decoded.identity.address.streetno, area: decoded.identity.address.area, city: decoded.identity.address.city});
                  console.log(this.state.gender);
                    
                }
              } catch (error) {
                // Error retrieving data
              }
            };
    
              _retrieveData();
              
              
      }




      render(){

        return (
            
        <ImageBackground
            style= {{width: '100%', height: '100%'}}
            resizeMode= {'cover'}
            source= {require('../images/profile.png')}
        > 

       
          <ScrollView>

         <View style= {{width: '80%', alignSelf: 'center', height: 740, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 50, marginBottom: 50}}>

            
         <View style= {{backgroundColor: 'skyblue', height: 30}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Basic Information</Text>
         </View>


          <View style = {{height: 180}}>
             
              <View style={styles.rowstyle}>

                  <View style={{width: '45%', alignItems: 'center'}}>
                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>First Name</Text>
                      </View>
                      <TextInput value={this.state.first_name} textContentType="name" style={styles.entry} onChangeText= {(val)=> this.setState({first_name: val, updatesucc: null, updateerr: null})}/>

                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead2}>Gender</Text>
                      </View>
                      
                      <View style={{marginTop: '5%'}} >
                      <RadioForm
                        buttonColor= 'skyblue'
                        buttonSize={15}
                        buttonOuterSize={20}
                        labelStyle= {{fontSize: 15, fontWeight: 'bold', color: 'white'}}
                        radio_props={radio_props}
                        style={{marginBottom: 20}}
                        //formHorizontal= {true}
                        initial={this.state.genderval}
                        onPress={(value) => {this.setState({gender:value})}}
                      />
                      </View>
                    {/* <Text style= {styles.data}>{this.state.gender}</Text>
                       <Text style= {styles.data}>Female</Text> */}

                  </View>

                  <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>Last Name</Text>
                      </View>
                      <TextInput value={this.state.last_name} textContentType="name" style={styles.entry} onChangeText= {(val)=> this.setState({last_name: val, updatesucc: null, updateerr: null})}/>

                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead2}>Age</Text>
                      </View>
                      <Text style={{color: 'white', fontWeight:'bold', fontSize: 15, alignSelf:'center'}}>{this.state.age}</Text>
                      <Text style={{color: 'white', fontWeight:'bold', fontSize: 12, alignSelf: 'center'}}>Move Slider Below To Change Age</Text>
                      <Slider
                            minimumValue={16}
                            maximumValue={90}
                            step={1}
                            value={parseInt(this.state.age)}
                            onValueChange={(value)=> this.setState({age: value.toString()})}
                            minimumTrackTintColor='skyblue'
                            thumbTintColor='skyblue'
                            style={{marginTop: 10, width: 150, alignSelf: 'center'}}
                            trackStyle={{height: 50}}
                          
                        />

                  </View>

              </View>

          </View>

          <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 30}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Account Information</Text>
                
          </View>
                      
          
          <View style = {{height: 130}}>
             <Text style= {{color: 'red', fontSize: 15, alignSelf: 'center', marginTop: 15, fontWeight: 'bold'}}>(This information cannot be changed)</Text>

              <View style={styles.rowstyle}>
                     
                  <View style={{width: '45%', alignItems: 'center'}}>

                    <View style= {styles.innheadingsview}>
                        <Text style= {styles.innerhead}>Email Address</Text>
                    </View>
                    <Text style= {styles.data}>{this.state.email}</Text>
                   {/* <Text style= {styles.data}>hajraata@gmail.com</Text> */}

                </View>

                <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                    <View style= {styles.innheadingsview}>
                        <Text style= {styles.innerhead}>Username</Text>
                    </View>
                   <Text style= {styles.data}>{this.state.username}</Text>
                    {/* <Text style= {styles.data}>hajraata</Text> */}

                </View>

              </View>
 
          </View>

          <View style= {{backgroundColor: 'skyblue', height: 30}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Contact Information</Text>
            </View>

          <View style = {{height: 200}}>

              <View style={styles.rowstyle}>
                     
                  <View style={{width: '45%', alignItems: 'center'}}>
              
                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>Address</Text>
                      </View>
                      <TextInput value={(this.state.houseno).toString()} style={styles.entry} placeholder= "House Number" onChangeText= {(val)=> this.setState({houseno: val, updatesucc: null, updateerr: null})}/>
                      <TextInput  value={(this.state.streetno).toString()} style={styles.entry} placeholder= "Street Number" onChangeText= {(val)=> this.setState({streetno: val, updatesucc: null, updateerr: null})}/>
                      <TextInput  value={this.state.area} style={styles.entry} placeholder= "Area" onChangeText= {(val)=> this.setState({area: val, updatesucc: null, updateerr: null})}/>
                      <View style= {{width: 125, marginTop: 10}}>
                          <RadioForm
                            buttonColor= 'skyblue'
                            buttonSize={15}
                            buttonOuterSize={20}
                            labelStyle= {{fontSize: 15, fontWeight: 'bold', color: 'white'}}
                            containerStyle= {{alignSelf: 'center'}}
                            radio_props={city_props}
                           // formHorizontal= {true}
                            initial={this.state.cityval}
                            onPress={(value) => {this.setState({city:value})}}
                        />
                        </View>
                  </View>

                  <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>Phone Number</Text>
                      </View>
                      <TextInput value={(this.state.phonenumber).toString()} style={styles.entry} maxLength={11} onChangeText= {(val)=> this.setState({phonenumber: val, updatesucc: null, updateerr: null})}/>

                  </View>

              </View>

          </View>

          <View style={{marginTop: 15}}>

          {!!this.state.error && ( <Text style={{ color: "red" , fontSize: 18, alignSelf: 'center', fontWeight: 'bold'}}>{this.state.error}</Text>)}

          {!!this.state.updatesucc && ( <Text style={{ color: "blue" , fontSize: 18, alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updatesucc}</Text>)}

          {!!this.state.updateerr && ( <Text style={{ color: "red" , fontSize: 18, alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updateerr}</Text>)}

          </View>
                        
              <View style={{width: '90%', marginTop: 20, alignSelf:'center', flex: 1, flexDirection:'row', alignContent: 'center'}}>
                <TouchableOpacity style= {{width: '45%', marginTop: 10, height: 30, borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress={()=> {
                              if (this.state.first_name.trim() === "" || this.state.last_name.trim()=== "" || this.state.phonenumber.trim()===""
                              || this.state.email.trim()=== "" || this.state.houseno.trim()=== "" || this.state.streetno.trim()=== "" || this.state.city.trim()=== ""
                              || this.state.area.trim()=== "" || this.state.username.trim() === "" || this.state.age.trim() === "") {
                                  this.setState(() => ({ error: "Please Fill In All The Fields" }));
                                }

                                else {
                                  this.setState(() => ({ error: null }));
                                  this.onUpdate();
                                  
                                }
                          }
                          
                      }

                      // onPress= {()=> (this.props.navigation.navigate('Profile'))}   /* testing */
                    >

                  <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SAVE</Text>     
                </TouchableOpacity>

                <TouchableOpacity style= {{width: '45%', marginTop: 10, height: 30, marginLeft: '10%', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress= {()=> this.props.navigation.navigate('Account')}>
                        
                        <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>ACCOUNT</Text>      

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
      width: 150,
      height: 30,
     // flexGrow: 1,
      alignSelf: 'center',
      marginTop: '5%',
      textAlign:'center'

  },

  columnstyle: {
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: '2%', 
    marginRight:'2%'
},

rowstyle: {
    flex: 1, 
    flexDirection: 'row',
    marginTop: '3%'
},

headings : {
    fontSize:25, 
    fontWeight: 'bold', 
    color: 'skyblue'
},

innerhead: {
    fontSize: 20, 
    fontWeight:'bold',
    fontStyle: 'italic',
    color: 'white'
},

innerhead2: {
    fontSize: 20, 
    fontWeight:'bold',
    fontStyle: 'italic',
    marginTop: '5%',
    color: 'white'
},

innheadingsview: {
    borderBottomWidth: 1, 
    borderBottomColor: 'skyblue', 
    width: '100%', 
    alignItems: 'center'
},

data : {
   fontSize : 15,
   fontWeight: 'bold',
   marginTop: '4%',
   color: 'white'
}



})

export default Updatee;

/* {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.error}</Text>)}

              {!!this.state.updatesucc && ( <Text style={{ color: "blue" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updatesucc}</Text>)}
     
              {!!this.state.updateerr && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updateerr}</Text>)}

              <View style= {{marginLeft: '35%', marginRight: '35%', marginTop: '5%'}}>
                  <Button
                      title = 'SAVE'
                      color= 'skyblue'
                       /*onPress={()=> {
                            if (this.state.first_name.trim() === "" || this.state.last_name.trim()=== "" || this.state.phonenumber.trim()===""
                            || this.state.email.trim()=== "" || this.state.houseno.trim()=== "" || this.state.streetno.trim()=== "" || this.state.city.trim()=== ""
                            || this.state.area.trim()=== "" || this.state.username.trim() === "" || this.state.age.trim() === "") {
                                this.setState(() => ({ error: "Please Fill In All The Fields" }));
                              }

                              else {
                                this.setState(() => ({ error: null }));
                                this.onUpdate();
                                
                              }
                         }
                        
                    }*/

                   /*   onPress= {()=> (this.props.navigation.navigate('Profile'))}  */ /* testing */

               /*   >     
                  </Button>
              </View> */