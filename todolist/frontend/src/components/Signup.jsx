import { useState } from "react";
import axios from "axios";

function Signup({ switchPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { name, email, password });
      alert("Signup successful!");
      switchPage("login");
    } catch (err) {
      alert( "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => switchPage("login")}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
