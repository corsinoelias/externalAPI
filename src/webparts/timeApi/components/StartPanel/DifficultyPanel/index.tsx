import { useContext } from 'react'
import * as React from 'react'
import { PreferencesContext } from '../../../context/PreferencesContext'


const DifficultyPanel = () => {
  
  const { preferences, setPreferences } = useContext(PreferencesContext)

  return (
    <div>
      {/* <FormControl color='white' mb={5}>
        <FormLabel as='legend' fontWeight='bold' fontSize='2xl'>
          Choose Difficulty
        </FormLabel>
        <RadioGroup
          defaultValue={ preferences.difficulty }
          name='difficulty'
          id='difficulty'
          onChange={ (value) => setPreferences((prevPreferences) => ({ ...prevPreferences, difficulty: value })) }
        >
          <HStack spacing='34px'>
            <Radio value='easy'>Easy</Radio>
            <Radio value='medium'>Medium</Radio>
            <Radio value='hard'>Hard</Radio>
          </HStack>
        </RadioGroup>
      </FormControl> */}
    </div>
  )
}

export default DifficultyPanel
