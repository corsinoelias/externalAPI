import * as React from "react";

import Alternative from "./Alternative";
import Question from "./Question";
import { Answer } from "../../types/quiz";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";

type Props = {
  question: string;
  alternatives: string[] | undefined;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  leftGame: VoidFunction;
  nextQuestion: VoidFunction;
  userAnswer: Answer | undefined;
  currentNumberQuestion: number;
  isDisabled: boolean;
};

const QuestionCard = ({
  question,
  alternatives,
  checkAnswer,
  leftGame,
  nextQuestion,
  userAnswer,
  currentNumberQuestion,
  isDisabled,
}: Props) => {
  return (
    <div>
      <div>
        <Question
          title={question}
          currentNumberQuestion={currentNumberQuestion}
        />
      </div>
      <div>
        {
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap:'60px',
              rowGap:'20px'
            }}
          >
            {alternatives?.map((alternative, index) => (
              <Alternative
                key={index}
                title={alternative}
                checkAnswer={checkAnswer}
                isCorrect={userAnswer?.correct_answer === alternative}
                isUserClicked={userAnswer?.userAnswer === alternative}
                isDisabled={Boolean(userAnswer)}
              />
            ))}
          </div>
        }
      </div>
      <div
        style={{
          display: "flex",
          justifyContent:'space-between'
        }}
      >
        <DefaultButton
          iconProps={{
            iconName: "ClosePaneMirrored",
          }}
          onClick={leftGame}
        >
          Quit Quiz
        </DefaultButton>
        <PrimaryButton onClick={nextQuestion} disabled={isDisabled}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default QuestionCard;
