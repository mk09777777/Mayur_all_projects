import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment } from 'react';

import Homepage from './components/home';

import Splashscreen from './components/splashscreen2';
import Cart from './components/cart';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash" screenOptions={{headerShown:false}}>
        
          <Stack.Screen name="splash" component={Splashscreen} />
          <Stack.Screen name="home" component={Homepage} />
          <Stack.Screen name="cart" component={Cart}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}

export default App;
