import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text, SafeAreaView, Button, Pressable } from 'react-native'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation
import { RootStackParamList } from '../App'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

 type  HomeProps= NativeStackScreenProps<RootStackParamList,'Home'>


export default function Home({navigation}:HomeProps) {

    

    const [scores,setScores] = useState({iKnow:0,dontKnow:0,research:0,skiped:0})
    useEffect(() => {
        const getData = async () => {
            try {

              const jsonValue = await AsyncStorage.getItem('scores');
             
              if(jsonValue ==null){
                const def={iKnow:0,dontKnow:0,research:0,skiped:0}
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
       <View style={styles.card}>
       <Text style={styles.text}>{scores.iKnow} |  Know </Text>
        <Text style={styles.text}>{scores.dontKnow} |  Don't know</Text>
        <Text style={styles.text}>{scores.research} |  Need to research</Text>
        <Text style={styles.text}>{scores.skiped} | Skiped</Text>
       </View>
       




     <Button 
     
     title='Start'
     onPress={()=>{
        navigation.navigate('Flashcard')
     }}
     />
     <Button 
     color='red'
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


  const styles=StyleSheet.create({
    card:{
        backgroundColor:'#31312B',
        textDecorationColor:'#fff',
        paddingLeft: 20,
        margin:25,
        borderRadius:20,

        
    },
    text:{
        color:'white',
        fontSize:23,
        fontWeight:'600'

    }
  })