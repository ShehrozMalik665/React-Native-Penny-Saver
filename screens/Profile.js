import { StyleSheet, Text, View,TextInput,Dimensions,Alert,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateUserData } from '../functions/firebasefunction';
import { SelectList } from 'react-native-dropdown-select-list'
import { currencydata } from '../data/currencyData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const {width,height} = Dimensions.get('screen');
const Profile = () => {
  const navigation = useNavigation();
  const [content, setcontent] = useState([]);
  const [currencycode, setcurrencycode] = useState('');
  const [currencyname, setcurrencyname] = useState('')
  const [mail,setmail] = useState('');
  const [password,setpassword] = useState('');
  const [username, setusername] = useState('');
  // const [img, setimg] = useState('');
  const [editdetails, seteditdetails] = useState(false);
  const signOut = () => {
    auth()
  .signOut()
  .then(() => {
    console.log('User signed out!');
    navigation.navigate('Home');
  }).
  catch((error)=> {
    Alert.alert('Error',error.message);
  })
  }
  const getData = async() => {
    try{
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      var addressIncome = '/myuserDetails/'+uid+'/';
      database()
    .ref(addressIncome)
    .on('value', snapshot => {
      const len = snapshot.val();
      if(len!==null){
        const v = snapshot.val();
        setcurrencycode(v.currencycode);
        setcurrencyname(v.currencyname);
        setmail(v.email);
        setusername(v.name);
        setpassword(v.password);
      }
    })
    } catch(err){
      console.log(err,"error");
    }
   
  }
  const selectingItem = (val) => {
    const filterdata = content.find((i)=> {
      return i.value===val;
    })
    //currency code
    setcurrencycode(filterdata.code);
    //currency name
    setcurrencyname(val)
  }
  useEffect(()=>{
    const arr = currencydata.map((i)=>{
      return({
        id:i.id,
        value:i.countryName,
        code:i.currencyCode,
      })
    })
    setcontent(arr);
    getData();
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>Profile</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView mb='70px' style={{backgroundColor:'white'}}>
        <View style={styles.inputContainer}>
        <View style={styles.logo}>
            <FontAwesome5 name='user-alt' color='#00A58F' size={28}/>
          </View>
          <View>
          <TextInput placeholder='Your Name'
          style={[styles.textInput,{color:'grey'}]}
          value={username}
          onChangeText={(val)=> setusername(val)}
          placeholderTextColor = "grey" 
          editable={editdetails}
          />
          </View>
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.logo}>
            <Entypo name='mail' color='#00A58F' size={28}/>
          </View>  
        <View>
          <TextInput placeholder='Your Email'
          style={[styles.textInput,{color:'grey'}]}
          value={mail}
          onChangeText={(val)=> setmail(val)}
          placeholderTextColor = "grey" 
          editable={false}
          />
          </View>
        </View>
        <View style={styles.dropdown}>
        <View style={styles.logo}>
        <MaterialCommunityIcons name='currency-usd' color='#00A58F' size={30}/>
          </View>  
        <View style={{width:300}}>
          <SelectList
          boxStyles={[styles.textInput,{color:'grey',borderColor:'white',width:200}]}
          setSelected={(val) => selectingItem(val)} 
          data={content} 
          save="value"
          placeholder={<Text style={{fontSize:18}}>{currencyname}</Text>}
          fontSize={18}
          maxHeight={80}
          arrowicon={<Text></Text>}
          editable={editdetails}
          />
          </View>
        </View>
        <View style={styles.detailContainer}>
        </View>
        <View>
        <TouchableOpacity style={[styles.button,{backgroundColor:'white',borderColor:'#00A58F',borderWidth:1}]}
        onPress={()=> {
          seteditdetails(!editdetails)
          if(editdetails!==true){
            console.log('====================================');
            console.log(editdetails);
            console.log('====================================');
          }
          else{
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            const addresss = '/myuserDetails/'+uid+'/';
            const obj = {
              id:uid,
              name:username,
              email:mail,
              password:password,
              //imgurl:img,
              currencycode:currencycode,
              currencyname:currencyname,
            }
            updateUserData(obj,addresss);
          }
        }}>
          <Text style={[styles.buttontext,{color:'#00A58F'}]}>{editdetails? 'Save Changes' : 'Edit details'}</Text>
        
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.button}
        onPress={signOut}>
          <Text style={styles.buttontext}>Sign out</Text>
        
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#00A58F'
    },
  header:{
      flex: 1/2,
      padding:20,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor:'#00A58F'
  
    },
    headertitle:{
      fontSize:28,
      color:'white',
    },
  footer:{
      flex: 3,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
  logo:{
    justifyContent:'center',
    alignItems:'center',
    height:50,
  }
  ,
  detailContainer:{
      flexDirection:'row',
      justifyContent:'flex-start',
      marginVertical:10,
    },
    detailtext:{
        fontSize:18,
        color:'grey',
        padding:5,
    },
    detailtextblack:{
        fontSize:18,
        color:'black',
        padding:5,
    },
  button:{
      marginHorizontal:5,
      marginVertical:5,
      borderRadius:10,
      height:60,
      backgroundColor:'#00A58F',
      justifyContent:'center',
      alignItems:'center'
    },
  buttontext:{
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    },
  title:{
      fontSize:16,
      fontWeight:'bold',
      textAlign:'right',
      fontStyle:'italic',
      textDecorationLine:'underline',
    }
    ,
  titleContainer:{
      marginHorizontal:10,
      marginVertical:4
    },
    inputContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:width-70,
      marginHorizontal:2,
      marginVertical:10,
    },
    dropdown:{
      flexDirection:'row',
      justifyContent:'space-between',
      //width:width-70,
      marginHorizontal:2,
      marginVertical:10,

    },
  input:{
      padding:10,
      fontSize:18,
      color:'grey'
    },
    textInput:{
      flex:1,
      paddingLeft: 10,
      color: '#05375a',
      fontSize:18,
      width:300,
    },
    itemdropdown:{
      flex:1,
      paddingLeft: 10,
      color: '#05375a',
      fontSize:18,
      width:100,
    },
  })