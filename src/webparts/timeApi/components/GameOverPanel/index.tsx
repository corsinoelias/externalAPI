import * as React from 'react'
import { getMessageByScore } from '../../helpers/getMessageByScore'
import config from '../../config/quiz'
import { PrimaryButton } from 'office-ui-fabric-react';

type Props = {
  score: number
  nextQuiz: VoidFunction
}

const GameOverPanel = ({ score, nextQuiz }: Props) => {

  const messageByScore = getMessageByScore(score);

  return (
    <div>
      <img
        src={ messageByScore.image }
        alt={ messageByScore.message }
        style={{width:'60px'}}
        />
      <h1 >
        { messageByScore.message }
      </h1>
      <p color='white'>
        YOUR SCORE
      </p>
      <p >
        { score } / { config.totalQuestions }
      </p>
      <div>
        <PrimaryButton
          color='white'
          onClick={ nextQuiz }>
          Take New Quiz
        </PrimaryButton>
      </div>
    </div>
  )
}

export default GameOverPanel
