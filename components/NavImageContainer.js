import { StyleSheet, Text, View,Image } from 'react-native'
import React,{usestate} from 'react'

const NavImageContainer = ({focused,ScreenName,link}) => {
  return (
    <View style={[styles.container,{top: ScreenName==='Add' ? -30: 0}]}>
      {ScreenName!=='Add' ?  
      <Image source={link}
      resizeMode='contain'
      style={[styles.image,{tintColor:focused ? '#00A58F' : 'grey'}]} 
      /> : 
      <Image source={link}
      resizeMode='contain'
      style={[styles.addbutton]} 
      />      
      }
      {ScreenName!=='Add' ?
      <Text style={[styles.title,{color:focused? '#00A58F' : 'grey'}]}>{ScreenName}</Text>
      : null }
    </View>
  )
}

export default NavImageContainer

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,

  },
  image:{
    width:45,
    height:45,
    marginBottom:3
  },
  title:{
    fontSize:13.5,
  },
  addbutton:{
    width:70,
    height:70,
    borderRadius:36,
    backgroundColor:'white',
    tintColor:'#00A58F',
    backgroundColor:'white'
  }
})