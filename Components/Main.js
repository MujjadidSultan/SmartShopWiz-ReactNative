import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground} from 'react-native';



class Main extends React.Component {

    static navigationOptions = {
        title: 'Smart ShopWiz',
        headerStyle: { backgroundColor: 'skyblue'},
        headerTitleStyle: { color: 'white', fontSize: 40, fontWeight: 'bold', marginLeft: '18%'},
      }

    render() {
        return (
            <View>

                <ImageBackground
                     style= {{width: '100%', height: '100%'}}
                     resizeMode= {'cover'}
                     source= {require('../images/main2.jpg')}
                >

                <View style={{marginTop: '20%'}}> 

                <View style= {{ width: '35%', height: '35%', alignSelf:'center'}}>

                <TouchableOpacity onPress={()=>  this.props.navigation.navigate('SignUp')}>
                    <Image 
                        style= {{width: '100%', height: '100%', alignSelf: "center"  }}
                        source= {require('../images/signup.png')}/>
                  </TouchableOpacity>

                </View>

                <View style= {{ marginTop: '5%', width: '40%', height:'20%', alignSelf:'center'}}>

                <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 25, fontWeight: 'bold'}}>(Sign Up)</Text>
    
                </View>

                <View style= {{ width: '35%', height: '30%', alignSelf:'center'}}>
                     <TouchableOpacity onPress={()=>  this.props.navigation.navigate('LogIn')}>
                    <Image 
                        style= {{width: '100%', height: '100%', alignSelf: "center"  }}
                        source= {require('../images/login.png')}/>
                  </TouchableOpacity>

                </View>

                <View style= {{marginTop: '8%',  width: '40%', alignSelf:'center'}}>

                     <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 25, fontWeight: 'bold'}}>(Log In)</Text>

                </View>

                </View>

                </ImageBackground>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       // justifyContent: 'center',
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
        fontSize: 40,
       // height: "10%",
        color: 'white'
    },

    button : {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        fontWeight: 'bold',
        fontSize : 10,
    }


    
});

export default Main;