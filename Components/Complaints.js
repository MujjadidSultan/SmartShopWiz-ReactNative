import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {getAllComplaints} from './UserFunctions';

export default class Complaints extends Component {

    static navigationOptions = {
        title: 'Complaints',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      }

    constructor (props) {
        super (props);

        this.state = {
            selected: '',
            comp_data: [],
            
            /*[{ticket_id: '11', title: 'Complaint About Product', date: '01/01/2019',  time:'14:54' },
              {ticket_id: '12', title: 'Complaint About Product', date: '01/05/2019',  time:'14:54' },
              {ticket_id: '13', title: 'Complaint About Staff', date: '04/05/2019',  time:'14:54' }], */

            //  email: '',
           //  customer_id: this.props.navigation.getParam('customer_id')
        }
    }

    

    componentWillMount(){
     
        /*********************USE WITH BACKEND******************************/


        getAllComplaints().then(data => {
       // console.log(data)  
       this.setState({comp_data: data})
        }).catch(err => {
          console.log(err)
        })

        
    }

   /********************************************************************/

  render() {
    
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.comp_data}
          keyExtractor={({item}, index) => index.toString()}
          renderItem={({item}) => <TouchableOpacity style={styles.item} onPress= {()=> { console.log(item) ;
                this.props.navigation.navigate('ViewComplaint', {customer: this.state.customer_id, selected: item.ticket_id, date: item.date, time: item.time, complaint: item.complaint} )} 
        }><Text style= {{fontSize: 18, fontWeight: 'bold'}}>Complaint</Text>
        <Text style= {{fontSize : 15, fontWeight: 'bold', color: 'lightgray', marginTop: 3}}>Submitted On {item.date} At {item.time}</Text>
        </TouchableOpacity>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10
  },
  item: {
    padding: 10,
  //  fontSize: 18,
    height: 75,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    fontWeight: 'bold'
  },
})