import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
//import DropdownMenu from 'react-native-dropdown-menu';
import {Dropdown} from 'react-native-material-dropdown';

import regreview from './UserFunctions';


class NewReview extends React.Component {

    static navigationOptions = {
        title: 'Product Review',
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      }

      constructor(props) {
        super(props);

        this.state = {
            customer_id: this.props.navigation.getParam('customer_id'),
            date: '',
            time: '',
            prod: '',
            review: '',

            empty:'',
            success:'',

            selected: this.props.navigation.getParam('selected')





        }

    }

    testReview() {
      let rev_date = new Date().getDate() + "/" + (parseInt(new Date().getUTCMonth()) + 1) + "/" + new Date().getFullYear()
      let rev_time = new Date().getHours() + ":" + new Date().getMinutes()

      this.setState({date: rev_date, time: rev_time})

      this.setState(()=> ({success: 'Review Submitted Successfully'}))

      
    }

    onReview() {

      let rev_date = new Date().getDate() + "/" + (parseInt(new Date().getUTCMonth()) + 1) + "/" + new Date().getFullYear()
      let rev_time = new Date().getHours() + ":" + new Date().getMinutes()

      this.setState({date: rev_date, time: rev_time})

        const newRev = {
            customer_id: this.state.customer_id,
            date: this.state.date,
            time: this.state.time,
            prod: this.state.prod,
            review: this.state.review
        }

        regreview(newRev).then(data => {
            
            console.log(data);   
        })
    };

  /*  componentWillMount(){
      _retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('usertoken');
            if (value !== null) {
              // We have data!!
              console.log(value);
              const decoded= jwt_decode(value); 
             // console.log(decoded);
             // console.log(decoded.identity.address.city);

              this.setState({email: decoded.identity.email, username: decoded.identity.username});
              console.log(this.state.username); // testing
            }
          } catch (error) {
            // Error retrieving data
          }
        };

          _retrieveData();
      }

        // alert(this.state.selected) /* testing */
      
  


    render() {

        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }
        ];
    return (
      <View>
          <View style= {{marginTop: '5%'}}>
              <Text style = {{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>
                 Please Select A Product To Review
              </Text>
          </View>

        <View style= {{marginTop: '5%', alignSelf: 'center', width: '80%'}}>
        <Dropdown
          style={{flex: 1}}
          label={'--Select--'}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          onChangeText= {(value)=> this.setState({prod: value})}
          data={data}
        >
        </Dropdown>
        </View>

        {!!this.state.empty && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '3%'}}>{this.state.empty}</Text>)}

        <Text style= {{marginTop: '5%', alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>Review Details</Text>

        <TextInput style = {{ marginTop: '5%', height: '30%', width: '80%', borderColor: 'black', alignSelf: 'center',  borderRadius: 10, borderWidth: 2, padding: 10, textAlignVertical: 'top'}} multiline = {true} onChangeText= {(val)=> this.setState({review: val, empty: null, success: null})}></TextInput>

        {!!this.state.success && ( <Text style={{ color: "blue" , fontSize:20, alignSelf: 'center', marginTop: '5%', fontWeight: 'bold'}}>{this.state.success}</Text>)}

        <View style ={{marginLeft: '30%', marginRight: '30%', marginTop: '10%'}}>
                    <Button
                        title= 'Submit Review'
                        color= 'skyblue'
                        onPress={()=> {

                            if (this.state.review.trim()==="") {
                                this.setState(() => ({ empty: 'Review Details Are Required'}));
                            }
                            
                            else {
                                //onReview()

                               // this.setState(()=> ({success: 'Review Submitted Successfully'})) /* testing */

                               testReview() //testing
                            }
                        }
                    }
                    />

                </View>
 
      </View>
    );
  }
}

export default NewReview;