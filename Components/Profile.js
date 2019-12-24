import React from "react";
import {Text, View, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';

import jwt_decode from 'jwt-decode';

class Profile extends React.Component {

    static navigationOptions = {
      title: 'Profile',
      headerStyle: { backgroundColor: 'skyblue' },
      headerTitleStyle: { color: 'white', fontWeight: 'bold'},
    }

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            newpassword: '',
            confirmpassword: '',
            phonenumber: '',
            age: '',
            gender: '',
            username: '',
            houseno:'',
            streetno:'',
            area:'',
          //  address: '',
            city: '',
            genderval: 0,
            cityval: 0
        }
    }

    componentDidMount(){
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                // We have data!!
                console.log(value);
                const decoded= jwt_decode(value);
                console.log(decoded);
                console.log(decoded.identity.address.city);

                console.log(decoded.identity.customer_id);

                this.setState({first_name: decoded.identity.first_name, last_name: decoded.identity.last_name, phonenumber: decoded.identity.phonenumber,
                email: decoded.identity.email, age: decoded.identity.age, gender: decoded.identity.gender, username: decoded.identity.username,
                houseno: decoded.identity.address.houseno, streetno: decoded.identity.address.streetno, area: decoded.identity.address.area, city: decoded.identity.address.city}, () => { if (this.state.gender == 'Female') {
                    this.setState({genderval: 1}, () => console.log(this.state.genderval)); 
                  }
                
                if (this.state.city == 'Rawalpindi') {
                    this.setState({cityval: 1}, () => console.log(this.state.cityval));
                }});

               // console.log(this.state.first_name);
              }
            } catch (error) {
              // Error retrieving data
            }
          };
  
            _retrieveData();
        
    }

    componentWillUnmount() {
        console.log('hi')
    }

    render(){
        return(

            <ImageBackground
                style= {{width: '100%', height: '100%'}}
                resizeMode= {'cover'}
                source= {require('../images/profile.png')}
            >
            <ScrollView>

            <View style= {{width: '80%', alignSelf: 'center', height: 500, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 40, marginBottom: 40}}>
            
            <View style= {{backgroundColor: 'skyblue', height: 30}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Basic Information</Text>
            </View>


            <View style = {styles.columnstyle}>
               
                <View style={styles.rowstyle}>

                    <View style={{width: '45%', alignItems: 'center'}}>
                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>First Name</Text>
                        </View>
                        <Text style= {styles.data}> {this.state.first_name} </Text>
                        {/*<Text style= {styles.data}>Hajra</Text> */}

                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead2}>Gender</Text>
                        </View>
                        <Text style= {styles.data}> {this.state.gender} </Text>
                       {/* <Text style= {styles.data}>Female</Text> */}

                    </View>

                    <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>Last Name</Text>
                        </View>
                        <Text style= {styles.data}>{this.state.last_name}</Text>
                       {/* <Text style= {styles.data}>Ata</Text>*/}

                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead2}>Age</Text>
                        </View>
                        <Text style= {styles.data}>{this.state.age}</Text>
                      {/*  <Text style= {styles.data}>23</Text> */}

                    </View>

                </View>

            </View>

            <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 30}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Account Information</Text>
            </View>

            <View style = {styles.columnstyle}>

                <View style={styles.rowstyle}>
                       
                    <View style={{width: '45%', alignItems: 'center'}}>
                
                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>Email Address</Text>
                        </View>
                        <Text style= {styles.data}>{this.state.email}</Text>
                        {/*<Text style= {styles.data}>hajraata@gmail.com</Text>*/}

                    </View>

                    <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>Username</Text>
                        </View>
                        <Text style= {styles.data}>{this.state.username}</Text>
                      {/*  <Text style= {styles.data}>hajraata</Text>*/}

                    </View>

                </View>
   
            </View>

            <View style= {{backgroundColor: 'skyblue', height: 30}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Contact Information</Text>
            </View>

            <View style = {styles.columnstyle}>

                <View style={styles.rowstyle}>
                       
                    <View style={{width: '45%', alignItems: 'center'}}>
                
                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>Address</Text>
                        </View>
                       <Text style= {styles.data}>House {this.state.houseno} Street {this.state.streetno} {this.state.area} {this.state.city}</Text>
                        {/* <Text style= {styles.data}>House 22 Street 8 Block B Soan Garden Islamabad</Text>*/}

                    </View>

                    <View style={{width: '45%', alignItems: 'center', marginLeft: '10%'}}>

                        <View style= {styles.innheadingsview}>
                            <Text style= {styles.innerhead}>Phone Number</Text>
                        </View>
                       <Text style= {styles.data}>{this.state.phonenumber}</Text>
                         {/*<Text style= {styles.data}>03115172515</Text>*/}

                    </View>

                </View>

            </View>

                <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 20}}
                 
                            onPress= {()=> (this.props.navigation.navigate('Updatee', {genderval: this.state.genderval, ageval: this.state.age, cityval: this.state.cityval}))}
                >

                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>EDIT</Text>     
                </TouchableOpacity>
                </View>

                </View>

                </ScrollView>

                </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
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



export default Profile;