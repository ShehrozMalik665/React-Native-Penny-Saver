import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity,Image, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { categoriesData } from '../data/catdata'
import database from '@react-native-firebase/database';
import ButtonGroup from '../components/ButtonGroup';
import { calculatePercentange } from '../functions/normalfunction';
import {VictoryPie,VictoryLabel} from 'victory-native'
import Svg, { Circle } from 'react-native-svg';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { currencydata } from '../data/currencyData';
const Statistics = () => {
  const btn = ['Expense','Income'];
  const [currency, setcurrency] = useState('');
  const [buttonvalue,setbuttonvalue] = useState(0);
  const [incomelength,setincomelength] = useState(0);
  const [expenselength,setexpenselength] = useState(0);
  const [incomedataempty,setincomedataempty] = useState(true);
  const [expensedataempty, setexpensedataempty] = useState(true);
  const [income,setincome] = useState([])
  const [expense,setexpense] = useState([])
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
  const itemSeparatorComponent = () => {
    return (
      <View style={styles.itemSeparatorComponent}></View>
    )
  }
  const getbuttonValue=(index,val)=> {
    setbuttonvalue(index);
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
        setincome(calculatePercentange(Object.values(snapshot.val())));
        setincomelength(Object.values(snapshot.val()).length);
      }
      else{
        setincomelength(0)
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
      setexpense(calculatePercentange(Object.values(snapshot.val())));
      setexpenselength(Object.values(snapshot.val()).length);
    }
    else{
      setexpenselength(0);
    }
  })
  } catch(err){
    console.log(err,"error");
  }
}
  const Nodatafound = () => {
    return(
      <View style={{flexDirection:'column' ,justifyContent:'center',alignItems:'center'}}>
        <Text>No data found</Text>
      </View>
    )
  }
  useEffect(()=>{
    getData();
    getExpense();
    getIncome();
    //old
  //   const chartdataforeachCat = data.map((item)=>{
  //     let eachtotal= item.expenses.reduce((a,b)=> a+(b.total|| 0),0)
  //     return(
  //       {
  //         name:item.name,
  //         total:eachtotal,
  //       }
  //     )
    
  //   })
  //   //console.log(chartdataforeachCat);
  //   let filterchartdata = chartdataforeachCat.filter((i)=>{
  //     return i.total>0
  //   })
  //   let totalExpense = filterchartdata.reduce((a,b)=> a+(b.total|| 0),0);
  //  // console.log('totalExpense',totalExpense);
  //   let finalChartData = filterchartdata.map((item)=>{
  //     let percentageeach = (item.total/totalExpense*100).toFixed(0);
  //     return( {
  //       name:item.name,
  //       total:item.total,
  //       percentage:percentageeach
  //     })
  //   })
  //   // setData(finalChartData);
  },[])
  const Graph = () => {
    let val = buttonvalue===0 ? expense : income;
    let len = val.length;
    let dta = val.map((item)=> {
      return({
        //z:item.percentage,
        // x:item.name,
        x:item.percentage,
        y:item.total,
      })
    })
    let colorchart = val.map((i)=>i.color);
    return(
    
      <View style={styles.graphcontainer}>
        <Svg viewBox="0 0 360 200">
        <VictoryPie 
        standalone={true}
        data={dta} 
        width={360} 
        height={230} 
        colorScale={colorchart}
        innerRadius={30}
        labelRadius={80}
        style={{ labels: { fontSize: 13, color: "white", } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14,fontWeight:'bold' }}
          x={170} y={2}
          text={buttonvalue===0 ? expenselength+' Expenses' : incomelength+' Incomes'}
        />
        </Svg>
      </View>
      
    )
  }
  const Renderfunc = ({item}) => {
    return (
      <TouchableOpacity style={[styles.eachcatergory,{backgroundColor:item.color}]}>
       <View  style={styles.imageContainer}>
       <Image source={item.url}
       resizeMode='contain'
       style={styles.image}
       />
       </View>
       <View>
       <Text style={styles.text}>{item.name}</Text>
       </View>
       <View>
       <Text style={styles.text}>{item.percentage}</Text>
       </View>
       <View>
       <Text style={styles.text}>{item.total} {currency}</Text>
       </View>       
     </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View>
        <ButtonGroup btnarr={btn} getbuttonValue={getbuttonValue}/>
      </View>

      <Graph/>
      <View  style={styles.listcontainer}>
      <FlatList
      data={buttonvalue===0 ? expense : income }
      keyExtractor={item=> item.id}
      renderItem={Renderfunc}
   
      />
      </View>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  header:{
    backgroundColor:'red',
  },
  graphcontainer:{
    marginVertical:5,
    marginHorizontal:20,
    height:'35%',
    backgroundColor:'white',
    borderRadius:15,
    elevation:10,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  listcontainer:{
    marginVertical:5,
    marginHorizontal:20,
    height:'30%',
    padding:4,
    backgroundColor:'white',
    borderRadius:15,
    elevation:10
   
  },
  eachcatergory:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    backgroundColor:'white',
    height:60,
    padding:5,
    borderRadius:15,
  },
  imageContainer:{
    backgroundColor:'white',
    elevation:5,
    borderRadius:40,
  },
  image:{
    margin:10,
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
    color:'white',
    fontWeight:'400',
    paddingTop:15,
    paddingLeft:10,
    fontSize:16,
    width:100,
  },
})