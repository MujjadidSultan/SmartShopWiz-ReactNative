import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import Dialog from "react-native-dialog";
import { getOneReview, delreview } from './UserFunctions';

class ViewReview extends React.Component {

    static navigationOptions = {
        title: 'Review',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
      }

    constructor(props) {
        super(props);

        this.state= {

            username: this.props.navigation.getParam('username'),


            selected: this.props.navigation.getParam('selected'),
            prod_name: this.props.navigation.getParam('name'),

            prod_review: '',
            review_date: '',

            dialogVisible: false,

           


        }
    }

    
    render() {
        return (
            <ScrollView>

            <Dialog.Container visible= {this.state.dialogVisible}>
              <Dialog.Title>Delete</Dialog.Title>
              <Dialog.Description>Do you want to delete this review? This action cannot be undone.</Dialog.Description>
              <Dialog.Button label= 'Cancel' onPress={()=> this.setState({dialogVisible: false})}></Dialog.Button>
              <Dialog.Button label= 'Okay' onPress={()=> { this.setState({dialogVisible: false}) ; alert('Deleted') /*this.deleteReview()*/ }}></Dialog.Button>  
            </Dialog.Container> 


                <View style= {{marginTop: 20, width: '90%', alignSelf: 'center', flex: 1, flexDirection: 'row'}}>
                    <Text style= {{fontSize: 20, fontWeight: 'bold', width: '70%'}}>{this.state.prod_name}</Text>
                    <View style= {{width: '30%'}}>
                        <TouchableOpacity onPress= {()=> this.setState({dialogVisible: true})}>
                        <Image
                            style= {{height: 30, width: 30, alignSelf: 'flex-end', marginRight: 20}}
                            source= {require('../images/delete.jpg')}
                        />

                        </TouchableOpacity>
                    </View>
                </View>

                <View style= {{marginTop: 5, width: '90%', alignSelf: 'center', marginBottom: 20}}>
                    <Text style ={{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>hajraata</Text>
                    <Text style ={{fontSize: 15, color: 'lightgrey', fontWeight: 'bold'}}>Reviewed On 05/05/2019</Text>
                </View>

                <View style= {{marginTop: 20, borderBottomWidth: 2, borderColor: 'lightgray', borderTopWidth: 2, height: 300}}>
                        <Image
                            style= {{width: '80%', height: '95%', alignSelf: 'center', marginBottom: 10, marginTop: 10}}
                            source= {require('../images/productimage.png')}
                        >
                        </Image>
                </View>

                <View style= {{marginTop: 20, width: '90%', alignSelf: 'center', marginBottom: 20, borderBottomWidth: 1, borderColor: 'lightgray'}}>
                    <Text style= {{marginBottom: 20}}>aaaaaaaaaaaaaaaaabbbbbbbbbbbbcccccccccsssssssssssssnnnnnnnnnnncccccccccsssssssssssssssscccccccc
                        ssssssssssssssssssscccccccaaaaaaaaaaaaaaaaaarrrrgggggggggggggggnnnnncccccccccffffffffdddddddddddddddyyyyyyyyyyyyiiiiiiiiio
                    </Text>

                </View>

            </ScrollView>
        )
    }
}

export default ViewReview;