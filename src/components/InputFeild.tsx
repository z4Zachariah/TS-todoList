import React, {useRef} from 'react'
import "./styles.css";

/*
This is the input field at the top of the app - 
takes in a string a creates a todo object on submission
*/

//Props interface to defne props types in TS
interface Props  {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;

}


//component
const Inputfeild: React.FC<Props> = ({todo,setTodo,handleAdd}:Props) => {
const inputref = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={
      (e)=>{
        handleAdd(e);
        inputref.current?.blur();
      }
      }>

      <input type="input"
      ref={inputref}
      value={todo}
      onChange={
        (e)=>setTodo(e.target.value)
      }
       placeholder='enter a task'
        className='inputbox'/>
      <button type='submit' className="inputsubmit">Go</button>
      
    </form>
  )
}//component ends

export default Inputfeild;