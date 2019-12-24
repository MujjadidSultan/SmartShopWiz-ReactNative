import React from 'react';
import {Text, View, ScrollView, TextInput, Button, Image, TouchableOpacity, FlatList, StyleSheet, AsyncStorage, ImageBackground} from 'react-native';

import jwt_decode from 'jwt-decode';
import Dialog from "react-native-dialog";
import { getOneComp, delComp, reply, feedback, feedbackget } from './UserFunctions';

class ViewComplaint extends React.Component {

    static navigationOptions = {
        title: 'Complaint',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      }

    constructor(props) {
        super(props);

        this.state = { 

            customer_id: '',
            username: '',

            selected: this.props.navigation.getParam('selected'),
            date: this.props.navigation.getParam('date'),
            time: this.props.navigation.getParam('time'),
            complaint: this.props.navigation.getParam('complaint'),

            feedback_status: '',
            ticket_status: '',

            success: '',

            empty: '',

            response: [],
           

           

            input: '',
            details: '',

            dialogVisible: false,

            new_response: '', 

            feedbackbutton: true,

            givefeedback: false,

            showfeedback: false,

            feedback: '',

            feedbackdisplay: false,

            feedback_date: '',

            feedback_time: '',

            deleteconf: ''

            
        }
    }

    

     

