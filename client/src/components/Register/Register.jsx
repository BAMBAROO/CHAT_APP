import { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = { name, email, password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post("http://localhost:5000/register", data, config)
      .then((res) => {
        console.log({ res });
        if (res.statusText === "Created") {
          console.log(res.data.message);
          navigate("/login");
        }
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div className="register-page">
      <h1 className="register-heading">BAMBAR00 || Sign Up</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={handleNameChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/login");
          }}
          className="register-button"
        >
          to Sign In Page
        </button>
      </form>
    </div>
  );
};

export default Register;
