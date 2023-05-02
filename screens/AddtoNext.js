import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,Dimensions,Modal} from 'react-native'
import React,{useState,useEffect}from 'react'
const {width,height} = Dimensions.get('screen');
import Calendar  from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';
import Mytab from '../navigations/Mytab'
import database from '@react-native-firebase/database';
import {setData,updateData } from '../functions/firebasefunction';
import uuid from 'react-native-uuid';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
const AddtoNext = ({route}) => {
  const navigation= useNavigation();
     const {id,name,imageurl,categoryindex,color,img,set,
      update,value,itemid,dates,times} = route.params;
      const [currency, setcurrency] = useState('');
     const placeholderstring = categoryindex===0 ? 'Enter '+ name+ ' Expense' : 'Enter '+name+ ' Income';
     const [input,setinput] = useState(value);
     const [openModal1,setopenModal1] = useState(false);
     const [openModal2,setopenModal2] = useState(false);
     const [time,settime]= useState(times);
     const [date,setdate] = useState(dates);
     const arr = ['time','date'];
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
          setcurrency(v.currencycode);
        }
      })
      } catch(err){
        console.log(err,"error");
      }
     
    }
     useEffect(()=>{
      getData();
      console.log('set value->',set);
      console.log('update value->',update);
      if(dates==='' && times===''){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setdate(date + '-' + month + '-' + year);
        settime(' ' + hours + ':' + min + ':' + sec);
      }

     },[])
     const handleNavigation = () => {
      var user = firebase.auth().currentUser;
      console.log('user-> ',user);
      var uid = user.uid;
      console.log('user id-> ',uid);
      if(set){
        const randomId=uuid.v4();
        const address= categoryindex===0 ? 'Expense/' : 'Income/'
        //console.log('=>',id,name,imageurl,img,randomId);
        console.log('/myuser/'+uid+'/'+address+randomId+'/');
        const objsendtoDB = {
          itemid:randomId,
          categoryid:id,
          categoryname:name,
          categoryurlwithrequire:imageurl,
          categoryurl:img,
          date:date,
          time:time,
          enteredvalue:parseInt(input),
          color:color,
        }
         setData(objsendtoDB,randomId,address,uid)
          navigation.navigate('Mytab');
      }
      else{
        const randomId=itemid;
        const address= categoryindex===0 ? 'Expense/' : 'Income/'
        const objsendtoDB = {
          itemid:randomId,
          categoryid:id,
          categoryname:name,
          categoryurlwithrequire:imageurl,
          categoryurl:img,
          date:date,
          time:time,
          enteredvalue:parseInt(input),
          color:color,
        }
        console.log('/myuser/'+uid+'/'+address+randomId+'/');
        //console.log('address',address,randomId);
        updateData(objsendtoDB,randomId,address,uid)
        navigation.navigate('Mytab');
      }
     }
  return (
    <View style={styles.container}>
        <View style={styles.main}>
        <View style={styles.mainContainer}>
      <View  style={styles.imageContainer}>
        <Image source={imageurl}
        resizeMode='contain'
        style={styles.image}
        />
        </View>
        <View style={styles.inputContainer}>
        <View>
        <TextInput
        onChangeText={val => setinput(val)}
        value={input}
        placeholder={placeholderstring}
        placeholderTextColor='white'
        style={styles.input}
        keyboardType='numeric'
        maxLength={8}
        />
        </View>
        <View>
        <Text style={[styles.title,{marginHorizontal:2,marginVertical:2}]}>{currency}</Text>
        </View>
        </View>
        
      </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomImgandtextContainer}>
                <Image
                source={require('../assets/schedule.png')}
                resizeMode='contain'
                style={styles.bottomImg}
                />
                <Text style={styles.bottomtext}>Date</Text>
          </View>
          <View style={styles.calAndtimeContainer}>
              {
                arr.map((item,index)=> {
                  return(
                    <TouchableOpacity  key={index} style={styles.calAndtimeInnerContainer}
                     onPress={
                      ()=>{
                       if(index===0){
                        setopenModal1(true);
                       }
                       else{
                        setopenModal2(true);
                       }
                    }}>
                    <Text style={styles.bottomtext}>{index===0 ? date : time}</Text>
                    <Modal visible={openModal1} animationType='fade'>
                    <Calendar
                     style={{borderRadius:10,margin:40,elevation:40}}
                     onDayPress={date => {
                      setopenModal1(false);
                      setdate(date.day+'-'+date.month+'-'+date.year);
                     }}
                    />  
                  </Modal>
                   </TouchableOpacity>
                  )
                })
              }
          </View>
        </View>
        {
          input>0 ?
        
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={handleNavigation}
           style={[styles.imageContainer,{height:60,backgroundColor:'#00A58F'}]}>
          <Image source={require('../assets/check.png')}
              resizeMode='contain'
              style={{width:50,height:50,margin:5,tintColor:'white'}}
              />
          </TouchableOpacity>
       </View>
           : null     }


 
    </View>
  )
}

export default AddtoNext

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
      },
      mainContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:35,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        height:170,
        
      }
      ,
      inputContainer:{
        marginHorizontal:20,
        marginVertical:8,
        width:width-40,
        flexDirection:'row',
 
      },
      input:{
        padding:10,
        fontSize:18,
        color:'white',
      },      
      imageContainer:{
        backgroundColor:'white',
        elevation:20,
        borderRadius:40,
        height:70
      },
      image:{
        margin:5,
        width:60,
        height:60,
      },
      titleContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
      title:{
        padding:10,
        fontSize:18,
        color:'white'
    },
    main:{
        backgroundColor:'#00A58F',
        elevation:15,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20


    },
    bottomImgandtextContainer:{
      margin:10,
      flexDirection:'row',
      alignItems:'center',
  },
  bottomContainer:{
    backgroundColor:'white',
    marginVertical:20,
    marginHorizontal:20,
    flexDirection:'row',
    borderRadius:10,
    elevation:20,
    justifyContent:'space-between',
  },
  bottomImg:{
    width:40,
    height:40,
  },
  bottomtext:{
    color:'grey',
    fontSize:16,
    padding:10,
  },
  calAndtimeContainer:{
    margin:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',  
    backgroundColor:'white',
  },
  calAndtimeInnerContainer:{
    backgroundColor:'white',
    borderRadius:10,
    //borderColor:'black',
    //borderWidth:0.5,
    marginHorizontal:3,
    elevation:5,

  },
    
})