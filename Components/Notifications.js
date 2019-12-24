import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Notifications extends Component {

    static navigationOptions = {
        title: 'Notifications',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      }

    constructor (props) {
        super (props);

        this.state = {
            selected: '',

            customer_id: this.props.navigation.getParam('customer_id')
        }
    }

   /*
    componentWillMount(){
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('usertoken');
              if (value !== null) {
                // We have data!!
                console.log(value);
                const decoded= jwt_decode(value); 
               // console.log(decoded);
               // console.log(decoded.identity.address.city);

                this.setState({email: decoded.identity.email, username: decoded.identity.username});
                console.log(this.state.username); // testing
              }
            } catch (error) {
              // Error retrieving data
            }
          };
  
            _retrieveData();
        
    } */
    

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {notification_id: '11', title: 'Review Item', cart_id: '11',  date: '01/01/2019', time:'14:54', message: 'Please review the purchased items' },
            {notification_id: '12', title: 'Review Item', cart_id: '12', date: '01/01/2019', time:'14:54', message: 'Please review the purchased items' },
            {notification_id: '13', title: 'Review Item', cart_id: '13', date: '01/01/2019', time:'14:54', message: 'Please review the purchased items' },

          ]}
          keyExtractor={({item}, index) => index.toString()}
          renderItem={({item}) => <TouchableOpacity style={styles.item} onPress= {()=> { 
              
            if (item.title == 'Review Item') {
                this.props.navigation.navigate('ReviewProduct', {selected: item.cart_id, customer_id: this.state.customer_id} )}
            }
        
        }><Text style= {{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text> 
        <Text style= {{fontSize : 15, fontWeight: 'normal'}}>{item.message}</Text>
        <Text style={{fontSize: 12, color: 'lightgray'}}>{item.date}  {item.time}</Text>
        
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
    height: 90,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    fontWeight: 'bold'
  },
})