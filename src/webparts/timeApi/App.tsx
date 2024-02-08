
import QuestionCard from './components/QuestionCard'
import StartPanel from './components/StartPanel'
import GameOverPanel from './components/GameOverPanel'

import './App.css'
import * as React from 'react'
import { PreferencesProvider } from './context/PreferencesContext'
import useGame from './hooks/useGame';
import { Text } from '@fluentui/react/lib/Text';
import { ProgressIndicator } from 'office-ui-fabric-react'
const App = () => {
  const initialState = {
    questions: new Array(),
    answers: new Array(),
    totalScore: 0,
    isGameOver: false,
    isLeft: true,
    currentNumberQuestion: 0,
  }

  const { loading,configQuiz,isButtonNextDisabled,startGame,leftGame,checkAnswer,nextQuestion } = useGame(initialState)

  const { questions, answers, totalScore, isGameOver, isLeft, currentNumberQuestion } = configQuiz

  const progress=(currentNumberQuestion)*(questions.length);
  return (
    <PreferencesProvider>


    <div
      // direction='column'
      // p={10}
      >
      
      <Text variant='xxLarge'>Quizz App</Text>
      { isLeft && <StartPanel startGame={ startGame} isLoading={ loading }/> }
      { isGameOver && <GameOverPanel score={ totalScore } nextQuiz={ leftGame }/> }
      { !isLeft && !isGameOver && (
        <QuestionCard
          question={ questions[currentNumberQuestion]?.question }
          alternatives={ questions[currentNumberQuestion]?.listAlternatives }
          checkAnswer={ checkAnswer }
          leftGame={ leftGame }
          nextQuestion={ nextQuestion }
          userAnswer={ answers ? answers[currentNumberQuestion] : undefined }
          currentNumberQuestion={ currentNumberQuestion }
          isDisabled={ isButtonNextDisabled }
        />
      )}
        { !isLeft && !isGameOver &&<div>
          <ProgressIndicator percentComplete={progress/100}
          barHeight={5}
          label="Progress" description={`${progress} %`}
          />
          <h1>✏️ Question: {currentNumberQuestion+1} / {questions.length}</h1>
          <h2>✅ Score: {totalScore}</h2>
          </div>}
    </div>
    </PreferencesProvider>
  )
}

export default App
