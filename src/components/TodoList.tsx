import React from 'react';
import "./styles.css";
import {Todo} from "../model";
import SingleTodo from './SingleTodo';
import {Droppable} from 'react-beautiful-dnd'


interface Props{
todos:Todo[];
setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
completedtodos:Todo[];
setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}
const TodoList:React.FC<Props> = ({todos,setTodos,completedtodos, setCompletedTodos}) => {
  return (
    <div className='container'>
        <Droppable droppableId="TodoList">

            {
                (provided, snapshot) =>(

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
                )
            }
        {provided.placeholder}
        </div> 
                )}
       
        </Droppable>

        <Droppable droppableId="ToDoRemove">
            {
            (provided, snapshot)=>(

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
                )
            }
        {provided.placeholder}
        </div>
            )}
        </Droppable>

      
    </div>
  )
}

export default TodoList
