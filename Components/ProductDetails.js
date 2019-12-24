import React from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Rating } from 'react-native-ratings';
import Estimate from './Estimate';

const add = 'http://yourip:5000/products/'


class ProductDetails extends React.Component {

    static navigationOptions = {
        title: 'Product Details',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
      }

      constructor(props) {
        super(props);

        this.state ={
          //  product_id : (this.props.navigation.getParam('scanned')).toString(),
            product: this.props.navigation.getParam('product'),

            all2: '',

            cart: 'closed',

            cart_quantity: 1,

            cart_products: []
           /* prod_name: 'ANY PRODUCT',
            prod_price: '400',
            prod_avail: 'Yes',
            prod_desc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccc',
            prod_quantity: '50',
            prod_reviews: [{key: '11', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh'},
            {key: '12', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '13', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '14', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '15', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '16', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '17', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhhfffffhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjtttttttttttttttttttttttnnnnnnnnnnnnnnnnnnnnnsssssssssssssssssssssssssbbbbbbbbbbbbbbbbbbbbbbbbbbbbssssssssssssssssssssseeeeeeeeeeeeeeeeeeeeeeeeeeeeewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwccccccccccccccccccccccccccccccccccccwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwee' },
            {key: '18', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '19', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhh' },
            {key: '20', username: 'hajraata', date: '01/01/2019', time:'14:54', review: 'aaaaaaabbbbbbbcccccdddddeeeeeffffgggghhhhfffffhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjtttttttttttttttttttttttnnnnnnnnnnnnnnnnnnnnnsssssssssssssssssssssssssbbbbbbbbbbbbbbbbbbbbbbbbbbbbssssssssssssssssssssseeeeeeeeeeeeeeeeeeeeeeeeeeeeewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwccccccccccccccccccccccccccccccccccccwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwee' },
            ], */
        }
    }

     /****************USE WITH BACKEND**********************

    componentWillMount() {

        console.log(this.state.product_id);

        const detproduct ={
            product_id: this.state.product_id
        }

        proddetails(detproduct).then(data =>{
            this.setState({product: data[0]})
            console.log(this.state.product)
        }).catch(err => {
            console.log(err)
        }) 
    }

    *********************************************************/
    cart_prod() {
        var total = (this.state.cart_quantity * this.state.product.price)

        var obj= {'product_name' : this.state.product.product_name, 'quantity' : this.state.cart_quantity, 'price' : this.state.product.price, 'total' : total}

        Estimate.products.push(obj);

        console.log(Estimate.products)
    }

   render () {
    return (
        <ScrollView>

                    <View style= {{width: '90%', alignSelf:'center', marginTop:20}}>
                        <Text style= {{fontSize: 20, fontWeight: 'bold', alignSelf:'center'}} numberOfLines={1}>{this.state.product.product_name}</Text>
                    </View>

                    <View style= {{width: '90%', alignSelf:'center', marginTop:20}}>
                    <Rating
              //  type='heart'
                      readonly={true}
                      startingValue={parseInt(this.state.product.rating)}
                      ratingCount={5}
                      imageSize={40}
                     // showRating
                    //  onFinishRating={(rating)=> {const obj = {'product_id': item.product_id, 'rating' : rating} ; this.state.ratings.push(obj); console.log(this.state.ratings);}}
                      />
                    </View>

                    {this.state.cart== 'closed' && (
                      <View style={{width: '90%', marginTop:10, alignSelf:'center'}}>
                        <TouchableOpacity style= {{width: '60%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue'}}
                          onPress = {() => {this.setState({cart: 'opened'})}}>
                          <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>ADD TO BILL ESTIMATION</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {this.state.cart== 'opened' && (
                      <View style= {{borderWidth: 2, borderColor: 'lightgray', margin: 5}}>
                        <Text style={{color: 'blue', fontSize: 12, fontWeight: 'bold', alignSelf:'center'}}>*Ths is for total bill estimation only. It is not your shopping cart.</Text>
                        <View style={{flex: 1, flexDirection: 'row', height: 40, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 10}}>
                          <Text style={{alignSelf:'center', fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center'}}>Quantity To Add: </Text>
                          <NumericInput type='up-down' editable= {false} totalWidth={100} totalHeight={40} rounded= {true} value={this.state.cart_quantity} upDownButtonsBackgroundColor= 'skyblue' onChange={value => this.setState({cart_quantity: value})} minValue={1} maxValue={parseInt(this.state.product.quantity)} /> 
                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                            onPress= {() => { 
                              if (this.state.cart_quantity !== "") {
                                this.setState({cart : 'closed'}, () => {this.cart_prod()}) 
                              }
                              else {
                                this.setState({all2: 'Please Choose A Quantity To Add To Cart'})
                              }
                            }}>

                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>OKAY</Text>
                          </TouchableOpacity>
                        </View>

                        <View style= {{width: '90%', alignSelf: 'center'}}>
                          <TouchableOpacity style= {{width: '40%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                           onPress={()=> {this.setState({cart: 'closed', cart_quantity: 1})}}>
                            <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>CANCEL</Text>
                          </TouchableOpacity>
                        </View>
                      
                      </View>
                    )}

                    <View style= {{marginTop: 20, borderBottomWidth: 2, borderColor: 'lightgray', borderTopWidth: 2, height: 300}}>
                        <Image
                            style= {{width: '80%', height: '95%', alignSelf: 'center', marginBottom: 10, marginTop: 10}}
                            source= {{uri: add + this.state.product.product_image}}
                        >
                        </Image>
                    </View>

                    <View style= {{marginTop:20, borderBottomWidth: 2, borderColor: 'lightgray'}}>

                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Price: <Text style= {{fontWeight:'normal'}}>{this.state.product.price}</Text></Text>
                            <Text>         </Text>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Availability: {this.state.product.status.toLowerCase() == 'available' && (<Text style= {{fontWeight:'normal'}}> In Stock</Text>)} {this.state.product.status.toLowerCase() !== 'available' && (<Text style= {{fontWeight:'normal'}}> Out Of Stock</Text>)}</Text>
                        </View>

                        <View style= {{marginTop:10, marginBottom: 20}}>
                            <Text style= {{fontWeight:'bold', alignSelf: 'center', fontSize: 15}}>Product Details/Description </Text>
                            <Text style={{width: '90%', alignSelf:'center'}} numberOfLines= {2}>{this.state.product.description}</Text>
                        </View>

                    </View>



                    {/*<View style={{width: '90%', alignSelf:'center', marginTop: 20}}>
                        <Text style= {{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>Reviews</Text>
                        <FlatList
                            data= {this.state.prod_reviews}
                            renderItem={({item}) => <View style={styles.item}><Text style= {{fontSize: 15, fontWeight:'bold'}}>{item.username}</Text>
                            <Text style={{fontSize: 12, color: 'lightgray'}}>{item.date}  {item.time}</Text>
                            <Text style= {{marginTop: 10}}>{item.review}</Text></View>}
                        />
                     </View> */}

            </ScrollView>
    )
}

}

const styles = StyleSheet.create({
item: {
  padding: 10,
 // fontSize: 18,
//  height: 44,
  borderBottomWidth: 1,
  borderBottomColor: 'lightgray',
  fontWeight: 'bold'
},
})



export default ProductDetails;