import { v4 as uuid } from "uuid";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo } from "../types/types";

interface TodoProviderProps {
  children: ReactNode;
}

interface ContextProps {
  addTodo: (description: string) => void;
  getFromLocalStorage: () => Todo[];
  updateTodo: (id: string, todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<ContextProps>({
  addTodo: () => {},
  getFromLocalStorage: () => [],
  updateTodo: () => {},
  deleteTodo: () => {},
});

const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [tods, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosFromStorage = getFromLocalStorage();
    setTodos(todosFromStorage);
  }, []);

  //CREATE
  const addTodo = (description: string) => {
    const newTodo: Todo = {
      _id: uuid(),
      description,
      completed: false,
    };
    const updatedTodos = [...tods, newTodo];
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); // שמירה ישירה של כל הרשימה
  };

  //READ
  const getFromLocalStorage = (): Todo[] => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  };

  //UPDATE
  const updateTodo = (id: string, updatedTodo: Todo) => {
    const newToDoList = tods.map((t) => (t._id === id ? updatedTodo : t));
    setTodos(newToDoList);
    saveToLocalStorage(newToDoList);
  };

  //DELETE
  const deleteTodo = (id: string) => {
    const newToDoList = tods.filter((t) => t._id !== id);
    setTodos(newToDoList);
    saveToLocalStorage(newToDoList);
  };

  const saveToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
