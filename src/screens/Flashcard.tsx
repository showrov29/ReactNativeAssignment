import React, { useState ,useEffect} from 'react'
import { StyleSheet,View,Text, Button, Alert, TouchableOpacity } from 'react-native'

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
    const [skiped,setSkiped]=useState(0)
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
         setSkiped(data.skiped)
         
        } 
        
    }catch (e) {
         console.log("Error getting scores");
         
        }
      };
      getData()
},[])

const value = {
    iKnow:iKnow,
    dontKnow:dontKnow,
    research:research,
    skiped:skiped,
   
}
   
  return (
    <View>

        <View>

       <TouchableOpacity style={styles.card}>
       <Text style={{fontSize:15,fontWeight:'600'}}>{data[questionId].question }</Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{data[questionId].ans }</Text>

       </TouchableOpacity>
       

         <Button
        title='Home'
        onPress={() =>{

           
            storeData(value)
            navigation.pop()
         
        }}
        />
         <Button
        title='Next question'
        onPress={()=>{
            setSkiped(skiped+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                Alert.alert("Quiz fininishe")
            }
            
           
        } }
        />
       


        <View style={styles.btnContainer}>
        <Button
        title='I know'
        onPress={() =>{
            setIknow(iKnow+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                Alert.alert("Quiz fininishe")
               
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
                Alert.alert("Quiz fininished")
              
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
              
              Alert.alert("Quiz fininishe")
            }
        }}
        />
        </View>
    </View>
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


  const styles=StyleSheet.create({
    btnContainer: {
      flexDirection:'row',
        marginTop: 50,
       

    },
    card:{
        backgroundColor:'#E3D7D5',
        height:200,
        borderRadius:20,
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'center'
    
       

    }
  })

 export const data=[
    {
    id:0,
    question:"Capital of uganda ?",
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
