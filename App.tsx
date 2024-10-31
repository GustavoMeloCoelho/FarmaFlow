import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from './src/Login';
import Home from './src/Home';
import { PaperProvider } from 'react-native-paper';
import Stock from './src/Stock';
import UserRegistration from './src/UserRegistration';
import UserList from './src/UserList';
import MovementRegistration from './src/MovementRegistration';
import MovementList from './src/MovementList';
import MovementListForDriver from './src/MovementListForDriver';
import MapScreen from './src/MapScreen';

const Stack = createStackNavigator()


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MovementListForDriver'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Stock" component={Stock} options={{ headerShown: false }}/>
          <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }}/>
          <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: false }}/>
          <Stack.Screen name="MovementRegistration" component={MovementRegistration} options={{ headerShown: false }}/>
          <Stack.Screen name="MovementList" component={MovementList} options={{ headerShown: false }}/>
          <Stack.Screen name="MovementListForDriver" component={MovementListForDriver} options={{ headerShown: false }}/>
          <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
}