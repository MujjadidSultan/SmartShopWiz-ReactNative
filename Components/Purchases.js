import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { getHistory } from './UserFunctions';

class Purchases extends React.Component {

    static navigationOptions = {
        title: 'Purchase History',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
    }

    constructor(props) {
        super(props);

        this.state ={
           // purchase_data : [{key: '11', products: [{name: 'Hair Dye', quantity: '2', price: '150'}, {name: 'Hair Dye', quantity: '2', price: '150'}, {name: 'Hair Dye', quantity: '2', price: '150'}, {name: 'Hair Dye', quantity: '2', price: '150'}]}],

            customer_id: this.props.navigation.getParam('customer_id'),
            purchase: [],
        }
    }

    componentWillMount() {

        getHistory().then(data=> {
            console.log(data);
            this.setState({purchase: data});
        })
    }

    render(){

       // let i = 0;
        

        return (
            <View>
                <FlatList
                data= {this.state.purchase}
                keyExtractor={({item}, index) => index.toString()}
                renderItem={({item})=> <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate('ViewPurchase', {cart_id: item.cart_id})}
                style={styles.list}><Text style= {{fontSize: 18, fontWeight: 'bold'}}>Purchased Items History</Text><Text style={{fontSize: 15, fontWeight: 'bold', color: 'lightgray'}}>Purchase Made On {item.date} At {item.time}</Text></TouchableOpacity>}
                >
                </FlatList>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 2, 
        borderColor: 'lightgray',
        padding: 15
    }
})

export default Purchases;