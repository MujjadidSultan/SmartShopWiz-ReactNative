import React from 'react';
import {View, Text, Linking, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';


class Help extends React.Component {

    static navigationOptions = {
        title: 'Help',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'} 
      }

     

    render () {

        let x = [{'title' : 'Change Password', 'link' : 'https://youtu.be/E4_KRq28XuY'}, {'title': 'Estimate Bill', 'link' : 'https://youtu.be/VgOAFWIOdek'}, {'title' : 'Filter Products', 'link' : 'https://youtu.be/HenYbArcD6k'}, {'title': 'Purchase Confirmation', 'link': 'https://youtu.be/YO5QvvMfHlE'}, {'title': 'Reserve Product', 'link': 'https://youtu.be/IK5UrguY0Tc'}, {'title': 'Review/Rate Products', 'link': 'https://youtu.be/KlRkAgJK3og'}, {'title': 'Search Product', 'link': 'https://youtu.be/sRpv0PN0hec'}, {'title': 'Submit Complaint', 'link': 'https://youtu.be/InaYIMKq350'}]

        return (

            <View style= {{flex: 1, padding: 15}}>
                <FlatList
                    data={x}
                    keyExtractor={({item}, index) => index.toString()}
                    renderItem={({item}) => <View style={styles.videos}>
                        <View style= {{width: '30%'}}><Image style={{height: 50, width: '90%'}} source= {require('../images/youtubeicon.png')}/></View>
                        <View style= {{width: '70%', alignContent: 'center', justifyContent: 'center'}}><TouchableOpacity 
                        onPress= {()=> Linking.openURL(item.link)}>
                            <Text style= {{fontWeight: 'bold', fontSize: 18}}>{item.title}</Text></TouchableOpacity></View>
                    </View>}
                />

            </View>

            )

    }
    
   
}

const styles= StyleSheet.create({
    videos: {
        flex: 1, 
        flexDirection: 'row',
        height: 60,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2

    }
})

export default Help;