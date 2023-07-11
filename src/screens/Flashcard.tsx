import React, { useState ,useEffect} from 'react'
import { StyleSheet,View,Text, Button, Alert, TouchableOpacity } from 'react-native'

//Async Storage

//navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { SvgXml } from 'react-native-svg';
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
      color='#D204FB'
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


     <TouchableOpacity
       style={styles.iconBtn}
        onPress={() =>{
            setIknow(iKnow+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                Alert.alert("Quiz fininishe")
               
            }
        }}
        >
             <SvgXml xml={iKnowIcon}  />
             <Text style={{fontWeight:'600'}}>I know</Text>

     </TouchableOpacity>




    <TouchableOpacity
        style={styles.iconBtn}
        onPress={() =>{
            setDontKnow(dontKnow+1)
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
                Alert.alert("Quiz fininished")
              
            }
        }}
        >
             <SvgXml xml={dontKnowIcon}  />
             <Text style={{fontWeight:'600'}}>I Don't Know</Text>

    </TouchableOpacity>



    <TouchableOpacity
         style={styles.iconBtn}
        onPress={() =>{
            setResearch(research+1)
           
            
            if(data.length>questionId+1){
                setQuestionId(questionId+1)
            }
            else{
              
              Alert.alert("Quiz fininishe")
            }
        }}
        >
             <SvgXml xml={researchIcon}  />
             <Text style={{fontWeight:'600'}}>Need to research</Text>
     </TouchableOpacity>

        
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
        justifyContent:'space-around'
       

    },
    card:{
        backgroundColor:'#E3D7D5',
        height:200,
        borderRadius:20,
        marginHorizontal:10,
        marginVertical:5,
        alignItems:'center',
        justifyContent:'center'
    
       

    },
    iconBtn: {
        alignItems: 'center',
        borderRadius:6,
        borderWidth:.5,
        padding:4,
        height:100,
        width:100,
    }
  })



  const iKnowIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
`; 
  const skipedIcon= `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
`; 
  const dontKnowIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`; 
  const researchIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`; 

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
