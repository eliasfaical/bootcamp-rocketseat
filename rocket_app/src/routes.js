import React from 'react';
import {Button, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import Cart from './pages/Cart';

import colors from './styles/colors';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 185, height: 24}}
      source={require('./assets/logo.png')}
    />
  );
}

export default function Routes({navigation}) {
  return (
    <Stack.Navigator
      headerBackTitleVisible="false"
      headerLayoutPreset="center"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.dark,
        },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="Home"
        component={(Main, Cart)}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Cart')}
              title="Cart"
              color="#FFF"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