    componentWillMount() {

        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
               
                const decoded= jwt_decode(value);
              
             

                this.setState({customer_id: decoded.identity.customer_id, username: decoded.identity.username});
               
             
              }
            } catch (error) {
             
            }
          };
  
            _retrieveData();

    
        const comp ={
            ticket_id: this.state.selected
        }

        getOneComp(comp).then (data => {
         
        this.setState({response : data[0].responses, feedback_status: data[0].feedback_status, ticket_status: data[0].ticket_status});
        })
    }

    deleteComplaint() {
        const comp ={
            ticket_id: this.state.selected
        }

        delComp(comp).then (data => {
            if (data == 'Ticket deleted!') {
                this.setState({deleteconf: 'Complaint Deleted. Please Wait.'})
                setTimeout(()=> {this.props.navigation.navigate('Account')}, 5000)
            }
        })
    }

    onFeedback() {
        const subFeed = {
            ticket_id: this.state.selected,
            feedback: this.state.input
        }

        feedback(subFeed).then(data=> {
            if (data) {
                this.setState({success: 'Feedback Submitted', feedbackbutton: false, givefeedback: false});
                setTimeout(()=> {this.componentWillMount()}, 5000);
               
            }
        })
    }

    getFeedback() {

        const tick = {
            ticket_id: this.state.selected
        }

        feedbackget(tick).then(data=> {
            console.log(data);
            this.setState({feedbackdisplay: true, showfeedback: true, feedback: data[0].feedback, feedback_date: data[0].date, feedback_time: data[0].time})
        })
    }

   

    /********************************************************/

   add_response() {
    const response = {
        ticket_id: this.state.selected,
        message: this.state.new_response
    }

    reply(response).then(data=> {
        console.log(data);
   
        this.componentWillMount();
    })
}

    render() {
        return (

          

           

          <ScrollView style= {{flex: 1}}>

            <Dialog.Container visible= {this.state.dialogVisible}>
              <Dialog.Title>Delete</Dialog.Title>
              <Dialog.Description>Do you want to delete this complaint? This action cannot be undone.</Dialog.Description>
              <Dialog.Button label= 'Cancel' onPress={()=> this.setState({dialogVisible: false})}></Dialog.Button>
              <Dialog.Button label= 'Okay' onPress={()=> { this.setState({dialogVisible: false}) ; this.deleteComplaint() }}></Dialog.Button>  
            </Dialog.Container> 

            {!!this.state.deleteconf && (<Text style={{color: 'blue', alignSelf: 'center', fontSize: 15, fontWeight: 'bold', marginTop: 20}}>{this.state.deleteconf}</Text>)}
                <View style={{width: '100%', height: 40, marginTop: 5}}>
                <TouchableOpacity onPress= {()=> this.setState({dialogVisible: true})}>
                       <Image
                            style= {{height: 30, width: 30, alignSelf: 'flex-end', marginRight: 20}}
                            source= {require('../images/delete.jpg')}
                        /> 
                </TouchableOpacity>
                </View>

                <View style={{marginTop: 5, width: '100%', alignSelf: 'center', justifyContent:'center', flex: 1, flexDirection: 'row', backgroundColor: 'skyblue'}}>
                    <Text style= {{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Complaint Submitted On : <Text style= {{fontSize: 15, color: 'white'}}>{this.state.date} At {this.state.time}</Text></Text>
                </View>

                <View style={{marginTop: 10, width: '100%', alignSelf: 'center', justifyContent:'center', backgroundColor: 'skyblue'}}>
                    <Text style= {{fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Complaint Details</Text>
                </View>

                <View style={{marginTop: 10, width: '90%', alignSelf: 'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style= {{fontSize: 15, textAlign: 'center'}}>{this.state.complaint}</Text>
                </View>

                {!!this.state.response &&
                
                ( <View>
                <View style={{marginTop: 10, width: '100%', alignSelf: 'center', justifyContent:'center', backgroundColor: 'skyblue'}}>
                    <Text style= {{fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Complaint Response</Text>
                </View>
                
                <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>             
                <FlatList
                    data= {this.state.response}
                    keyExtractor={({item}, index) => index.toString()}
                    renderItem={({item}) => <View style= {styles.item}>
                        <Text style= {{fontSize: 15, fontWeight: 'bold'}}>{item.from_user_id === ((this.state.customer_id).toString()) && (<Text>{this.state.username} </Text>)} {item.from_user_id !== ((this.state.customer_id).toString()) && (<Text>Smart ShopWiz</Text>)}</Text>
                        <Text style= {{fontSize: 15}}>{item.message}</Text>
                        <Text style= {{fontSize: 12, color: 'lightgray'}}>On {item.date} at {item.time}</Text>
                </View> }
                />

                </View>
                
                </View>)}

                {this.state.ticket_status === 'Open' &&


               ( <View style ={{width: '90%', alignSelf: 'center'}}>

                <TextInput placeholder= 'Write Response' placeholderTextColor= 'skyblue' style={{width: '95%', alignSelf: 'center', textAlign:'center', height: 70, marginTop: 10, borderWidth: 2, borderColor: 'lightgray', borderRadius: 10}} multiline= {true}
                onChangeText= {(val)=> this.setState({new_response: val})}></TextInput>

                <TouchableOpacity
                    style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                    onPress = {() => {this.add_response()}}>
                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>OKAY</Text>
                    
                </TouchableOpacity>
                    
                </View> )}

                {!!this.state.success && ( <Text style={{ color: "blue" , fontSize:20, alignSelf: 'center', marginTop: 10, fontWeight: 'bold'}}>{this.state.success}</Text>)}


            {this.state.feedback_status.trim() === 'Not Submitted' && this.state.ticket_status.trim() === 'Closed' && this.state.feedbackbutton == true && (

                <View style= {{width: '90%', alignSelf: 'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                    onPress= {()=> {this.setState({givefeedback: true, feedbackbutton: false})}}>
                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Give Feedback</Text>
                </TouchableOpacity>
                </View>

            )} 

            {this.state.givefeedback== true && (

                <View>

                    {!!this.state.empty && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 10}}>{this.state.empty}</Text>)}

                    <TextInput placeholder= 'Please Provide Feedback Here' placeholderTextColor= 'skyblue' style = {{marginTop: 20, height: 200, width: '80%', borderColor: 'lightgray', alignSelf: 'center',  borderRadius: 10, borderWidth: 2, padding: 10, textAlignVertical: 'top'}} multiline = {true} onChangeText= {(val)=> this.setState({input: val, empty: null, success: null})}></TextInput>


                    <View style= {{width: '90%', alignSelf: 'center'}}>
                    <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                        onPress= {()=> {
                            if (this.state.input.trim()==="") {
                                this.setState(() => ({ empty: 'Please Write Something In The Feedback Section To Submit'}));
                            }
                            
                            else {
                                
                             this.onFeedback() 
                            }

                        }}>
                        <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Submit Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                        onPress= {()=> {
                            this.setState({input: '', givefeedback: false, feedbackbutton: true})
                        }}>
                        <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
               
                </View>
            )}


            {this.state.feedback_status.trim() === 'Submitted' && this.state.showfeedback == false && (
                
                <View style= {{width: '90%', alignSelf: 'center'}}>
                <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                    onPress= {()=> {
                        this.getFeedback();
                    }}>
                    <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>View Feedback</Text>
                </TouchableOpacity>
                </View>
                
            )}

            {this.state.feedbackdisplay== true && (
                <View>
                <View style={{marginTop: 10, width: '100%', alignSelf: 'center', justifyContent:'center', backgroundColor: 'skyblue'}}>
                    <Text style= {{fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Feedback Submitted On: <Text style= {{fontSize: 15, color: 'white', fontWeight: 'bold'}}>{this.state.feedback_date} At {this.state.feedback_time}</Text></Text>
                </View>

                <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
                    <Text style= {{fontSize: 15, textAlign: 'center'}}>{this.state.feedback}</Text>
                    <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                        onPress= {()=> {
                            this.setState({feedbackdisplay: false, showfeedback: false})
                        }}>
                        <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Close</Text>
                    </TouchableOpacity>
                </View>
                </View>
            )}
        
            </ScrollView> 

        )
    }
}

const styles = StyleSheet.create({
    item : {
        padding: 10,
        width: '95%',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray'
    }
})

export default ViewComplaint;