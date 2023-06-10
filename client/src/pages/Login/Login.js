import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/admin", {
        email,
        password,
      });

      console.log("Logged in successfully");
      console.log(response);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="content">
      <h1 className="h2 text-center mb-4 mt-3 mx-2">Login</h1>
      <div className="card col-12 col-lg-4 login-card mt-2">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group text-left">
            <input
              type="email"
              id="emailInput"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group text-left">
            <input
              type="password"
              id="passwordInput"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;