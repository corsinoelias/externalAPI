import { useContext } from 'react'
import * as React from 'react'
import { PreferencesContext } from '../../../context/PreferencesContext'
import { Text } from '@fluentui/react/lib/Text';

type Props = {
  title: string;
  currentNumberQuestion: number;
}

const Question = ({ title, currentNumberQuestion }: Props) => {

  const { preferences } = useContext(PreferencesContext)

  return (
    <>
       <Text variant='medium' >
        <b>{ preferences.nameCategory }</b>
      </Text>
      <hr />
      <Text variant='mediumPlus' >{title }</Text>
    </>
  )
}

export default Question
