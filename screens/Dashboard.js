import { StyleSheet, Text, View,FlatList,TouchableOpacity, Image,Modal } from 'react-native'
import React,{useState,useEffect} from 'react'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { category,incomecategory } from '../data/catdata';
import { removeData } from '../functions/firebasefunction';
import { sortDate,calculateAmount,calculateDate } from '../functions/normalfunction';
import ButtonGroup from '../components/ButtonGroup';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const arrowupicon = require('../assets/arrow-up.png');
const arrowdownicon = require('../assets/arrow-down.png')
const Dashboard = () => {
  const navigation = useNavigation();
  const btn = ['Expense','Income'];
  const [currency, setcurrency] = useState('');
  const [buttonvalue,setbuttonvalue] = useState(0);
  const [refreshdata,setrefreshdata] = useState(false);
  const [date,setdate] = useState(calculateDate());
  const [income,setincome] = useState([])
  const [expense,setexpense] = useState([])
  const [currentobj,setcurrentobj]=useState([]);
  const [incomedataempty,setincomedataempty] = useState(true);
  const [expensedataempty, setexpensedataempty] = useState(true);
  const [sorteddata,setsorteddata]=useState([])
  const [data,setdata]=useState([]);
  const [incomevalue,setincomevalue] = useState(0)
  const [expensevalue,setexpensevalue] = useState(0)
  const [showDeleteUpdate,setshowDeleteUpdate]= useState(false);
  const [address,setaddress]=useState(null);
  const ItemSeparatorComponent = () => {
    return (
      <View style={styles.itemSeparatorComponent}></View>
    )
  }
  const ShowDeleteUpdateModule = ({address,obj})=> {
    // console.log('====================================');
    // console.log('address in mod',address);
    // console.log('====================================');
    //console.log('current obj-> ',obj);
    return(
      <View style={styles.updatedeletecancelContianer}>
        <TouchableOpacity style={styles.updatedeletecancelButton}
        onPress={()=> handleUpdate(obj)}>
          <Text style={styles.updatedeletecancelText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updatedeletecancelButton}
        onPress={()=> handleDelete(address)}>
          <Text style={styles.updatedeletecancelText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updatedeletecancelButton}
        onPress={()=> setshowDeleteUpdate(false)}>
          <Text style={styles.updatedeletecancelText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    )
  }
  const showeachCategory = ({item}) => {
    const data = item.categoryid>=1 &&  item.categoryid<=26 ? category : incomecategory;
    const cattype = item.categoryid>=1 &&  item.categoryid<=26 ? 'Expense' : 'Income';
    const ar = data.find((i)=>{
      let val = i.name===item.categoryname;
      return val;
    })
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    const addressval = '/myuser/'+uid+'/'+cattype+'/'+item.itemid+'/';
    return(
      <TouchableOpacity style={{flexDirection:'row'}}
      onPress={()=>{
        setaddress(addressval);
        setcurrentobj(item);
        setshowDeleteUpdate(true)
        //console.log('id',item.itemid,item.categoryname)
      }}
      >
     
      <View style={{flexDirection:'row',justifyContent:'space-between',margin:5,width:300}}>
        <View style={styles.eachcatergory}>
        <View  style={styles.imageContainer}>
        <Image source={ar.imageurl}
        resizeMode='contain'
        style={styles.image}
        />
        </View>
        <View >
        <Text style={styles.text}>{item.categoryname}</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <View>
        <Text style={styles.othertext}>{item.date}</Text>
        </View>
        <View>
        <Text style={styles.othertext}>{cattype==='Income' ? item.enteredvalue: -item.enteredvalue} {currency}</Text>
        </View>
        <View>
        <View style={{backgroundColor:'white',marginVertical:14}}>
      <Image
      source={require('../assets/dots.png')}
      resizeMode='contain'
      style={{width:20,height:28,tintColor:'#00A58F'}}
      />
      </View>
        </View>
        </View>
      </View>
      </TouchableOpacity>

    )
  }
  const handleDelete = (address)=> {
   // console.log('delete=>',address);
    removeData(address);
    setshowDeleteUpdate(false);
    getIncome();
    getExpense();
    setexpense([]);
    setincome([]);
    setexpensevalue(0);
    setincomevalue(0)
    setrefreshdata(true);

  }
  const handleUpdate = (obj) => {
    setshowDeleteUpdate(false);
    navigation.navigate('AddtoNext',{
      id:obj.categoryid,
      name:obj.categoryname,
      imageurl:obj.categoryurlwithrequire,
      categoryindex:buttonvalue,
      color:obj.color,
      img:obj.categoryurl,
      set:false,
      update:true,
      value:obj.enteredvalue.toString(),
      itemid:obj.itemid,
      dates:obj.date,
      times:obj.time
     })
  }
  useEffect(()=>{
      getData();
      getIncome();
      getExpense();
  },[refreshdata])
  const getbuttonValue=(index,val)=> {
    setbuttonvalue(index);
    if(index===0){
      setdata(expense)
    }
    else{
      setdata(income)
    }
   // console.log(index,val);
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
        setcurrency(v.currencycode);
      }
    })
    } catch(err){
      console.log(err,"error");
    }
   
  }
