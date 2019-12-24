import React from 'react';
import {Text, View, FlatList, StyleSheet, ScrollView, Image} from 'react-native';
import { getCartDetails } from './UserFunctions';


class ViewPurchase extends React.Component {

    static navigationOptions = {
        title: 'Purchase Details',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
       
      } 

    constructor(props){
        super(props);

        this.state={
            cart_id: this.props.navigation.getParam('cart_id'),

            cart_products: [],

            date: '',
            time:'',
            feedback: '',
            total: '',
        }
    }

    componentWillMount(){

        const cart ={
            cart_id : this.state.cart_id
        }

        getCartDetails(cart).then(data=>{
          
            console.log(data[0].products);
            this.setState({cart_products: data[0].products, date: data[0].date, time: data[0].time, total: data[0].bill, feedback: data[0].feedback});
        })

        
    }

    render(){
        return (
            <ScrollView>

                <View style= {{width: '90%', alignSelf: 'center', marginBottom: 15, marginTop: 15, borderWidth: 2, borderColor: 'lightgray', alignItems: 'center'}}>
                    <Text style={styles.titles}>Purchase Date : <Text style={styles.data}>{this.state.date}</Text> Purchase Time: <Text style={styles.data}>{this.state.time}</Text></Text>
                    <Text style={styles.titles}>Total Bill: <Text style={styles.data}>{this.state.total}</Text></Text>
                    {this.state.feedback.trim() !== '' && (<Text style={styles.titles}>Your Feedback : <Text style={styles.data}>{this.state.feedback}</Text></Text>)}
                    {this.state.feedback.trim() == '' && (<Text style={styles.titles}>Your Feedback : <Text style={styles.data}>No Feedback Given</Text></Text>)}
                </View>
                
                <View style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', backgroundColor: 'lightgray', height: 50, alignItems:'stretch'}}>
                    <Text style={styles.headings}>Product</Text>
                    <Text style={styles.headings}>Price</Text>
                    <Text style={styles.headings}>Quantity</Text>
                    <Text style={styles.headings}>Total Price</Text>
                    <Text style={styles.headings}>Rating</Text>
                </View>


                <FlatList
                data={this.state.cart_products}
                style={{borderBottomWidth: 2, borderColor: 'lightgray', marginTop: 15, marginBottom: 15}}
                keyExtractor={({item}, index)=> index.toString()}
                renderItem={({item})=> <View style={{flex:1, flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems:'stretch'}}>
                    <Text style={styles.products}>{item.product_name}</Text>
                    <Text style={styles.products}>{item.price}</Text>
                    <Text style={styles.products}>{item.quantity}</Text>
                    <Text style={styles.products}>{item.price_total}</Text>
                    {item.rating !== 'Not rated' && (<View style={{marginTop: 5, width: '20%', flex: 1, flexDirection: 'row', alignContent: 'center'}}><Text style={{textAlign: 'center', textAlignVertical: 'center', marginLeft: 30}}>{item.rating}</Text><Image  source= {require('../images/star-icon.png')} style= {{marginBottom: 2, width: 30, height: 30, marginLeft: 10}}></Image></View>)}
                    {item.rating == 'Not rated' && (<Text style={styles.products}>Not Rated</Text>)}
                   </View>}>
                </FlatList>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headings: {
        width: '20%',
        fontSize: 15, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        textAlignVertical: 'center'
    },

    products: {

        marginTop: 10,
        width: '20%', 
        textAlign: 'center', 
        textAlignVertical: 'center',
        fontWeight: 'bold'

    },

    titles: {
        fontSize: 15, 
        fontWeight: 'bold',
        
    },

    data: {
        fontWeight: 'normal'
    }
})

export default ViewPurchase;