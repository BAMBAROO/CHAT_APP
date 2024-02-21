import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ChatPage from "./components/ChatPage/ChatPage.jsx";
import AfterLogin from "./components/Middleware/AfterLogin.jsx";
import BeforeLogin from "./components/Middleware/BeforeLogin.jsx";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BeforeLogin>
              <Dashboard socket={socket}/>
            </BeforeLogin>
          }
        />
        <Route
          path="/login"
          element={
            <AfterLogin>
              <Login/>
            </AfterLogin>
          }
        />
        <Route
          path="/register"
          element={
            <AfterLogin>
              <Register/>
            </AfterLogin>
          }
        />
        <Route
          path="/private"
          element={
            <BeforeLogin>
              <ChatPage socket={socket}/>
            </BeforeLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
