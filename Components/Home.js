import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, BackHandler, ScrollView, FlatList} from 'react-native';
import { getprods, getprodrec } from './UserFunctions';

const add = 'http://yourip:5000/products/'

class Home extends React.Component { 

    static navigationOptions = {
        title: 'Smart ShopWiz',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontSize: 40, fontWeight: 'bold'},
        headerLeft: <View></View>
      }

      constructor(props){
        super(props);
        
        this.state ={
            products : [],
            product_id: ''
        }

    }

    componentWillMount() {
        getprodrec().then(data => {
            // console.log(data);
             this.setState({products: data}, ()=> console.log(this.state.products))
    })
    } 

    onRecommend() {
        console.log(this.state.product_id)
    }

   /* componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {return true})
     }  */

    
    render() {
        return (

         /*   <ImageBackground
                style= {{width: '100%', height: '100%'}}
                resizeMode= {'cover'}
                source= {require('../images/home.jpg')}
            > */

            <View>

                <View style= {styles.top}>

                <View style= {{flex: 1, flexDirection: 'row', borderRightWidth: 1, borderStyle: 'solid', borderColor: 'white'}}>

                    <View style= {{width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue'}}>
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                            <Text style= {{color: 'white', fontWeight: 'bold', fontSize: 20}}>Home</Text>
                       </TouchableOpacity>
                    </View>

                    <View style= {{width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue'}}>
                        <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Account')}>
                            <Text style= {{color: 'white', fontWeight: 'bold', fontSize: 20}}>Account</Text>
                        </TouchableOpacity>
                    </View>    

                </View>

                </View>

                <ScrollView>


                {/* New Code Begins */}

                <View>
                    
                <View style= {{flex: 1, flexDirection: 'row'}}>

                <View style = {{marginTop: '5%', marginLeft: '5%', width: '40%'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Details')} style= {{position: 'absolute', alignSelf:'center'}}>
                        <Image 
                            style= {{width: 100, height: 100, alignSelf: "center"  }}
                            source= {require('../images/details.png')}/>

                        <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Product Details</Text>
                    </TouchableOpacity>   
                </View>

                  

                    <View style = {{marginTop: '5%', marginLeft: '10%', width: '40%'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Finder')} style= {{position: 'absolute', alignSelf:'center'}}>
                        <Image 
                            style= {{width: 100, height: 100, alignSelf: "center"  }}
                            source= {require('../images/search2.png')}/>

                        <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Product Finder</Text>
                    </TouchableOpacity>   
                    </View>

                    </View>

                    

                    <View style= {{flex: 1, flexDirection: 'row', marginTop: 100}}>

                    <View style = {{marginTop: '20%', marginLeft: '5%', width: '40%'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Bill')} style= {{position: 'absolute', alignSelf:'center'}}>
                        <Image 
                            style= {{width: 100, height: 100, alignSelf: "center"  }}
                            source= {require('../images/bill2.png')}/>

                        <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Bill Confirmation</Text>
                    </TouchableOpacity>   
                </View>

                    <View style = {{marginTop: '20%', marginLeft: '10%', width: '40%'}}>
                    <TouchableOpacity onPress={()=>  this.props.navigation.navigate('Locate')} style= {{position: 'absolute', alignSelf:'center'}}>
                        <Image 
                            style= {{width: 100, height: 100, alignSelf: "center"  }}
                            source= {require('../images/locate.png')}/>
                        <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Contact Details</Text>  
                    </TouchableOpacity>   
                    </View>

                    </View>

                    </View>

                    <View>

                    <View style={{width: '100%', backgroundColor: 'skyblue', height: 30, marginTop: '50%'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center'}}>Recommended Products</Text>
                    </View>

                  
                        
                    <ScrollView>
                        <FlatList
                            data= {this.state.products}
                         //  horizontal= {true}
                            style= {{marginTop: 5, marginBottom: 15}}
                            keyExtractor={({item}, index) => index.toString()}
                            renderItem={({item}) => 
                            
                            <View style= {{flex: 1, flexDirection: 'row', width: '100%'}}> 
        
                            <View style={{width: '30%'}}>
                              <TouchableOpacity style={styles.item} 
                                onPress= {()=> {
                                  this.props.navigation.navigate('Product', 
                                  {prod_id: item.product_id, prod_name: item.product_name, prod_price: parseInt(item.price), prod_quantity: parseInt(item.product_quantity) ,
                                  prod_category: item.category_name, prod_image: item.product_image, prod_rating: parseInt(item.rating), prod_status: item.status.toLowerCase(),
                                  prod_description: item.description }) 
                              }}>
                                <Image
                                    style= {{width: '95%', height: '95%', alignSelf: 'center', marginBottom: 2, marginTop: 2}}
                                    source= {{uri: add + item.product_image}}
                                >
                                </Image>
                              </TouchableOpacity>
                            </View>
                  
                            <View style={{width: '70%'}}>
                              <TouchableOpacity style= {styles.item}
                               onPress= {()=> {
                                this.props.navigation.navigate('Product', 
                                {prod_id: item.product_id, prod_name: item.product_name, prod_price: parseInt(item.price), prod_quantity: parseInt(item.product_quantity) ,
                                prod_category: item.category_name, prod_image: item.product_image, prod_rating: parseInt(item.rating), prod_status: item.status.toLowerCase(),
                                prod_description: item.description }) 
                            }}>
                                <Text style= {{fontSize: 20, fontWeight: 'bold'}} numberOfLines= {1}>{item.product_name}</Text>
                                <Text style= {{fontSize : 15}}>{item.category_name}</Text>
                                
                                <Text style ={{fontSize: 15}} numberOfLin= {2}>{item.description}</Text>
                                {item.status.toLowerCase() == 'available' && (<Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>In Stock</Text>)}
                                {item.status.toLowerCase() !== 'available' && (<Text style= {{fontStyle: 'italic', fontWeight: 'bold'}}>Out Of Stock</Text>)}
                              </TouchableOpacity>
                  
                            </View>
                           </View>} 
                        />
                    </ScrollView>
                

                    </View>
               
                 {/* New Code Ends */}

            </ScrollView>

            </View>

              
    /*  </ImageBackground> */


            
        )
    }
}

const styles = StyleSheet.create({
    
    top: {
       // flex: 1,
       // flexDirection: 'horizontal',
        marginTop: '1%',
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        //color: 'white',
        backgroundColor: 'skyblue',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderStyle: 'solid'
    },

    header : {
        backgroundColor: 'skyblue',
       // float: 'top',
      //  flex: 1,
      //  justifyContent: 'center',
     //   alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        fontSize: 30,
       // height: "10%",
        color: 'white'
    },

    item: {
        padding: 10,
        height: 150,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        fontWeight: 'bold'
      }
    
});
export default Home;