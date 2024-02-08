import { DefaultButton } from 'office-ui-fabric-react'
import * as React from 'react'
type Props = {
  title: string
  isDisabled: boolean
  isCorrect: boolean | undefined
  isUserClicked: boolean | undefined
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Alternative = ({ title,isDisabled,isCorrect,isUserClicked,checkAnswer }: Props) => {

  const color = isCorrect 
    ? '#12c69d' 
    : !isCorrect && isUserClicked 
    ? 'red' 
    : 'black'

    return (
        <DefaultButton
        onClick={checkAnswer}
        disabled={isDisabled}
        style={{
          borderColor:color,
          color:color,
          // background:'black',
          padding:'30px'
        }}
        >
          {title}
        </DefaultButton>
    )
}

export default Alternative
