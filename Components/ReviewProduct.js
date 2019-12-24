import React from 'react';
import {Text, View, TextInput, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import { Rating } from 'react-native-ratings';
import { getProducts, regreview } from './UserFunctions';

import StarRating from 'react-native-star-rating';

class ReviewProduct extends React.Component {

    static navigationOptions = {
        title: 'Product Review',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      }

      constructor (props) {
          super(props); 

          this.state ={

            selected: this.props.navigation.getParam('selected'),

            products : [],

            ratings: [],

          //  date: '',
         //   time: '',
            remarks: '',

            show: '',

            customer_id: this.props.navigation.getParam('customer_id'),

           ratingnow : '', 
           
           change: '',
           
           empty: '',

           success: '',

          

          }
      }

      
      
     /****************USE WITH BACKEND**********************/

      componentWillMount() {
        const products = {
          cart_id: this.state.selected
        }

        getProducts(products).then (data => {
          this.setState({products: data})
        })
      }

      /****************************************************/

      submitRatings() {

        const newRev= {
          customer_id : this.state.customer_id,
          cart_id: this.state.selected,
          review: this.state.remarks,
          ratings: this.state.ratings
        }

        regreview(newRev).then(data => {
            
          console.log(data);   

          if (data) {
            this.setState({success: 'Feedback Submitted. Please Wait.'})
            setTimeout(()=> {this.props.navigation.navigate('Account')}, 5000);
          }
      }
        )
    }

      render(){

        return (

          <ScrollView>
             <View style= {{marginTop: 20}}>
              <Text style = {{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>
                 Please Rate The Following Products
                
              </Text>
              <Text style = {{alignSelf: 'center', fontSize: 12, fontWeight: 'bold'}}>
                   (drag over the stars to rate)
              </Text>

              <View style= {{marginTop: 10, marginBottom: 10, width: '85%', alignSelf: 'center'}}>

              <FlatList
              data= {this.state.products}
              keyExtractor={({item}, index) => index.toString()}
              renderItem={({item}) => <View><Text style= {{fontSize: 15, fontWeight: 'bold', alignSelf: 'center'}}>{item.product_name}</Text>

               <Rating
              //  type='heart'
                style={{width: '80%', alignSelf: 'center'}}
                readonly={false}
                startingValue={0}
                ratingCount={5}
                imageSize={40}
                showRating
                onFinishRating={(rating)=> {const obj = {'product_id': item.product_id, 'rating' : rating} ; this.state.ratings.push(obj); /*console.log(this.state.ratings);*/ }}
                />
              
              </View>}
              >

              </FlatList>

              

              </View>

              <View>
                <Text style= {{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>Comments/Remarks</Text>
                <TextInput style= {{marginTop: 10, alignSelf: 'center', width: '80%', height: 50, borderColor: 'lightgray', borderWidth: 2}} onChangeText = {(val) => this.setState({remarks: val, empty: '', success: ''})}></TextInput>
              </View>

              {!!this.state.empty && (<Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 20}}>{this.state.empty}</Text>)}

              <View>
                <TouchableOpacity style= {{width: '30%', marginTop: 10, height: 30, alignSelf:'center', borderWidth: 1, borderRadius: 15, borderColor: 'lightgrey', backgroundColor: 'skyblue', marginBottom: 10}}
                onPress= {()=> {
                  if (this.state.remarks.trim() == '') {

                    this.setState({empty: 'Please Provide Some Feedback'})
                  
                  }
                  
                  else {
                    this.submitRatings()} 
                  }
                
                }>
                  <Text style= {{alignSelf: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize: 15}}>OKAY</Text>
                </TouchableOpacity>
              </View>

              {!!this.state.success && (<Text style= {{color: 'blue' , alignSelf: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 20}}>{this.state.success}</Text>)}

              </View>
 
          </ScrollView>
        )
      }
}



export default ReviewProduct;