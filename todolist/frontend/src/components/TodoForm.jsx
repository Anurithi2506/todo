import { useState, useEffect } from "react";
import axios from "axios";

function TodoForm({ user, logout }) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/todos/${user._id}`)
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, [user]);

  const addTodo = () => {
    if (!text.trim()) return alert("Please enter a task");

    axios
      .post("http://localhost:5000/todos", { text, userId: user._id })
      .then(res => {
        setTodos([...todos, res.data]);
        setText("");
      })
      .catch(err => console.log(err));
  };

  const completeTodo = async (id) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`);
    setTodos(todos.map(t => t._id === id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="todo-container">
      <h2>My Tasks</h2>

      <div className="todo-input-area">
        <input type="text" placeholder="Enter task..." value={text} onChange={e => setText(e.target.value)} />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className="todo-item">
              <span className={todo.completed ? "todo-done" : ""}>{todo.text}</span>
              <div>
                <button className="done-btn" disabled={todo.completed} onClick={() => completeTodo(todo._id)}>Done</button>
                <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}

export default TodoForm;
