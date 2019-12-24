import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, FlatList, ScrollView} from 'react-native';
import Dialog from "react-native-dialog";

class Estimate extends React.Component {

    static navigationOptions = {
        title: 'Estimated Bill',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'} 
      }
    
     static products= [];
    // static totalBill=0;

     constructor(props) {
         super(props)

         this.state= {
             dialogVisible: false,
             itemToDel: '',
             total: 0
         }
     }

    componentWillMount() {
        console.log(Estimate.products)
        var x= parseInt(this.state.total)
        for (let index = 0; index < Estimate.products.length; index++) {
            console.log(x)
            x = x + parseInt(Estimate.products[index].total)
            console.log(x)    
        }

        this.setState({total: x})
    }

    deletedItem(){
        var y = Estimate.products.indexOf(this.state.itemToDel)
        console.log(y)
        Estimate.products.splice(y, 1)
        console.log(Estimate.products)
        var x = 0 ;
        for (let index = 0; index < Estimate.products.length; index++) {
            console.log(x)
            x = x + parseInt(Estimate.products[index].total)
            console.log(x)
        }

        this.setState({total: x})
    }

    render() {
        return (
            <ScrollView>

            <Dialog.Container visible= {this.state.dialogVisible}>
              <Dialog.Title>Remove Item</Dialog.Title>
              <Dialog.Description>Do you want to remove this item? This action cannot be undone.</Dialog.Description>
              <Dialog.Button label= 'Cancel' onPress={()=> this.setState({dialogVisible: false})}></Dialog.Button>
              <Dialog.Button label= 'Okay' onPress={()=> { this.setState({dialogVisible: false}) ; /* alert('Deleted') */ this.deletedItem();}}></Dialog.Button>  
            </Dialog.Container> 

                <View style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', backgroundColor: 'lightgray', height: 50, alignItems:'stretch'}}>
                    <Text style={styles.headings}>Product Name</Text>
                    <Text style={styles.headings}>Product Price</Text>
                    <Text style={styles.headings}>Quantity</Text>
                    <Text style={styles.headings}>Total Price</Text>
                </View>

                <FlatList
                    data= {Estimate.products}
                    keyExtractor={({item}, index) => index.toString()}
                    renderItem= {({item})=> <TouchableOpacity style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems:'stretch'}}
                    onLongPress= { () => this.setState({itemToDel: item, dialogVisible: true})}
                   >
                        <Text style={styles.products}>{item.product_name}</Text>
                        <Text style={styles.products}>{item.price}</Text>
                        <Text style={styles.products}>{item.quantity}</Text>
                        <Text style={styles.products}>{item.total}</Text>
                    </TouchableOpacity>
               }
                >
                </FlatList>

                <Text style={{marginTop: 30, fontSize: 15, alignSelf:'center', fontWeight: 'bold'}}>Total: {this.state.total}</Text>
            </ScrollView>
            
        )
    }

}

const styles= StyleSheet.create({
    headings: {
        width: '25%', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        textAlignVertical: 'center'
    },

    products: {
        marginTop: 5,
        width: '25%', 
        textAlign: 'center', 
        textAlignVertical: 'center'
    }
})

export default Estimate;