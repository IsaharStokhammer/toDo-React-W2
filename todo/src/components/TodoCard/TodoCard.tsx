import React, { FC } from 'react'
import { Todo } from '../../types/types'
import { useGlobalTodo } from '../../context/ToDoContext'
import "./TodoCard.css"

interface TodoCardProps {
    todo: Todo
}


const TodoCard: FC<TodoCardProps> = ({ todo }) => {
    const { _id, description, completed } = todo
    const { updateTodo, deleteTodo } = useGlobalTodo()
    return (
        <div className='TodoCard'>
            {description}
            <button onClick={() => updateTodo(_id!, {_id, description, completed: !completed })}>{!completed ? "❌" : "🦕"}</button>
            <button onClick={() => deleteTodo(_id!)}>delete</button>
        </div>
    )
}

export default TodoCard