import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);       
  const [page, setPage] = useState("login");    
  
  const switchPage = (newPage) => setPage(newPage);

  const logout = () => {
    setUser(null);
    setPage("login");
  };

  return (
    <div className="app-container">
      {!user && page === "login" && (
        <Login setUser={setUser} switchPage={switchPage} />
      )}
      {!user && page === "signup" && <Signup switchPage={switchPage} />}
      {user && page === "todo" && <TodoForm user={user} logout={logout} />}
    </div>
  );
}

export default App;
