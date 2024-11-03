import React, { useEffect } from "react";
import { Todo } from "../../types/types";
import { useGlobalTodo } from "../../context/ToDoContext";
import TodoCard from "../TodoCard/TodoCard";
import "./TodosContainer.css";

const TodosContainer = () => {
  const { getFromLocalStorage } = useGlobalTodo();
  const todos: Todo[] = getFromLocalStorage();

  useEffect(() => {
    return () => {};
  }, [todos]);
  return (
    <div className="TodosContainer">
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <TodoCard todo = {todo}/>
          </div>
        );
      })}
    </div>
  );
};

export default TodosContainer;
