import React from 'React';
import {Text, View, StyleSheet,TouchableOpacity, Image, ScrollView, FlatList, ImageBackground} from 'react-native';
import { SearchableFlatList } from "react-native-searchable-list";
import {Dropdown} from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import { getprods, getcategories, getsubcategories} from './UserFunctions';

const add = 'http://yourip:5000/products/'

const add2= 'http://yourip:5000/categories/'


class Finder extends React.Component {

  static navigationOptions = {
    title: 'Products',
    headerStyle: { backgroundColor: 'skyblue' },
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},
   // headerRight: <TouchableOpacity onPress= {()=> Finder.goTo()}><Image style={{height: 50, width: 50, marginRight: 10}} source={require('../images/estimate.png')}/></TouchableOpacity> 
  }

 constructor(props) {
   super(props);

   this.state= {
     prod_id: '',
     prod_name: '',
     prod_category: '',
     prod_status: '',
     prod_quantity: '',
     prod_description: '',
     prod_image: '',
     prod_price: '',
     prod_rating: '',
     search: '',
     searchAtt: 'product_name',
     category: 'All',
     subcategory: '',
     datalist: [],
     flatdata: [],
     categories: [{category_name : "All", category_image : "all.jpg"}],
    // categorydrop: [{value: 'All'}],
     subcategories: [],
     subdata: [],
     subcategorydrop: [{value: 'All'}],
     cat_id : ''

   }
 }

  onCategory() {  // NO ERROR HERE
   
    if (this.state.category.trim()==='All') {
      this.setState({flatdata: this.state.datalist})
    }

    else {
    let filterdata = this.state.datalist;

    this.setState({flatdata : filterdata.filter(item => {
      if (item.category_name.trim()== this.state.category) {
        return item
      }
    })}, () => this.setState({subdata: this.state.flatdata, subcategorydrop: [{value: 'All'}]}, ()=> {
    console.log(this.state.subdata);
    let subs = this.state.subcategories;
    for (let i = 0; i < subs.length; i++) {
      if (subs[i].category_id == this.state.cat_id){
        var obj = {value: subs[i].subcategory}
        this.state.subcategorydrop.push(obj)
      } 
    }

    console.log(this.state.subcategorydrop)
    console.log(this.state.subcategorydrop.length)
  /*  this.setState({subcategorydrop: subs.filter(item=> {
      if(item.category_id.trim()== this.state.cat_id) {
        return item.subcategory_name
      }
    }) }) */
  
  })) 
    
    
 //   this.setState({subdata: this.state.flatdata}, ()=> console.log(this.state.subdata))
  }
  }; 

  onSubCategory() {
    if (this.state.subcategory.trim()==='All') {
      this.setState({flatdata: this.state.subdata}, ()=>console.log(this.state.flatdata))
    }

    else {
      let filtersub = this.state.subdata;
      
      console.log(filtersub);

      this.setState({flatdata: []}, () => 
        {
          this.setState({flatdata : filtersub.filter(item => {
            if (item.subcategory_name.trim()== this.state.subcategory) {
              return item
            }
          })}) 
        }
      )
    }
  }


  /****************USE WITH BACKEND*********************/
  
  componentWillMount() {
    getprods().then(data => {
     // console.log(data);
      this.setState({datalist: data, flatdata: data}, ()=> console.log(this.state.datalist))

      
    });

   /* getcategories().then(data => {
    //  console.log(data);
      {for (let i = 0; i < data.length; i++) {
        const obj = {'value': data[i].category_name};
        this.state.categorydrop.push(obj);  
      }};

      console.log(this.state.categorydrop);
        
    }); */

    getcategories().then(data => {
        console.log(data);
        {for (let i = 0; i < data.length; i++) {
          const obj = {'category_name': data[i].category_name, 'category_image' : data[i].category_image, 'category_id': data[i].category_id};
          this.state.categories.push(obj);  
        }};
  
      //  this.setState({categories: data})
  
        console.log(this.state.categories);
          
      });

    getsubcategories().then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var obj = {'subcategory': data[i].subcategory_name, 'category_id': data[i].category_id}
        this.state.subcategories.push(obj);
      }; console.log(this.state.subcategories)
      })
  } 
  
 /************************************/


  render() {


    return (

      <ScrollView>

      <View style= {{marginTop: '5%'}}>

      <TextInput placeholder= 'Type Product Name Here' placeholderTextColor='skyblue' style= {{ borderColor: 'darkgray', backgroundColor:'white', borderRadius: 10, textAlign: 'center', color:'black', borderWidth: 2, borderStyle: 'solid',
       width: '95%', alignSelf: 'center'}} underlineColor="transparent" 
       onChangeText={(val)=> {this.setState({search: val})}}>

      </TextInput>

      </View>

    {/*  <View style= {{width: '80%', alignSelf: 'center'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginTop: '2%'}}>Browse By Category:</Text>
        <Dropdown
          style={{flex: 1}}
          label={'--Select Category--'}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          onChangeText= {(value)=> { this.setState({category: value}); this.onCategory()}}
          data={this.state.categorydrop}
        >
        </Dropdown>
    </View> */}
    <View style= {{marginTop: 10, width: '100%', justifyContent: 'center'}}>
      <Text style= {{alignSelf: 'center', color: 'skyblue', fontSize: 15, fontWeight: 'bold'}}>Product Categories</Text>
    </View>

    <ScrollView style= {{height: 100, width: '95%', alignSelf: 'center'}}>
      <FlatList
        data= {this.state.categories}
        horizontal= {true}
        style= {{marginTop: 15}}
        keyExtractor={({item}, index) => index.toString()}
        renderItem={({item}) => <TouchableOpacity onPress = {()=> this.setState({category: item.category_name, cat_id: item.category_id}, ()=> this.onCategory())}><ImageBackground source= {{uri: add2 + item.category_image}} style= {{height: 90, width: 120, marginLeft: 5, marginRight: 5, alignContent: 'center', justifyContent: 'center'}}><Text style= {{color: 'black', fontWeight: 'bold', alignSelf:'center', fontSize: 20, backgroundColor: 'rgba(192,192,192,0.8)'}}>{item.category_name}</Text></ImageBackground></TouchableOpacity>}
      />
    </ScrollView>

 { this.state.category!== 'All' && (
    <View style= {{width: '80%', alignSelf: 'center'}}>
    <Text style={{fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginTop: '2%', color: 'skyblue'}}>Filter By Subcategory:</Text>
    <Dropdown
      style={{flex: 1}}
      label={'--Select Subcategory--'}
     // value={this.state.subcategorydrop[0].value}
      bgColor={'white'}
      tintColor={'#666666'}
      activityTintColor={'green'}
      onChangeText= {(value)=> {this.setState({subcategory: value}, ()=> this.onSubCategory())}}
      data={this.state.subcategorydrop}
    >
    </Dropdown>
 </View> )}

     

      <View style={{borderTop: '3%'}}>
    
      <SearchableFlatList
         
        data={this.state.flatdata} searchTerm={this.state.search}
        style= {styles.container}
        searchAttribute={this.state.searchAtt} ignoreCase={true}
        keyExtractor={({item}, index) => index.toString()}
        renderItem={({item}) =>
        
        <View style= {{flex: 1, flexDirection: 'row', width: '95%'}}> 
        
          <View style={{width: '40%'}}>
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

          <View style={{width: '60%'}}>
            <TouchableOpacity style= {styles.item}
             onPress= {()=> {
              this.props.navigation.navigate('Product', 
              {prod_id: item.product_id, prod_name: item.product_name, prod_price: parseInt(item.price), prod_quantity: parseInt(item.product_quantity) ,
              prod_category: item.category_name, prod_image: item.product_image, prod_rating: parseInt(item.rating), prod_status: item.status.toLowerCase(),
              prod_description: item.description }) 
          }}>
              <Text style= {{fontSize: 20, fontWeight: 'bold'}} numberOfLines={1}>{item.product_name}</Text>
              <Text style= {{fontSize : 15}}>{item.category_name}</Text>
              
              <Text style ={{fontSize: 15}} numberOfLines= {2}>{item.description}</Text>
              {item.status.toLowerCase() == 'available' && (<Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>In Stock</Text>)}
              {item.status.toLowerCase() !== 'available' && (<Text style= {{fontStyle: 'italic', fontWeight: 'bold'}}>Out Of Stock</Text>)}
            </TouchableOpacity>

          </View>
         </View>}
         />

      </View>

  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   paddingTop: 10
  },
  item: {
    padding: 10,
    height: 150,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    fontWeight: 'bold'
  },
})

export default Finder;