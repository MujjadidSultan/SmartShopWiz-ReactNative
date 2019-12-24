import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';

class SideMenu extends React.Component { 

    render(){
        return(
          <View
                style= {{backgroundColor: 'skyblue', height: '100%'}}>
                <View>
                    <TouchableOpacity>
                        <View>
                            <Text>Change Password</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <View>
                            <Text>Change Pasword</Text>
                        </View>

                    </TouchableOpacity>
                </View>
        </View> 

        )
    }
}

export default SideMenu;