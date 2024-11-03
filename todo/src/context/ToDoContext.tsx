import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { Todo } from "../types/types";
import { v4 as uuid } from "uuid";

interface TodoProviderProps {
  children: ReactNode;
}

interface ContextProps {
  addTodo: (description: string) => void;
  getFromLocalStorage: () => Todo[];
  updateTodo: (_id: string, todo: Todo) => void;
  deleteTodo: (_id: string) => void;
}

const TodoContext = createContext<ContextProps>({
  addTodo: () => {},
  getFromLocalStorage: () => [],
  updateTodo: () => {},
  deleteTodo: () => {},
});

const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));

  },[todos]

)

  //CREATE
  const addTodo = (description: string) => {
    const newTodo: Todo = {
      description: description,
      _id: uuid(),
      completed: false,
    };

    setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        return updatedTodos;
      });
      
  };
  //READ
  const getFromLocalStorage = () => {
    const data = localStorage.getItem("todos");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  //UPDATE
  const updateTodo = (id: string |undefined, todo: Todo) => {
    let newTodoList = [...todos];
    newTodoList.map((t) => (t._id === id ? todo : t));
    setTodos(newTodoList);
  };
  //DELETE
  const deleteTodo = (id: string | undefined) => {
    let newTodoList = [...todos];
    newTodoList.splice(newTodoList.findIndex((t) => t._id === id), 1);
    // newTodoList.filter((t) => t._id !== id);
    setTodos(newTodoList);
  };


  return (
    <TodoContext.Provider
      value={{
        addTodo,
        getFromLocalStorage,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useGlobalTodo = () => {
  return useContext(TodoContext);
};

export { TodoContext, TodoProvider };
