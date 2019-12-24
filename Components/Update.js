import React from "react";
import {Text, View, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import {update} from './UserFunctions';

import jwt_decode from 'jwt-decode';

var radio_props = [
  {label: 'MALE  ', value: 'Male' },
  {label: 'FEMALE', value: 'Female'}
];

class Update extends React.Component {

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
            age: '',
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
            genderval: this.props.navigation.getParam('genderval')
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
          <ScrollView style={{height: '95%'}}>
            
          <View style= {{alignItems: 'center', marginTop: '5%'}}>
                  <Text style={styles.headings}>Basic Information</Text>
          </View>


          <View style = {styles.columnstyle}>
             
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
                        buttonColor= 'cornflowerblue'
                        buttonSize={10}
                        buttonOuterSize={20}
                        labelStyle= {{fontSize: 15, fontWeight: 'bold'}}
                        radio_props={radio_props}
                        formHorizontal= {true}
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
                      <TextInput value={(this.state.age).toString()} style={styles.entry} onChangeText= {(val)=> this.setState({age: val, updatesucc: null, updateerr: null})}/> 

                  </View>

              </View>

          </View>

          <View style= {{alignItems: 'center', marginTop: '5%'}}>
                      <Text style={styles.headings}>Account Information</Text>
                      <Text style= {{color: 'red', fontSize: 15}}>(This information cannot be changed)</Text>
                  </View>
          
          <View style = {styles.columnstyle}>

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

                  <View style= {{alignItems: 'center', marginTop: '5%'}}>
                      <Text style={styles.headings}>Contact Information</Text>
                  </View>

          <View style = {styles.columnstyle}>

              <View style={styles.rowstyle}>
                     
                  <View style={{width: '45%', alignItems: 'center'}}>
              
                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>Address</Text>
                      </View>
                      <TextInput value={(this.state.houseno).toString()} style={styles.entry} placeholder= "House Number" onChangeText= {(val)=> this.setState({houseno: val, updatesucc: null, updateerr: null})}/>
                      <TextInput  value={(this.state.streetno).toString()} style={styles.entry} placeholder= "Street Number" onChangeText= {(val)=> this.setState({streetno: val, updatesucc: null, updateerr: null})}/>
                      <TextInput  value={this.state.area} style={styles.entry} placeholder= "Area" onChangeText= {(val)=> this.setState({area: val, updatesucc: null, updateerr: null})}/>
                      <TextInput value={this.state.city} textContentType="addressCity" style={styles.entry} placeholder= "City" onChangeText= {(val)=> this.setState({city: val, updatesucc: null, updateerr: null})}/>
                  </View>

                  <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                      <View style= {styles.innheadingsview}>
                          <Text style= {styles.innerhead}>Phone Number</Text>
                      </View>
                      <TextInput value={(this.state.phonenumber).toString()} style={styles.entry} maxLength={11} onChangeText= {(val)=> this.setState({phonenumber: val, updatesucc: null, updateerr: null})}/>

                  </View>

              </View>

          </View>
                        
              <View style={{width: '90%', marginTop: '8%', alignSelf:'center', flex: 1, flexDirection:'row', alignContent: 'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
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

                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, marginLeft: '10%', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                        onPress= {()=> this.props.navigation.navigate('Account')}>
                        
                        <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>BACK</Text>      

                  </TouchableOpacity>

              </View>


            <View>
              {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.error}</Text>)}

              {!!this.state.updatesucc && ( <Text style={{ color: "blue" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updatesucc}</Text>)}

              {!!this.state.updateerr && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold'}}>{this.state.updateerr}</Text>)}
            </View>

            </ScrollView>

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
      height: '20%',
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
    fontStyle: 'italic'
},

innerhead2: {
    fontSize: 20, 
    fontWeight:'bold',
    fontStyle: 'italic',
    marginTop: '5%'
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
   marginTop: '4%'
}



})

export default Update;

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