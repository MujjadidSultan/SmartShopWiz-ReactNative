import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Dialog from "react-native-dialog";
import { getReserved, deleteReservation, deltefromlist } from './UserFunctions';

class Reserved extends React.Component {

  static navigationOptions = {
    title: 'Reserved Products',
    headerStyle: { backgroundColor: 'skyblue' },
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
  }

    constructor(props){
        super(props);

        this.state = {
            selected: '',
            name: '',
            reserved_data : [],
            dialogVisible: false,
            itemtodelete: '',

        }
    }

     /****************USE WITH BACKEND**********************/ 

    componentWillMount() {

      
       

        getReserved().then(data => {
          this.setState({reserved_data: data})
          console.log(data)
        }).catch(err => {
          console.log(err)
        }) 
    
}

 /*********************************************************************/

 //FUNCTION CALL COMMENTED OUT ON BUTTON PRESS FOR deleteRes()
 
      deleteRes() {  
        const product ={
          reservation_id: this.state.itemtodelete
        }

        deleteReservation(product).then(data => {
          console.log('works')
          console.log(product.reservation_id)
          if (data.result == 'reservation cancel'){
            alert('Reservation Cancelled')
            this.componentWillMount();
          }

          else {
            alert('An error occurred. Please try again later.')
          }
        }).catch(err => {
          console.log(err)
        })
    }

    remove() {
      const product ={
        reservation_id: this.state.itemtodelete
      }

      deltefromlist(product).then(data => {
        if (data== 'Reserved Product deleted!') {
          this.componentWillMount();
        }
      })
    }


    render() {
        return (
          <View style={{flex: 1, padding: 15}}>

            <Dialog.Container visible= {this.state.dialogVisible}>
              <Dialog.Title>Cancel Reservation</Dialog.Title>
              <Dialog.Description>Do you want to cancel this reservation? This action cannot be undone.</Dialog.Description>
              <Dialog.Button label= 'Cancel' onPress={()=> this.setState({dialogVisible: false})}></Dialog.Button>
              <Dialog.Button label= 'Okay' onPress={()=> { this.setState({dialogVisible: false}) ; /* alert('Deleted') */ this.deleteRes();}}></Dialog.Button>  
            </Dialog.Container>  


            <FlatList
              data={this.state.reserved_data}
              keyExtractor={({item}, index) => index.toString()}
              renderItem={({item}) => /*<View style= {{borderBottomWidth: 1, borderBottomColor: 'lightgray', marginBottom: 5, marginTop: 5}}><Text style= {{fontSize: 20, fontWeight: 'bold'}}>{item.product_name}</Text><Text style= {{fontSize: 12, fontWeight: 'bold'}}>Quantity Reserved: {item.reserved_quantity}</Text><Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Reserved For {item.reserved_time} Minutes</Text><Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Reserved On {item.date} At {item.time}</Text>
              <View style= {{flex: 1, flexDirection :'row', alignItems: 'center'}}>
                  <View style= {styles.buttons}>
                      <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ReservedProduct', {selected: item.product_id})}>
                            <Text style={{fontSize: 15, color: 'white', alignSelf:'center'}}>View Product</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={{width:'20%'}}>

                  </View>

                  <View style= {styles.buttons}>
                      <TouchableOpacity onPress = {()=> {this.setState({itemtodelete: item.reservation_id, dialogVisible: true})}}>
                            <Text style={{fontSize: 15, color: 'white', alignSelf:'center'}}>Cancel Reservation</Text>
                      </TouchableOpacity>
                  </View>

              </View>
              
        </View>*/

        <View style={{flex: 1, flexDirection: 'row', width: '98%', borderBottomWidth: 1, borderBottomColor: 'lightgray', marginBottom: 5, marginTop: 5}}>
          <View style= {{width : '60%'}}>
            <Text style= {{fontSize: 20, fontWeight: 'bold'}}>{item.product_name}</Text><Text style= {{fontSize: 12, fontWeight: 'bold'}}>Quantity Reserved: {item.reserved_quantity}</Text><Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Reserved For {item.reserved_time} Minutes</Text><Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Reserved On {item.date}</Text><Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>At {item.time}</Text>
            {item.status== 'Cancelled' && (<Text>Status: Cancelled/Expired</Text>)}
            {item.status=='Reserved' && (<Text>Status: Reserved</Text>)}
          </View>

          
          <View style= {{width: '40%'}}>
                  <View style= {styles.buttons}>
                      <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ReservedProduct', {selected: item.product_id})}>
                            <Text style={{fontSize: 15, color: 'white', alignSelf:'center'}}>View Product</Text>
                      </TouchableOpacity>
                  </View>
        
        {item.status == 'Reserved' && (

                  <View style= {styles.buttons}>
                      <TouchableOpacity onPress = {()=> {this.setState({itemtodelete: item.reservation_id, dialogVisible: true})}}>
                            <Text style={{fontSize: 15, color: 'white', alignSelf:'center'}}>Cancel Reservation</Text>
                      </TouchableOpacity>
        </View> )}

        {item.status == 'Cancelled' && (

          <View style= {styles.buttons}>
              <TouchableOpacity onPress = {()=> {this.setState({itemtodelete: item.reservation_id}, ()=> this.remove())}}>
                    <Text style={{fontSize: 15, color: 'white', alignSelf:'center'}}>Remove</Text>
              </TouchableOpacity>
          </View> )}




          </View>

        </View>
      
            }
            />
    
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
     buttons: {
        marginTop: 5, 
        width: '95%', 
        backgroundColor: 'skyblue', 
        alignContent: 'center', 
        textAlignVertical: 'center',
        justifyContent: 'center',
        textAlign:'center',
        marginBottom: 2,
        height: 35,
        borderWidth: 1, 
        borderRadius: 15, 
        borderColor: 'lightgrey'
      },
    })

export default Reserved;