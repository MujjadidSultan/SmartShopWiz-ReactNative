import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, BackHandler} from 'react-native';

export default class Homee extends React.Component { 

    static navigationOptions = {
        title: 'Smart ShopWiz',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontSize: 40, fontWeight: 'bold'},
        headerLeft: <View></View>
      }

      constructor(props){
        super(props);
       

    }

    
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


                {/* New Code Begins */}

                
                    
                <View style= {{flex: 1, flexDirection: 'row'}}>

                <View style = {{marginTop: '5%', marginLeft: '5%', width: '40%', backgroundColor: 'skyblue'}}>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details')} style= {{position: 'absolute', alignSelf:'center'}}>
                        
                        <Image 
                            style= {{width: 100, height: 100, alignSelf: "center"  }}
                            source= {require('../images/details.png')}/>

                        <Text style={{alignSelf:'center', color: 'skyblue', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Product Details</Text>
                       
                    </TouchableOpacity>

                    </View>

                    </View>
                    </View>
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
    }
    
});
