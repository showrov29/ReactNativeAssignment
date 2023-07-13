import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

//Async Storage

//navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SvgXml} from 'react-native-svg';
type FlashcardProps = NativeStackScreenProps<RootStackParamList, 'Flashcard'>;

export default function Flashcard({route, navigation}: FlashcardProps) {
  const [iKnow, setIknow] = useState(0);
  const [dontKnow, setDontKnow] = useState(0);
  const [research, setResearch] = useState(0);
  const [skiped, setSkiped] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [hasAns, setHasAns] = useState(false);
  const [answerMap, setAnswerMap] = useState([{questionNo: 0, answer: ''}]);
  const iknowRef = useRef();

  const handleIKnow = () => {
    if (questionId < data.length) {
      if (hasAns && answerMap[questionId]) {
        if (answerMap[questionId].answer == 'iKnow') {
          answerMap[questionId].answer = 'iKnow';
          answerMap[questionId].questionNo = questionId;
          setQuestionId(questionId + 1);

          setIknow(iKnow);
        } else if (answerMap[questionId].answer == 'skipped') {
          answerMap[questionId].answer = 'iKnow';
          answerMap[questionId].questionNo = questionId;
          setSkiped(skiped - 1);
          setIknow(iKnow + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'dontKnow') {
          answerMap[questionId].answer = 'iKnow';
          answerMap[questionId].questionNo = questionId;
          setDontKnow(dontKnow - 1);
          setIknow(iKnow + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'needToResearch') {
          answerMap[questionId].answer = 'iKnow';
          answerMap[questionId].questionNo = questionId;
          setResearch(research - 1);
          setIknow(iKnow + 1);
          setQuestionId(questionId + 1);
        }
      } else {
        let x = iKnow + 1;
        setIknow(x);
        setQuestionId(questionId + 1);
        const mapValue = {
          questionNo: questionId,
          answer: 'iKnow',
        };
        answerMap.push(mapValue);
      }
    } else {
      Alert.alert('Quiz Finished', '', [
        {
          text: 'Update',
          onPress: () => {
            setHasAns(true);
            setQuestionId(0);
          },
        },
      ]);
    }
  };

  const handleDontKnow = () => {
    if (questionId < data.length) {
      if (hasAns && answerMap[questionId]) {
        if (answerMap[questionId].answer == 'dontKnow') {
          answerMap[questionId].answer = 'dontKnow';
          answerMap[questionId].questionNo = questionId;
          setQuestionId(questionId + 1);

          setDontKnow(dontKnow);
        } else if (answerMap[questionId].answer == 'iKnow') {
          answerMap[questionId].answer = 'dontKnow';
          answerMap[questionId].questionNo = questionId;
          setIknow(iKnow - 1);
          setDontKnow(dontKnow + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'skipped') {
          answerMap[questionId].answer = 'dontKnow';
          answerMap[questionId].questionNo = questionId;
          setSkiped(skiped - 1);
          setDontKnow(dontKnow + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'needToResearch') {
          answerMap[questionId].answer = 'dontKnow';
          answerMap[questionId].questionNo = questionId;
          setResearch(research - 1);
          setDontKnow(dontKnow + 1);
          setQuestionId(questionId + 1);
        }
      } else {
        setDontKnow(dontKnow + 1);
        setQuestionId(questionId + 1);

        const mapValue = {
          questionNo: questionId,
          answer: 'dontKnow',
        };
        answerMap.push(mapValue);
      }
    } else {
      Alert.alert('Quiz Finished', '', [
        {
          text: 'Update',
          onPress: () => {
            setHasAns(true);
            setQuestionId(0);
          },
        },
      ]);
    }
  };

  const handleNeedToResearch = () => {
    if (questionId < data.length) {
      if (hasAns && answerMap[questionId]) {
        if (answerMap[questionId].answer == 'needToResearch') {
          answerMap[questionId].answer = 'needToResearch';
          answerMap[questionId].questionNo = questionId;
          setQuestionId(questionId + 1);

          setResearch(research);
        } else if (answerMap[questionId].answer == 'iKnow') {
          answerMap[questionId].answer = 'needToResearch';
          answerMap[questionId].questionNo = questionId;
          setIknow(iKnow - 1);
          setResearch(research + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'dontKnow') {
          answerMap[questionId].answer = 'needToResearch';
          answerMap[questionId].questionNo = questionId;
          setDontKnow(dontKnow - 1);
          setResearch(research + 1);
          setQuestionId(questionId + 1);
        } else if (answerMap[questionId].answer == 'skipped') {
          answerMap[questionId].answer = 'needToResearch';
          answerMap[questionId].questionNo = questionId;
          setSkiped(skiped - 1);
          setResearch(research + 1);
          setQuestionId(questionId + 1);
        }
      } else {
        setResearch(research + 1);
        setQuestionId(questionId + 1);
        const mapValue = {
          questionNo: questionId,
          answer: 'needToResearch',
        };
        answerMap.push(mapValue);
      }
    } else {
      Alert.alert('Quiz Finished', '', [
        {
          text: 'Update',
          onPress: () => {
            setHasAns(true);
            setQuestionId(0);
          },
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    setQuestionId(questionId + 1);
    // if (data.length > questionId) {
    //   if (hasAns && answerMap[questionId]) {
    //   //   if (answerMap[questionId].answer == 'skipped') {
    //   //     answerMap[questionId].questionNo = questionId;
    //   //     setQuestionId(questionId + 1);
    //   //     setSkiped(skiped);
    //   //   } else if (answerMap[questionId].answer == 'iKnow') {
    //   //     // answerMap[questionId].answer = 'skipped';
    //   //     answerMap[questionId].questionNo = questionId;
    //   //     setIknow(iKnow - 1);
    //   //     setSkiped(skiped + 1);
    //   //     setQuestionId(questionId + 1);
    //   //   } else if (answerMap[questionId].answer == 'dontKnow') {
    //   //     // answerMap[questionId].answer = 'skipped';
    //   //     answerMap[questionId].questionNo = questionId;
    //   //     setDontKnow(dontKnow - 1);
    //   //     setSkiped(skiped + 1);
    //   //     setQuestionId(questionId + 1);
    //   //   } else if (answerMap[questionId].answer == 'needToResearch') {
    //   //     // answerMap[questionId].answer = 'skipped';
    //   //     answerMap[questionId].questionNo = questionId;
    //   //     setResearch(research - 1);
    //   //     setSkiped(skiped + 1);
    //   //     setQuestionId(questionId + 1);
    //   //   }
    //   // } else {
    //   //   let x = skiped + 1;
    //   //   // setSkiped(x);
    //   //   setQuestionId(questionId + 1);
    //   //   const mapValue = {
    //   //     questionNo: questionId,
    //   //     answer: 'skipped',
    //   //   };
    //   //   answerMap.push(mapValue);
    //   // }
    // } else {
    //   Alert.alert('Alert', 'Quiz Finished', [
    //     {
    //       text: 'Update',
    //       onPress: () => {
    //         // navigation.pop();
    //         setHasAns(true);
    //         setQuestionId(0);
    //       },
    //     },
    //   ]);
    // }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('scores');
        const AnsMap = await AsyncStorage.getItem('ans');
        console.log('🚀 ~ file: Flashcard.tsx:226 ~ getData ~ AnsMap:', AnsMap);
        const ansMapData = AnsMap != null ? JSON.parse(AnsMap) : null;
        const qsid = await AsyncStorage.getItem('questionId');

        if (ansMapData != null) {
          setAnswerMap(ansMapData);
          console.log(
            '🚀 ~ file: Flashcard.tsx:232 ~ getData ~ ansMapData:',
            ansMapData,
          );
          setHasAns(true);
        }

        if (qsid != null) {
          setQuestionId(parseInt(qsid));
        }

        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (data != null) {
          setIknow(data.iKnow);
          setDontKnow(data.dontKnow);
          setResearch(data.research);
          setSkiped(data.skiped);
        }
      } catch (e) {
        console.log('Error getting scores');
      }
    };
    getData();

    answerMap.pop();
  }, []);

  useEffect(() => {
    storeData(value, questionId);
    storeAns(answerMap);
  }, [skiped, dontKnow, research, iKnow, answerMap]);

  const value = {
    iKnow: iKnow,
    dontKnow: dontKnow,
    research: research,
    skiped: skiped,
  };

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.card}>
          {/* <Text style={{fontSize:20,fontWeight:'600'}}>Question No: {data[questionId].id }  </Text> */}
          {data[questionId] ? (
            <>
              {/* <Text>{answerMap[questionId].answer} </Text> */}
              {hasAns
                ? answerMap[questionId] && (
                    <Text>
                      {' '}
                      Previous question: {answerMap[questionId].answer}
                    </Text>
                  )
                : null}
              <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 20}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  Question:{' '}
                </Text>{' '}
                {data[questionId].question}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '400'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ans: </Text>{' '}
                {data[questionId].ans}
              </Text>
            </>
          ) : (
            <>
              {/* {Alert.alert('Quiz Finished!')} */}
              <Text>No Questions Remaining</Text>
            </>
          )}
        </TouchableOpacity>

        <Button
          title="Home"
          onPress={() => {
            console.log(answerMap);

            setQuestionId(0);
            storeData(value, questionId);
            navigation.pop();
          }}
        />

        <Button
          title="Skip question"
          color="#D204FB"
          onPress={() => {
            handleNextQuestion();
          }}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={{
              ...styles.iconBtn,
              backgroundColor:
                answerMap[questionId] != null &&
                answerMap[questionId].answer == 'iKnow'
                  ? 'red'
                  : 'white',
            }}
            onPress={() => {
              handleIKnow();
            }}>
            <SvgXml xml={iKnowIcon} />
            <Text style={{fontWeight: '600'}}>I know</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.iconBtn,
              backgroundColor:
                answerMap[questionId] != null &&
                answerMap[questionId].answer == 'dontKnow'
                  ? 'red'
                  : 'white',
            }}
            onPress={() => {
              handleDontKnow();
            }}>
            <SvgXml xml={dontKnowIcon} />
            <Text style={{fontWeight: '600'}}>I Don't Know</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.iconBtn,
              backgroundColor:
                answerMap[questionId] != null &&
                answerMap[questionId].answer == 'needToResearch'
                  ? 'red'
                  : 'white',
            }}
            onPress={() => {
              handleNeedToResearch();
            }}>
            <SvgXml xml={researchIcon} />
            <Text style={{fontWeight: '600'}}>Need to research</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const storeData = async (value: any, qsid: number) => {
  try {
    const jsonValue = JSON.stringify(value);
    const num = qsid.toString();

    await AsyncStorage.setItem('scores', jsonValue);
    await AsyncStorage.setItem('questionId', num);

    console.log(jsonValue);
  } catch (e) {
    console.log('Error saving scores');
  }
};

const storeAns = async (value: any) => {
  try {
    if (value.length > 0) {
      console.log(value);

      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('ans', jsonValue);
    }
  } catch (e) {
    console.log('Error saving scores');
  }
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#E3D7D5',
    height: 200,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 4,
    height: 100,
    width: 100,
  },
});

const iKnowIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
`;
const skipedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
`;
const dontKnowIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const researchIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;

export const data = [
  {
    id: 0,
    question: 'Capital of uganda ?',
    ans: 'Ruanda',
  },
  {
    id: 1,
    question: 'Capital of Bangladesh',
    ans: 'Dhaka',
  },
  {
    id: 2,
    question: 'Capital of India',
    ans: 'Delhi',
  },
];
