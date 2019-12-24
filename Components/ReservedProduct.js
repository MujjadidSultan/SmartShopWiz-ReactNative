import React from 'React';
import {Text, View, StyleSheet, FlatList, ScrollView, Image} from 'react-native';
import { Rating } from 'react-native-ratings';

import { viewresproduct } from './UserFunctions';

const add = 'http://yourip:5000/products/'

class ReservedProduct extends React.Component {

    static navigationOptions = {
        title: 'Product Details',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
      }


    constructor(props) {
        super(props);

        this.state ={
            product_id : (this.props.navigation.getParam('selected')).toString(),
            product: [],

        }
    }

     /****************USE WITH BACKEND**********************/
    
    componentWillMount() {

        console.log(this.state.product_id)
        console.log(typeof(this.state.product_id))

        const vproduct = {
            product_id: this.state.product_id
        }

        console.log(vproduct.product_id)

        viewresproduct(vproduct).then(data => {
           console.log(data) 
           this.setState({product: data[0]}, () =>console.log(this.state.product))
        }).catch(err => {
            console.log(err)
        })
    }

    /***********************************************************/

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

                    <View style= {{marginTop: 20, borderBottomWidth: 2, borderColor: 'lightgray', borderTopWidth: 2, height: 300}}>
                        <Image
                            style= {{width: '80%', height: '95%', alignSelf: 'center', marginBottom: 10, marginTop: 10}}
                            source= {{uri: add+ this.state.product.product_image}}
                        >
                        </Image>
                    </View>

                    <View style= {{marginTop:20, borderBottomWidth: 2, borderColor: 'lightgray'}}>

                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Price: <Text style= {{fontWeight:'normal'}}>{this.state.product.price}</Text></Text>
                            <Text>         </Text>
                            <Text style= {{fontWeight:'bold', fontSize: 15}}>Availability: {this.state.product.status == 'Available' && (<Text style= {{fontWeight:'normal'}}> In Stock</Text>)} {this.state.product.status !== 'Available' && (<Text style= {{fontWeight:'normal'}}> Out Of Stock</Text>)}</Text>
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

export default ReservedProduct;