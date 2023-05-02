import { StyleSheet, Text, View,TextInput,Dimensions,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setUserData } from '../functions/firebasefunction';
import { SelectList } from 'react-native-dropdown-select-list'
import { currencydata } from '../data/currencyData';
const {width,height} = Dimensions.get('screen');
const Signup = () => {
  const navigation = useNavigation();
  const [content, setcontent] = useState([]);
 const [selected, setSelected] = useState("");
  const [seletecdcurrencycode, setseletecdcurrencycode] = useState('');
  const [eyeopenornot, seteyeopenornot] = useState(true);
  const [securetextentryval, setsecuretextentryval] = useState(true);
  const [username, setusername] = useState('')
  const [eye, seteye] = useState('eye-with-line')
  const [mail,setmail] = useState('');
  const [password,setpassword] = useState('');
  const img = require('../assets/UserP.png');
  useEffect(()=>{
    const arr = currencydata.map((i)=>{
      return({
        id:i.id,
        value:i.countryName,
        code:i.currencyCode,
      })
    })
    setcontent(arr);
  },[])
  const selectingItem = (val) => {
    const filterdata = content.find((i)=> {
      return i.value===val;
    })
    //currency code
    setseletecdcurrencycode(filterdata.code);
    //currency name
    setSelected(val)
  }
  const signupFunction = async() => {
    try {
      if(mail.length>5 && password.length>5 && username.length!==0 && selected!==''){
        await  auth().createUserWithEmailAndPassword(mail, password)
        .then(()=>{
          console.log('User account created & signed in!');
          firebase.auth().currentUser.sendEmailVerification().then(()=>{
            const uid = firebase.auth().currentUser.uid;
            const obj = {
              id:uid,
              name:username,
              email:mail,
              password:password,
              // imgurl:img,
              currencycode:seletecdcurrencycode,
              currencyname:selected,
            }
            const addresss = 'myuserDetails/'+uid+'/';
            setUserData(obj,addresss);
            console.log('Link send');
            Alert.alert('Please Verify your Email','Check out the Link in your Inbox',[{
              onPress:()=> navigation.navigate('Login')
            }]);
          }).catch(error => {
            Alert.alert('Error',error.message);
          })
        }).catch(error=>{
         Alert.alert('Error',error.message);
        });
      }
      else{
            Alert.alert('Kindly provide valid details');
      }

    } catch (error) {
      Alert.alert('Error',error.message);    
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>Register Now</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView mb='70px' style={{backgroundColor:'white'}}>
        <View style={styles.inputContainer}>
          <View>
          <TextInput placeholder='Enter Name'
          style={[styles.textInput,{color:'grey'}]}
          value={username}
          onChangeText={(val)=> setusername(val)}
          placeholderTextColor = "grey" 
          />
          </View>
          <View style={styles.logo}>
            <FontAwesome5 name='user-alt' color='#00A58F' size={28}/>
          </View>

        </View>
        <View style={styles.inputContainer}>
          <View>
          <TextInput placeholder='Enter Email'
          style={[styles.textInput,{color:'grey'}]}
          value={mail}
          onChangeText={(val)=> setmail(val)}
          placeholderTextColor = "grey" 
          />
          </View>
          <View style={styles.logo}>
            <Entypo name='mail' color='#00A58F' size={28}/>
          </View>

        </View>
        <View style={styles.inputContainer}>
          <View>
          <TextInput placeholder='Enter Password'
          style={[styles.textInput,{color:'grey'}]}
          value={password}
          onChangeText={(val)=> setpassword(val)} 
          placeholderTextColor = "grey"
          secureTextEntry={securetextentryval} 
          />
          </View>
          <TouchableOpacity style={styles.logo}
          onPress={()=>{
            seteyeopenornot(!eyeopenornot);
            if(eyeopenornot){
              setsecuretextentryval(false);
              seteye('eye');
            }
            else{
              setsecuretextentryval(true);
              seteye('eye-with-line');

            }
          }}
          >
            <Entypo name={eye} color='#00A58F' size={28}/>
          </TouchableOpacity>

        </View>
        <View style={styles.inputContainer}>
          <View>
          <SelectList
          boxStyles={[styles.textInput,{color:'grey',borderColor:'white'}]}
          setSelected={(val) => selectingItem(val)} 
          data={content} 
          save="value"
          placeholder={<Text style={{fontSize:18}}>Select Currency</Text>}
          fontSize={18}
          maxHeight={80}
          arrowicon={<Text></Text>}
          />
          </View>          
          <TouchableOpacity style={[styles.logo,{paddingVertical:9}]}>
            <MaterialCommunityIcons name='currency-usd' color='#00A58F' size={30}/>
          </TouchableOpacity>

        </View>
        <View>
        <TouchableOpacity style={styles.button}
        onPress={signupFunction}>
          <Text style={styles.buttontext}>Sign Up</Text>
        
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Signup

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
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
  textInput:{
      flex:1,
      paddingLeft: 10,
      color: '#05375a',
      fontSize:18,
      width:300,
    },
  logo:{
    justifyContent:'center',
    alignItems:'center',
  }
  ,
  inputContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:width-70,
      marginHorizontal:2,
      marginVertical:10,
    },
  input:{
      padding:10,
      fontSize:18,
      color:'grey'
    },
  button:{
      marginHorizontal:5,
      marginVertical:8,
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
    }
  
  })