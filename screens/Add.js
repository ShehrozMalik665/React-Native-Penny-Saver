import { StyleSheet, Text, View ,FlatList,Image,TouchableOpacity,Dimensions} from 'react-native'
import React, { useState,useEffect } from 'react'
import ButtonGroup from '../components/ButtonGroup'
import { category,incomecategory } from '../data/catdata'
const {width,height} = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
const Add = () => {
  const btn = ['Expense','Income'];
  const navigation=useNavigation();
  const [buttonvalue,setbuttonvalue] = useState(0);
  const [data,setdata]=useState(category);
  const getbuttonValue=(index,val)=> {
    setbuttonvalue(index);
    if(index===0){
      setdata(category)
    }
    else{
      setdata(incomecategory)
    }
    console.log(index,val);
  }
  const itemSeparatorComponent = () => {
    return (
      <View style={styles.itemSeparatorComponent}></View>
    )
  }
  const showeachCategory = ({item}) => {
    return(
      <TouchableOpacity style={styles.eachcatergory}
       onPress={()=>navigation.navigate('AddtoNext',{
        id:item.id,
        name:item.name,
        imageurl:item.imageurl,
        categoryindex:buttonvalue,
        color:item.color,
        img:item.img,
        set:true,
        update:false,
        value:'',
        itemid:'',
        dates:'',
        times:'',
       })}>
        <View  style={styles.imageContainer}>
        <Image source={item.imageurl}
        resizeMode='contain'
        style={styles.image}
        />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View>
      <ButtonGroup btnarr={btn} getbuttonValue={getbuttonValue}/>
      </View>
      <View style={styles.listcontainer}>
        <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={showeachCategory}
        ItemSeparatorComponent={itemSeparatorComponent}
        />
      </View>


    </View>
  )
}

export default Add

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
    justifyContent:'flex-start',
    margin:5,
    backgroundColor:'white'
  },
  imageContainer:{
    backgroundColor:'white',
    elevation:5,
    borderRadius:40,
  },
  image:{
    margin:10,
    width:60,
    height:60,
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
    paddingTop:30,
    paddingLeft:10,
    fontSize:16,
  },


})