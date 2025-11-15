import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
      if (!text || text.trim() === "") {
    alert("Please enter a task!");
    return;
  }
    axios.post("http://localhost:5000/todos", { text }).then((res) => {
      setTodos([...todos, res.data]);
      setText("");
    });
  };

const Complete = (id) => {
  axios.put(`http://localhost:5000/todos/${id}`)
    .then((res) => {
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    })
    .catch(err => console.log(err));
};

const deleteTodo = (id) => {
  axios.delete(`http://localhost:5000/todos/${id}`)
    .then(() => {
      setTodos(todos.filter((t) => t._id !== id));
    })
    .catch(err => console.log(err));
};

  return (
    <div className="container">
      <h1>My Todo</h1>
      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task..."
        />
        <button className="add-btn" onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <div className="buttons">
              <button 
                onClick={() => Complete(todo._id)} 
                disabled={todo.completed}
                className={todo.completed ? "done-btn" : ""}
              >Done</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
