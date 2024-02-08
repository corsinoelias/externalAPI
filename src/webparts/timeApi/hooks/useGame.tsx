import { useState, useContext } from "react";
import * as React from "react";
import { getQuestions } from "../Services/ExternalAPIService";
import config from "../config/quiz";
import { PreferencesContext } from "../context/PreferencesContext";
import { Answer, Quiz } from "../types/quiz";
import useSound from "./useSound";
import { _getQuizes, _addQuiz, _addQuizAttempt } from '../Services/PNP_Service';
const useGame = (initialState: Quiz) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [configQuiz, setConfigQuiz] = useState(initialState);
  const [isButtonNextDisabled, setIsButtonNextDisabled] =
    useState<boolean>(true);

  const [playCorrect] = useSound(
    "https://cdn.pixabay.com/audio/2023/11/02/audio_1437d4e1b1.mp3"
  );
  const [playIncorrect] = useSound(
    "https://cdn.pixabay.com/audio/2023/04/02/audio_53088f6b8f.mp3"
  );

  const { preferences, setPreferences } = useContext(PreferencesContext);

  const { questions, isGameOver, currentNumberQuestion,answers } = configQuiz;

  const leftGame = () => {
    setPreferences(config.preferences);
    setConfigQuiz(initialState);
    setIsButtonNextDisabled(true);
  };

  const startGame = () => {
    setLoading(true);
    getQuestions(
      config.totalQuestions,
      preferences.idCategory,
      preferences.difficulty
    ).then((questions) => {
      setConfigQuiz((configQuiz) => ({
        ...configQuiz,
        questions,
        isLeft: false,
      }));
      setLoading(false);
    });
  };

  const nextQuestion = async () => {
    const nextQuestion = currentNumberQuestion + 1;
    if (nextQuestion === config.totalQuestions) {
      console.table(answers);

      console.log(answers);
      let addItemQuiz= await _addQuiz("Quiz",{Title:preferences.idCategory+new Date().toISOString()});
      console.log(addItemQuiz);
     let addItem= await _addQuizAttempt("QuizAttempts",answers[0],addItemQuiz.data.ID);
     let items= await _getQuizes("Quiz");
     console.table(items);
      setConfigQuiz((configQuiz) => ({ ...configQuiz, isGameOver: true }));
    } else {
      setConfigQuiz((configQuiz) => ({
        ...configQuiz,
        currentNumberQuestion: nextQuestion,
      }));
      setIsButtonNextDisabled(true);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      setIsButtonNextDisabled(false);
      // const userAnswer = e.currentTarget.value
      const userAnswer = e.currentTarget.textContent;
      const isCorrect =
        questions[currentNumberQuestion].correct_answer === userAnswer;

      if (isCorrect) {
        setConfigQuiz((configQuiz) => ({
          ...configQuiz,
          totalScore: configQuiz.totalScore + 1,
        }));
        playCorrect();
      } else {
        // new Audio('https://cdn.pixabay.com/audio/2023/04/02/audio_53088f6b8f.mp3').play();
        playIncorrect();
      }

      const answer:Answer = {
        question: questions[currentNumberQuestion].question,
        userAnswer,
        isCorrect,
        correct_answer: questions[currentNumberQuestion].correct_answer,
        Title:questions[currentNumberQuestion].correct_answer
      };

      setConfigQuiz((configQuiz) => ({
        ...configQuiz,
        answers: configQuiz.answers.concat(answer),
      }));
    }
  };

  return {
    loading,
    configQuiz,
    isButtonNextDisabled,
    leftGame,
    startGame,
    nextQuestion,
    checkAnswer,
  };
};

export default useGame;
