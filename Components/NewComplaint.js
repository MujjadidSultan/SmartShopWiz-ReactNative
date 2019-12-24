import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground} from "react-native";

import {regcomplaint, getcomplaintcat} from './UserFunctions'; 

import RadioForm from 'react-native-simple-radio-button';

/*var radio_props = [
    {label: 'Product  ', value: 1 },
    {label: 'Management/Staff   ', value: 2},
    {label: 'Store', value: 3}
  ]; */


class NewComplaint extends React.Component {

    static navigationOptions = {
        title: 'REPORT A PROBLEM',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold', marginLeft: '20%'},
        
      }
    
      constructor(props) {
        super(props);

        this.state = {
            
            customer_id: this.props.navigation.getParam('customer_id'),
         //   date:'',
          //  time: '',
            complaint: '',
            complaint_id: '1',

            empty: '',
            success: '',
            categories: []
        }

    }

    componentWillMount() {
        getcomplaintcat().then(data=> {
           // this.setState({categories: data}, () => console.log(this.state.categories))

           for (let i = 0; i < data.length; i++) {
               var obj = {label: data[i].complaint_name, value: data[i].complaint_id}
               this.state.categories.push(obj);
               this.setState({categories: this.state.categories})
               
           }
        })
    }


    onComplain() {

        console.log(this.state.complaint_id);

        const newcompl = {
           
            customer_id: this.state.customer_id,
         //   date: this.state.date,
          //  time: this.state.time,
            complaint_id: this.state.complaint_id.toString(),
            complaint: this.state.complaint
        }

        regcomplaint(newcompl).then(data => {
            if (data) {
                this.setState({success: 'Complaint Submitted. Please Wait'});
                setTimeout(()=> {this.props.navigation.navigate('Account')}, 5000);
            }

            else {
                this.setState({success: 'An Error Has Occured. Please Try Again Later.'})
            }
            
            console.log(data);   
        })
    }


    render() {

        return (

           /* <ImageBackground
                style= {{width: '100%', height: '100%'}}
                resizeMode= {'cover'}
                source= {require('../images/complaintbg2.png')}
            >

                <View>
                    <View>
                        {!!this.state.empty && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.empty}</Text>)}
                    </View>

                    <View style= {{width: '90%', alignSelf: 'center', height: 350, backgroundColor: 'rgba(3, 169, 244, 0.3)', marginTop: 70, marginBottom: 40}}>
                        <View style= {{backgroundColor: 'skyblue', height: 30}}>
                            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', alignSelf: 'center'}}>Please Select One Of The Following Complaint Categories</Text>
                        </View>

                        <View style = {{marginTop: '5%', alignSelf: 'center'}}>

                            <RadioForm
                                buttonColor= 'skyblue'
                                buttonSize={10}
                                buttonOuterSize={20}
                                labelStyle= {{fontSize: 15, fontWeight: 'bold', color: 'white'}}
                                radio_props={radio_props}
                                formHorizontal= {true}
                                initial={0}
                                onPress={(value) => {this.setState({complaint_id:value})}}
                            >
                            </RadioForm>

                        </View>

                        <View style= {{backgroundColor: 'skyblue', height: 30, marginTop: 15}}>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', alignSelf: 'center'}}>Complaint Details</Text>
                        </View>

                        <TextInput placeholder='Write Complaint Details Here' placeholderTextColor='skyblue' style = {{ marginTop: '5%', height: '30%', width: '80%', borderColor: 'white', backgroundColor:'white', alignSelf: 'center',  borderRadius: 10, borderWidth: 2, padding: 10, textAlignVertical: 'top'}} multiline = {true} onChangeText= {(val)=> this.setState({complaint: val, empty: null, success: null})}></TextInput>

                        {!!this.state.success && ( <Text style={{ color: "blue" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.success}</Text>)}

                        <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                            <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                            
                                onPress={()=> {

                                    if (this.state.complaint.trim()==="") {
                                        this.setState(() => ({ empty: 'Complaint Details Are Required'}));
                                    }
                                    
                                    else {
        
                                    this.onComplain() 

                                    }
                                }
                        }>

                                <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SUBMIT</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </ImageBackground> */

            <View>
                <View>
                    {!!this.state.empty && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.empty}</Text>)}
                </View>

                <View style= {{marginTop: '5%', backgroundColor: 'skyblue', height: 30}}>
                    <Text style = {{alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: 'white'}}>Please Select One Of The Following Complaint Categories</Text>
                </View>

                <View style = {{marginTop: '5%', alignSelf: 'center'}}>

                    <RadioForm
                        buttonColor= 'skyblue'
                        buttonSize={10}
                        buttonOuterSize={20}
                        labelStyle= {{fontSize: 15, fontWeight: 'bold'}}
                        radio_props={this.state.categories}
                        formHorizontal= {true}
                        initial={0}
                        onPress={(value) => {this.setState({complaint_id:value}, ()=> console.log(this.state.complaint_id))}}
                    >
                    </RadioForm>

                </View>
                    
                    <View style={{marginTop: '5%', backgroundColor: 'skyblue', height: 30}}>
                        <Text style= {{alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white'}}>Complaint Details</Text>
                    </View>

                    <TextInput placeholder='Write Complaint Details Here' placeholderTextColor='skyblue' style = {{ marginTop: '5%', height: '30%', width: '80%', borderColor: 'black', alignSelf: 'center',  borderRadius: 10, borderWidth: 2, padding: 10, textAlignVertical: 'top'}} multiline = {true} onChangeText= {(val)=> this.setState({complaint: val, empty: null, success: null})}></TextInput>

                    {!!this.state.success && ( <Text style={{ color: "blue" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.success}</Text>)}

                
                    <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                        <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                         
                        onPress={()=> {

                            if (this.state.complaint.trim()==="") {
                                this.setState(() => ({ empty: 'Complaint Details Are Required'}));
                            }
                            
                            else {
   
                               this.onComplain() 

                            }
                        }
                    }>

                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>SUBMIT</Text>

                    </TouchableOpacity>
                    </View>
            
                </View> 
            
        )
    }

}

export default NewComplaint;