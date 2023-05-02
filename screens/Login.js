import { StyleSheet, Text, View,TextInput,Dimensions,Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo'
const {width,height} = Dimensions.get('screen');
const Login = () => {
  const navigation = useNavigation();
  const [eyeopenornot, seteyeopenornot] = useState(true);
  const [securetextentryval, setsecuretextentryval] = useState(true);
  const [eye, seteye] = useState('eye-with-line')
  const [mail,setmail] = useState('');
  const [password,setpassword] = useState('');
  const loginFunction = async() => {
  try {
    if (mail.length > 0 && password.length > 5) {
      const userData = await firebase
        .auth()
        .signInWithEmailAndPassword(mail, password);
      console.log('login');
      if (userData.user.emailVerified) {
        console.log('verified');
        navigation.navigate('Mytab')

      } else {
        Alert.alert("Please verify your email before Login",'Link was sent to your mail');
      }
    } else {
      Alert.alert("Please Enter right ceridentials");
    }
  } catch (error) {
    Alert.alert('Error',error.message);
  }
  }
  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(mail)
      .then(() => {
        Alert.alert('Forgot Password',"Password reset mail has sent to your account ");
      })
      .catch((error) => {
        Alert.alert('Error',error.message);
      })
    }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>Welcome to Penny Saver</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView mb='70px' style={{backgroundColor:'white'}}>
        <View style={styles.inputContainer}>
          <View>
          <TextInput placeholder='Your Email'
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
          <TextInput placeholder='Your Password'
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
        <View>
        <TouchableOpacity style={styles.titleContainer} onPress={forgetPassword}>
          <Text style={styles.title}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.button}
        onPress={loginFunction}>
          <Text style={styles.buttontext}>Login  </Text>
        
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Login

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