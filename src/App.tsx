import React, { useState } from 'react';
import './App.css';
import InputField from "./components/InputFeild";
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';



const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedtodos, setCompletedTodos] = useState<Todo[]>([]);


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos,{id:Date.now(), todo, isDone:false}]);
          setTodo("");
    }
      

  }


const onDragEnd = (result: DropResult) => {
  const {source, destination} = result;

  if (!destination) {return;}

  if ( destination.droppableId === source.droppableId && destination.index === source.index) {return;}

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


    setCompletedTodos(complete);
    setTodos(active);

}

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
}

export default App;
