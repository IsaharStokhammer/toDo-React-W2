import {FC} from "react";
import { useGlobalTodo } from "../../context/ToDoContext";
import "./FormInput.css";

const FormInput: FC = () => {
  const { addTodo } = useGlobalTodo();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(e.target.elements.description.value);    
    addTodo(e.target.elements.description.value);
  };
  return (
    <div className="FormInput">
      <form className="Form" onSubmit={handleSubmit}>
        <input name="description" type="text" placeholder="input description of new Todo"/>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default FormInput;
