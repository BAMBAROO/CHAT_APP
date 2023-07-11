import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    axios.post("http://localhost:8000/login", data, config).then((res) => {
      if (res.statusText === "OK") {
        Cookies.set("logged", "OK");
        navigate("/");
      }
    }).catch((error) => alert(error.response.data.message));
  };

  return (
    <div className="login-page">
      <h1 className="login-heading">BAMBAR00 || Sign In</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
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
        <button type="submit" className="login-button">
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/register");
          }}
          className="login-button"
        >
          to Sign Up Page
        </button>
      </form>
    </div>
  );
};

export default Login;
