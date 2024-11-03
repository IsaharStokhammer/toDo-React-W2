import React, { FC } from 'react'
import TodosContainer from '../ToddosContainer/TodosContainer'
import FormInput from '../FormInput/FormInput'
import './MainPage.css'

const MainPage: FC = () => {
  return (
    <div className="MainPage">
         <FormInput/>
        <TodosContainer/>
    </div>
  )
}

export default MainPage