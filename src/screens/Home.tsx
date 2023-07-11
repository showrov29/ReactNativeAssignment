import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text, SafeAreaView, Button } from 'react-native'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation
import { RootStackParamList } from '../App'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

 type  HomeProps= NativeStackScreenProps<RootStackParamList,'Home'>


export default function Home({navigation}:HomeProps) {

    

    const [scores,setScores] = useState({iKnow:0,dontKnow:0,research:0})
    useEffect(() => {
        const getData = async () => {
            try {
               
                
              const jsonValue = await AsyncStorage.getItem('scores');
             
              if(jsonValue ==null){
                const def={iKnow:0,dontKnow:0,research:0}
                setScores(def)
              }
              else{
                const data= jsonValue != null ? JSON.parse(jsonValue) : null;
             setScores(data)
              }
             
             
            } catch (e) {
             console.log("Error getting scores");
             
            }
          };
          getData()
  })
  //adsfj a df
  
   
  return (
    <SafeAreaView >
        <Text>{scores.iKnow} I Know </Text>
        <Text>{scores.dontKnow} I don't know</Text>
        <Text>{scores.research} I need to research</Text>

     <Button 
     title='Start'
     onPress={()=>{
        navigation.navigate('Flashcard')
     }}
     />
     <Button 
     title='Reset Score'
     onPress={()=>{
        removeValue()
     }}
     />
    </SafeAreaView>
  )
}

const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('scores')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }