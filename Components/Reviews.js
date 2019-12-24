import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { getallcarts } from './UserFunctions';

class Reviews extends React.Component {

    static navigationOptions = {
        title: 'Review Products',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
    }

    constructor(props){
        super(props);

        this.state= {
            selected: '',
            name: '',
            review_data :[],

            customer_id: this.props.navigation.getParam('customer_id')

        }
      
    
    }

    /********************USE WITH BACKEND******************/

    componentWillMount() {
          getallcarts().then(data => {
            this.setState({review_data: data}, () => console.log(this.state.review_data))
          })
    }

   /********************************************************/


    render(){
        return (

            <View style= {{flex: 1, paddingTop: 10}}>

                <FlatList
                    data= {this.state.review_data}
                    keyExtractor={({item}, index) => index.toString()}
                    renderItem={({item}) => <TouchableOpacity style={styles.item} onPress = {()=> this.props.navigation.navigate('ReviewProduct', {selected: item.cart_id, customer_id: this.state.customer_id})}
                    ><Text style= {{fontSize: 18, fontWeight: 'bold'}}>Review Products</Text>
                    <Text style= {{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Purchased On {item.date} At {item.time}</Text>
                    </TouchableOpacity>}

                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    item: {
      padding: 10,
    //  fontSize: 18,
      height: 75,
      borderBottomWidth: 2,
      borderBottomColor: 'lightgray',
      fontWeight: 'bold'
    },
  })

  

export default Reviews;