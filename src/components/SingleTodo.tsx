import React, {useState, useEffect, useRef} from 'react';
import {Todo} from "../model";
import { AiFillEdit, AiFillDelete} from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import TodoList from './TodoList';
import {Draggable} from 'react-beautiful-dnd';

/*
Single todo component shapes the component that each 
todo object will be mapped to
includes crud buttons using react-icons
*/


//Props type to defne props types in TS
type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;

}

//component
const SingleTodo:React.FC<Props> = ({todo,todos,setTodos,index}) => {

    //edit states - if editing is being done, and update the edited todo
    const [edit, setedit] = useState<boolean>(false);
    const [edittodo, setEditTodo] = useState<string>(todo.todo);

    //input reference
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current?.focus();
    }, [edit]);



    //handle clicking the 'tick' - todo is done/undone - sets isDone, which controls the strikethrough effect
    const handleDone = (id: number) =>{
        setTodos(todos.map((todo)=>todo.id == id?{...todo, isDone:!todo.isDone} : todo))
    };

    //handle deleting a todo from the state - filter todo from the todos array
    const handleDelete = (id: number) =>{
        setTodos(todos.filter((todo)=>todo.id !== id ));

    };

    //handle editing the todo - update the todos with the edited todo
    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: edittodo } : todo))
          );
          setedit(false);

    };



  return (

    <Draggable draggableId={todo.id.toString()} index={index}>
        {
        (provided, snapshot) => (

        <form 
            className={`todos_single ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

    {
            edit ? (
            <input value={edittodo}
             onChange={(e) => setEditTodo(e.target.value)}
             className="todos_single--text"
             />
        ):
        (
            todo.isDone ? (<s className="todos_single--text">{todo.todo}</s>):
            (<span className="todos_single--text">{todo.todo}</span>)
        )
    }

            <div>
                <span className="icon">
                    <AiFillEdit onClick={()=>{
                        if (!edit && !todo.isDone){
                            setedit(!edit)}
                    }}/>
                </span>

                <span className="icon">
                <AiFillDelete onClick={()=>handleDelete(todo.id)}/>
                </span>

                <span className="icon">
                    <MdDone onClick={()=>handleDone(todo.id)}/>
                </span>
            </div>
      
        </form>
    )}

    </Draggable>
    
  )
}//end Component

export default SingleTodo
