import React from 'react';
import "./styles.css";
import {Todo} from "../model";
import SingleTodo from './SingleTodo';
import {Droppable} from 'react-beautiful-dnd'

/*
 top-level Component to hold all the Todos in their given fields;
 completed or not active
 enables droppable fields using droppable tags; sets ids of those areas
 for handling of source-destination handling logic in App component
*/

//Props interface to defne props types in TS
interface Props{
todos:Todo[];
setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
completedtodos:Todo[];
setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}


//component
const TodoList:React.FC<Props> = ({todos,setTodos,completedtodos, setCompletedTodos}) => {
  return (
    <div className='container'>

        <Droppable droppableId="TodoList">

            { (provided, snapshot) =>(

            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
            ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active Tasks</span>

            {
                todos.map((todo, index)=> 
                <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}/>
            )}
            {provided.placeholder}
            </div>)}
       
        </Droppable>

        <Droppable droppableId="ToDoRemove">

            { (provided, snapshot)=>(

                <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
                 ref={provided.innerRef} {...provided.droppableProps}>
                <span className="todos__heading">Completed Tasks</span>

            {
                completedtodos.map((todo, index)=> 
                <SingleTodo
                index={index} 
                todo={todo}
                todos={completedtodos}
                key={todo.id}
                setTodos={setCompletedTodos}/>
            )}
        {provided.placeholder}
        </div>)}

        </Droppable>

    </div>
  )
}//end component

export default TodoList
