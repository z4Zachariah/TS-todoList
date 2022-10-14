import React, {useRef} from 'react'
import "./styles.css";

interface Props  {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;

}

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
}

export default Inputfeild;