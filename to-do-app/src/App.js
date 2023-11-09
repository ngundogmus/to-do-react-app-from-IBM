import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';

const App = () =>{
  const [todos , setTodos] = React.useState([]);
  const [todoEditing, setTodoEditing] = React.useState(null);

  useEffect(()=>{
    const json = localStorage.getItem("todos");
    //It retrieves the value stored in the local storage under the key "todos" and assigns it to the variable json.
    const loadedTodos = JSON.parse(json);
    if (loadedTodos){
      setTodos(loadedTodos);
    } 
  },[]);

  useEffect(() =>{
    if(todos.length > 0){
      const json = JSON.stringify(todos)
      //It converts the todos array into a JSON-formatted string using JSON
      localStorage.setItem("todos",json) 
      // It sets the "todos" key in the local storage to the JSON string representation of the todos array. This effectively saves the current state of todos to the local storage.
    }    
  }, [todos]);

  function handlesubmit(e) {
    e.prevenDefault();
    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id : new Date.getTime(),
      text : todo.trim(),
      completed : false,      
    };
    if (newTodo.text.length > 0 ){
      //it updates the todos state by creating a new array 
      //with the existing todos ([...todos]) and adding the newTodo using concat
      setTodos([...todos].concat(newTodo));
    }else {
      alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(newtodo) {
    // Creates a new array with todos,
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        // Updates the text of the todo with the input value from the corresponding input field
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      // Sets the todos state to the updated array with the edited text
      setTodos(updatedTodos);
      // Resets the todoEditing state to null, indicating that editing mode is no longer active
      setTodoEditing(null);
    }
  

  return (
    <div id='todo-list'>
      <h1>To Do List</h1>
        <form onSubmit={handlesubmit}>
          <input type='text' name='todoAdd' id='todoAdd'> </input>
          <button type='submit'>Add Todo</button>
        </form>
        {/* The todos.map function is used to iterate over the todos array
         and render a div for each todo item.*/}
          {todos.map((todo)=>{
            <div key={todo.id} className='todo'>
              <div className='todo-text'>
                <input type='checkbox' 
                id='completed'
                checked={todo.completed}
                onChange={()=> toggleComplete(todo.id)}/>
                {/* if it is edit mode, display input box, else display text */}
                {todo.id === todoEditing ? 
                (<input type="text" id = {todo.id} defaultValue={todo.text}/>):
                (<div>{todo.text}</div>)
                }
              </div>
              <div className='todo-actions'>
                {/* if it is edit mode, allow submit edit, else allow edit */}
                {todo.id === todoEditing ?
                (<button onClick={()=> submitEdits()}>Submit Edits</button>):
                (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
                }
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
        })}
    </div>
  );
};




