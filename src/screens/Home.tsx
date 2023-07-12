import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native'

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
       <Text style={{fontSize:24,fontWeight:'600',color:'red'}}>{scores.iKnow} |  Know </Text>
        <Text style={{fontSize:24,fontWeight:'600',color:'#D204FB'}}>{scores.dontKnow} |  Don't know</Text>
        <Text style={{fontSize:24,fontWeight:'600',color:'#38FB04'}}>{scores.research} |  Need to research</Text>
        <Text style={{fontSize:24,fontWeight:'600',color:'white'}}>{scores.skiped} | Skiped</Text>
       </View>
       




     <TouchableOpacity 
     style={styles.button}
     
     onPress={()=>{
        navigation.navigate('Flashcard')
     }}
     >
        <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

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
      await AsyncStorage.removeItem('questionId')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }


  const styles=StyleSheet.create({
    card:{
        backgroundColor:'#31312B',
        textDecorationColor:'#fff',
        paddingLeft: 30,
        margin:25,
        borderRadius:20,
        padding:20,

        
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 85,
        paddingHorizontal: 2,
        borderRadius: 100,
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginBottom:20,
        marginTop:50
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
   
  })