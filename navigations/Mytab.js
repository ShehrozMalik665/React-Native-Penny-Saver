import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View,} from 'react-native'
import Dashboard from '../screens/Dashboard';
import Add from '../screens/Add';
import Statistics from '../screens/Statistics';
import Profile from '../screens/Profile';
import NavImageContainer from '../components/NavImageContainer'
const dashboardicon = require('../assets/dashboard.png')
const statsicon = require('../assets/stats1.png')
const addicon = require('../assets/add.png')
const profileicon = require('../assets/Profile1.png')
const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown:false,
    tabBarStyle: [
      {
        display: "flex",
        backgroundColor:'white',
        height:80,
        marginVertical:20,
        marginHorizontal:20,
        borderRadius:15,
        elevation:15,
        bottom:15,
        position:'absolute',
        //shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5, 
        fontSize:22,
      },
      null
    ],
  };

function Mytab() {
  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        tabBarIcon:({focused})=> (
          <NavImageContainer focused={focused} ScreenName={'Dashboard'}
          link={dashboardicon}
          />
        ),
        tabBarLabel:'',
        unmountOnBlur:true,
        }}/>
      <Tab.Screen name="Add" component={Add} options={{
        tabBarIcon:({focused})=> (
          <NavImageContainer focused={focused} ScreenName={'Add'}
          link={addicon}         
          />
        ),
        tabBarLabel:''
        }}/>
      <Tab.Screen name="Statistics" component={Statistics} options={{
        tabBarIcon:({focused})=> (
          <NavImageContainer focused={focused} ScreenName={'Statistics'}
          link={statsicon}         
          />
        ),
        tabBarLabel:'',
        unmountOnBlur:true,
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon:({focused})=> (
          <NavImageContainer focused={focused} ScreenName={'Profile'}
          link={profileicon}         
          />
        ),
        tabBarLabel:''
        }}/>

    </Tab.Navigator>
  );
}
export default Mytab;
const styles = StyleSheet.create({
  shadows:{
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, 
    elevation:5,

  }
})