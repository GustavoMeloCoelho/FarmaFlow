import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from './src/Login';
import Home from './src/Home';
import { PaperProvider } from 'react-native-paper';
import Stock from './src/Stock';
import UserRegistration from './src/UserRegistration';

const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Stock" component={Stock} options={{ headerShown: false }}/>
          <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
}