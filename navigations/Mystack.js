import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Mytab from './Mytab';
import AddtoNext from '../screens/AddtoNext';


const Stack = createStackNavigator();

function Mystack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Mytab" component={Mytab} />
      <Stack.Screen name="AddtoNext" component={AddtoNext} />
    </Stack.Navigator>
  );
}
export default Mystack;