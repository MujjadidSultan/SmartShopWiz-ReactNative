import React from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';


export default class Locate extends React.Component {

  static navigationOptions = {
    title: 'Contact And Location',
    headerStyle: { backgroundColor: 'skyblue' },
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},    
  }

  render() {
    return (
     <View style= {{width: '80%', alignSelf: 'center'}}>
      
      <Text style= {{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>Conatct Us</Text>
      <Text style= {{fontSize: 15, fontWeight: 'bold'}}>Address: <Text style={{fontSize: 15, fontWeight: 'normal'}}>Khanna Pul, Islamabad</Text></Text>
      <Text style= {{fontSize: 15, fontWeight: 'bold'}}>Phone: <Text style={{fontSize: 15, fontWeight: 'normal'}}>(051) 8467418</Text></Text>

      <Text style= {{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>Timings</Text>
      <Text style= {{fontSize: 15, fontWeight: 'bold'}}>Open Hours: <Text style={{fontSize: 15, fontWeight: 'normal'}}>09:00 (9 A.M) till 23:00 (11 P.M)</Text></Text>
      
      <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=save+mart+khanna+pul&oq=save+mart+kha')}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'blue', marginTop: 20}}>Open Location On Map</Text>
      </TouchableOpacity>
    
    </View>
    );
  }
}