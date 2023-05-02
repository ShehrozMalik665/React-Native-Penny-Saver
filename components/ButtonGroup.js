import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
const {width,height} = Dimensions.get('screen');
const ButtonGroup = ({btnarr,getbuttonValue}) => {
    const [current_index,setcurrent_index] = useState(0);
    const handleClick = (index,val) => {
        setcurrent_index(index);
        getbuttonValue(index,val);
    }
  return (
    <View style={styles.container}>
        {
            btnarr.map((val,index)=> {
                return(
                    <TouchableOpacity style={[index===current_index? styles.activebutton :styles.button,
                    index===0 ? {borderTopLeftRadius:10,borderBottomLeftRadius:10,} : '',
                    index===1 ? {borderTopRightRadius:10,borderBottomRightRadius:10,} : '',
                    ]} key={index}
                    onPress={()=>handleClick(index,val)}
                    >
                        <Text style={[index===current_index? styles.activetext :styles.text]}>{val}</Text>
                    </TouchableOpacity>
                )
            })
        }


    </View>
  )
}

export default ButtonGroup

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
        marginHorizontal:20,
        flexDirection:'row',
    },
    button:{
        width:186,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        elevation:15,
    },
    activebutton:{
        width:186,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00A58F',
        elevation:15,
    },
    text:{
        color:'grey',
        fontSize:15
    }
    ,    
    activetext:{
        color:'white',
        fontSize:15
    }
})