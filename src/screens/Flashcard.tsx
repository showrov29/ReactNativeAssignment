import React, { useState ,useEffect} from 'react'
import { StyleSheet,View,Text, Button } from 'react-native'

//Async Storage

//navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
type FlashcardProps = NativeStackScreenProps<RootStackParamList,'Flashcard'>

export default function Flashcard({route,navigation}:FlashcardProps) {
    const [iKnow,setIknow]=useState(0)
    const [dontKnow,setDontKnow]=useState(0)
    const [research,setResearch]=useState(0)
   const [questionId,setQuestionId]=useState(0)
  

   useEffect(() => {
    const getData = async () => {
        try {
           
            
          const jsonValue = await AsyncStorage.getItem('scores'); 
         const data= jsonValue != null ? JSON.parse(jsonValue) : null;
         if(data != null) {
         setIknow(data.iKnow)
         setDontKnow(data.dontKnow)
         setResearch(data.research)
        } 
        
    }catch (e) {
         console.log("Error getting scores");
         
        }
      };
      getData()
},[])
   
  return (
    <View>

        <Text>{data[questionId].question }</Text>
        <Text>{data[questionId].ans }</Text>
         <Button
        title='Home'
        onPress={() =>{

            const value = {
                iKnow:iKnow,
                dontKnow:dontKnow,
                research:research
            }
            storeData(value)
            navigation.pop()
         
        }}
        />
         <Button
        title='Next question'
        onPress={()=>{
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                setQuestionId(0)
            }
            
           
        } }
        />
        <Button
        title='I know'
        onPress={() =>{
            setIknow(iKnow+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                setQuestionId(0)
            }
        }}
        />
        <Button
        title='I dont know'
        onPress={() =>{
            setDontKnow(dontKnow+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                setQuestionId(0)
            }
        }}
        />
        <Button
        title='I need to research'
        onPress={() =>{
            setResearch(research+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                setQuestionId(0)
            }
        }}
        />
    </View>
  )
}


const storeData = async (value:any) => {
    
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('scores', jsonValue);
      console.log(jsonValue);
      
    } catch (e) {
      console.log('Error saving scores');
      
    }
  };

 export const data=[
    {
    id:0,
    question:"Capital of uganda",
    ans:'Ruanda'
    },
    {
    id:1,
    question:"Capital of Bangladesh",
    ans:'Dhaka'
    },
    {
    id:2,
    question:"Capital of India",
    ans:'Delhi'
    },

]
