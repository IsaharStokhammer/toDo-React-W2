import React, { FC } from 'react'
import TodosContainer from '../ToddosContainer/TodosContainer'
import FormInput from '../FormInput/FormInput'

const MainPage: FC = () => {
  return (
    <div>
        <TodosContainer/>
         <FormInput/>
    </div>
  )
}

export default MainPage