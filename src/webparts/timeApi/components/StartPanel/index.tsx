import * as React from 'react'
import DifficultyPanel from './DifficultyPanel'
import InstructionsPanel from './InstructionsPanel'
import { ChoiceGroupIconExample } from './CategoriesPanelSPFX/categoriesPanelSPFX'
import { PrimaryButton } from 'office-ui-fabric-react';
import { PreferencesContext } from '../../context/PreferencesContext'
import { useContext } from 'react'

type Props = {
  startGame: VoidFunction
  isLoading: boolean
}

const StartPanel = ({ startGame, ...props }: Props) => {
  const { preferences,setPreferences } = useContext(PreferencesContext);
  return (
    <div >
      <InstructionsPanel />
      <DifficultyPanel />
      <ChoiceGroupIconExample />      
      <div >
        <PrimaryButton
            { ...props }
        disabled={preferences.nameCategory==''}
            onClick={ startGame }>
            START QUIZ
        </PrimaryButton>
      </div> 
    </div>
  )
}

export default StartPanel
