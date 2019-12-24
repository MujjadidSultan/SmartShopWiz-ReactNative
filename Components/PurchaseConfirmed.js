import React from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
//import { renderers } from 'react-native-popup-menu';

import {getDetails, confirmation} from './UserFunctions';


class PurchaseConfirmed extends React.Component {

    static navigationOptions = {
        title: 'Purchase Confirmation',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
        headerLeft: <View></View>
      }


    constructor(props) {
        super(props);

        this.state= {
            scanned_id: this.props.navigation.getParam('scanned'),

            purchase: [],
            totalbill: '',

            confirmed: ''

        }
    }


componentWillMount() {

    console.log(this.state.scanned_id);

    const getCart = {
        cart_id: this.state.scanned_id
    }

    getDetails(getCart).then (data => {
     
       // console.log(data);
       // console.log(data.products);
        this.setState({purchase: data.products, totalbill: data.total_bill});
    })

}

confirmPurchase() {

    const cart = {
        cart_id: this.state.scanned_id
    }

    confirmation(cart).then(data=> {
        if (data) {
            this.setState({confirmed: 'Purchase Confirmed'})
        }

        else {
            this.setState({confirmed: 'An error has occurred. Please try again later.'})
        }
    })
}

render () {
    return (
        <ScrollView>
            <View style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', backgroundColor: 'lightgray', height: 50, alignItems:'stretch'}}>
                <Text style={styles.headings}>Product Name</Text>
                <Text style={styles.headings}>Product Price</Text>
                <Text style={styles.headings}>Quantity</Text>
                <Text style={styles.headings}>Total Price</Text>
            </View>

            <FlatList
                data= {this.state.purchase}
                keyExtractor={({item}, index) => index.toString()}
                renderItem= {({item})=> <View style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems:'stretch'}}>
                <Text style={styles.products}>{item.product_name}</Text>
                <Text style={styles.products}>{item.product_price}</Text>
                <Text style={styles.products}>{item.product_quantity}</Text>
                <Text style={styles.products}>{item.product_total_price}</Text>
            </View>}
            >
            </FlatList>

            <View style={{marginTop: 20}}>
                <Text style={{width: '40%', alignSelf: 'center', fontSize: 15, fontWeight: 'bold', marginTop: 10}}>TOTAL: {this.state.totalbill} </Text>

                {this.state.confirmed.trim() === '' && (
                <TouchableOpacity style= {{backgroundColor: 'skyblue', width: '40%', height: 30, marginTop: 10, borderWidth: 1, borderColor: 'lightgray', borderRadius: 15, alignSelf:'center'}}
                    onPress= {()=> this.confirmPurchase()}
                ><Text style={{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Confirm</Text>
                
                </TouchableOpacity> )}

                {!!this.state.confirmed && (<Text style= {{alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: 'blue', marginTop: 15}}>{this.state.confirmed}</Text>)}

            </View>

            {!!this.state.confirmed && (
                <View>
                    <TouchableOpacity style= {{backgroundColor: 'skyblue', width: '40%', height: 30, marginTop: 10, borderWidth: 1, borderColor: 'lightgray', borderRadius: 15, alignSelf:'center'}}
                    onPress= {()=> this.props.navigation.navigate('Home')}
                ><Text style={{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>Home</Text>
                
                </TouchableOpacity>
                </View>
            )}
             
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

   
export default PurchaseConfirmed;