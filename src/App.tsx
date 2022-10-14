import React, { useState } from 'react';
import './App.css';
import InputField from "./components/InputFeild";
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';


/*
Simple to-do app in TypeScript
*/



const App: React.FC = () => {

  //State; Single Todo, Todo Array, Completed Todo Array
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedtodos, setCompletedTodos] = useState<Todo[]>([]);


  //handle adding a todo 
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //if the entered todo exists, spread the todo array, add the new todo object 
    //with an id of the current date/time
    if(todo){
      setTodos([...todos,{id:Date.now(), todo, isDone:false}]);
          setTodo("");
    }
      

  }//end handleAdd


//handle when dragging a todo ends
//action based on object source vs destination
const onDragEnd = (result: DropResult) => {
  //get source/destination from result object
  const {source, destination} = result;

  //if no destination, do nothing - dropped outside droppable area
  if (!destination) {return;}

  //if the source and destination are the same, do nothing
  if ( destination.droppableId === source.droppableId && destination.index === source.index) {return;}


    //init values to add the dragged todo to the destination todo array;
    //if active, add to completed todos
    //if completed, add to active todos
    let add;
    let active = todos;
    let complete = completedtodos;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }


    // Destination Logic
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    //set new state of todos
    setCompletedTodos(complete);
    setTodos(active);

}


//component wrapped in drag drop context tag
  return (
    <DragDropContext onDragEnd={onDragEnd}> 
    <div className="App">
    <span className="heading">ToDo</span>

    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    
    <TodoList todos={todos} setTodos={setTodos}
    completedtodos={completedtodos} setCompletedTodos={setCompletedTodos}/>

   

    </div>
    </DragDropContext>
  )
}//end component


export default App;
