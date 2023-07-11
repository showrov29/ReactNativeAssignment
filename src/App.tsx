/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Navigation
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

//import Screens
import Home from './screens/Home';
import Flashcard from './screens/Flashcard';


export type RootStackParamList={
  Home:undefined,
  Flashcard:undefined
}


const Stack=createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {


  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Home',
        }}
        />
        <Stack.Screen
       name='Flashcard'
        component={Flashcard}
        options={{
          title: 'Quick quiz',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;
