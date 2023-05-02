import React,{useEffect} from 'react';
import { View, Text,TouchableOpacity,Dimensions,StyleSheet,StatusBar,Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
    const navigation = useNavigation();
    useEffect(() => {
    }, [])
    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#00A58F'/>
        <View style={styles.header}>
            <Image 
            source={require('../assets/piggy-bank.png')}
            style={styles.logo}
            resizeMode='cover'
            />
        </View>
        <View 
            style={[styles.footer, {
                backgroundColor: 'white'
            }]}>
        <View style={styles.textContainer}>
        <Text style={styles.title}>Sign up below to create a secure account</Text>
        </View>
        <TouchableOpacity style={[styles.buttonContainer]}
        onPress={()=>navigation.navigate('Signup')}
        >
          <View>
          <Image 
                style={styles.button}
                resizeMode='contain'
                source={require('../assets/at.png')}/>            
          </View>
          <View>
          <Text style={styles.buttontitle}>Sign up with Email</Text>
          </View>               
        </TouchableOpacity>
        <View style={[styles.textContainer,{flexDirection:'row',justifyContent:'space-between'}]}>
        <View>
        <Text style={styles.bottomtitle}>Already have an account?</Text>
        </View>
        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={[styles.bottomtitle,{color:'#304ED6'}]}>LOG IN</Text> 
          </TouchableOpacity>
        </View>
 
 
        </View>
        </View>
      </View>
    );
};

export default Home;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00A58F'
  },
  header: {
      flex: 1.50,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 30,
      paddingHorizontal: 30,
      alignItems:'center'
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  textContainer:{
    marginVertical:5,
  },
  title:{
    fontSize:26,
    padding:20,
    fontWeight:'bold',
    color:'black',
    textAlign:'center'
  },
  bottomtitle:{
    fontSize:16,
    marginVertical:20,
    marginHorizontal:3,
    fontWeight:'bold',   
  },
  buttonContainer:{
    flexDirection:'row',
     justifyContent:'space-evenly',
     alignItems:'center',
    backgroundColor: '#00A58F',
    borderRadius:10,
    width:300,
    elevation:10,
    height:60,
  },
  button:{
    width:50,
    height:50,
    tintColor:'white'
  },
  buttoninnerContainer:{
    marginHorizontal:15,
    backgroundColor:'white',
    borderRadius:40,
    padding:5,
    elevation:20,
  },
  buttontitle:{
    fontSize:20,
    padding:10,
    color:'white',
    textAlign:'center'   
  }


});