const getIncome = async() => {
  try{
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var addressIncome = '/myuser/'+uid+'/Income';
    database()
  .ref(addressIncome)
  .on('value', snapshot => {
    const len = snapshot.val();
    if(len!==null){
      setincomedataempty(false);
      setincome(sortDate(Object.values(snapshot.val())))
      setincomevalue(calculateAmount(Object.values(snapshot.val())))
    }
    else{
      setincomedataempty(true)
    }
  })
  } catch(err){
    console.log(err,"error");
  }
 
}
const getExpense = async () => {
try{
  var user = firebase.auth().currentUser;
  var uid = user.uid;
  var addressExpense= '/myuser/'+uid+'/Expense';
  database()
.ref(addressExpense)
.on('value', snapshot => {
  const len = snapshot.val();
  if(len!==null){
    setexpensedataempty(false);
    setexpense(sortDate(Object.values(snapshot.val())));
    setexpensevalue(calculateAmount(Object.values(snapshot.val())));
    setdata(expense);
  }
  else{
    setexpensedataempty(true)
  }
})
} catch(err){
  console.log(err,"error");
}
}
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#00A58F',elevation:15,flexDirection:'column',justifyContent:'center',height:'25%',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
        <View style={{flexDirection:'row',marginHorizontal:13}}>
          <Image
          source={require('../assets/Calendar-white.png')}
          resizeMode='contain'
          style={{width:30,height:30,tintColor:'white'}}
          />
           <Text style={{color:'white',fontWeight:'600',fontSize:18,paddingHorizontal:15,paddingVertical:5}}>{date}</Text>
        </View>
        <View style={{paddingTop:2,paddingHorizontal:12}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:28}}>Balance: {incomevalue-expensevalue} {currency}</Text>
        </View>
        <View style={{paddingVertical:2,paddingHorizontal:15}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18}}>Expense: -{expensevalue} {currency}</Text>
        </View>
        <View style={{paddingVertical:2,paddingHorizontal:15}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18}}>Income: {incomevalue} {currency}</Text>
        </View>

      </View>

      <View>
        <ButtonGroup btnarr={btn} getbuttonValue={getbuttonValue}/>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',height:'41%',marginHorizontal:15,marginVertical:5,borderRadius:15,padding:2,elevation:10}}>
      <FlatList
        keyExtractor={item=>item.itemid}
        data={buttonvalue===0 ? expense : income}
        renderItem={showeachCategory}
        ItemSeparatorComponent={ItemSeparatorComponent}
        />
      <Modal
      animationType='fade'
      visible={showDeleteUpdate}>
        <ShowDeleteUpdateModule address={address} obj={currentobj}/>
      </Modal>
      </View>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  listcontainer:{
    marginVertical:5,
    marginHorizontal:20,
    height:'65%',
  },
  eachcatergory:{
    flexDirection:'row',
  },
  imageContainer:{
    backgroundColor:'white',
    elevation:5,
    borderRadius:40,
  },
  image:{
    margin:15,
    width:30,
    height:30,
  },
  itemSeparatorComponent:{
    height:2,
    width:'100%',
    backgroundColor:'white',
    elevation:2
  },
  text:{
    color:'grey',
    fontWeight:'400',
    paddingHorizontal:10,
    paddingVertical:17,
    fontSize:16,
    width:100,
  },
  othertext:{
    color:'grey',
    fontWeight:'400',
    paddingHorizontal:10,
    paddingVertical:17,
    fontSize:16,
    width:100,
  },
  updatedeletecancelContianer:{
  flex:1,
  backgroundColor:'white',
  marginVertical:180,
  marginHorizontal:40,
  elevation:10,
  flexDirection:'column',
  justifyContent:'center',
  borderRadius:20,
},
updatedeletecancelButton:{
  backgroundColor:'#00A58F',
  borderRadius:15,
  marginHorizontal:20,
  marginVertical:5
},
updatedeletecancelText:{
  fontSize:22,
  color:'white',
  textAlign:'center',
  padding:10
}

})