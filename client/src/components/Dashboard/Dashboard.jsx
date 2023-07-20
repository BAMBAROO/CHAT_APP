import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

function Dashboard(props) {
  const [visitors, setVisitors] = useState([]);
  const socket = props?.socket;

  const toast = useRef();
  const progress = useRef();
  const notifTitle = useRef();
  const notifMessage = useRef();

  const navigate = useNavigate();
  let count = 0;

  useEffect(() => {
    count++;
    if (count == 2) {
      refreshToken("getInfo");
      if (socket.connected == false) {
        socket.connect();
      }
    }
    socket.on("visitors", (res) => {
      setVisitors(res);
    });
  }, []);

  function getInfo(decoded) {
    axios.get("http://geoplugin.net/json.gp").then(async (res) => {
      const data = {
        name: decoded.name,
        country: res.data.geoplugin_countryName,
        city: res.data.geoplugin_city,
        ip: res.data.geoplugin_request,
      };
      if (
        data.name !== undefined &&
        data.country !== undefined &&
        data.city !== undefined &&
        data.ip !== undefined
      ) {
        socket.emit("new_visitor", data);
        socket.on(data.name, (data) => {
          console.log(data);
          notifTitle.current.textContent = `${data.from}`
          notifMessage.current.textContent = `${data.message}`
          toast.current.classList.add("active");
          progress.current.classList.add("active");
          setTimeout(() => {
            toast.current.classList.remove("active");
          }, 2000);
          setTimeout(() => {
            progress.current.classList.remove("active");
          }, 2300);
        });
      }
    });
  }

  function refreshToken(code, to) {
    axios
      .get("http://localhost:8000/token", { withCredentials: true })
      .then((res) => {
        if (code === "privateChat") {
          if (res.statusText === "Forbidden") {
            logout();
          }
          privateChat(jwt_decode(res.data.accessToken), to);
        } else if (code === "getInfo") {
          getInfo(jwt_decode(res.data.accessToken));
        }
      })
      .catch((err) => alert(err));
  }

  function privateChat(token, to) {
    if (token.name === to) {
      return alert("this is you");
    }
    navigate("/private", {
      state: {
        from: token.name,
        to: to,
      },
    });
  }

  function logout() {
    const config = {
      withCredentials: true,
    };
    axios.delete("http://localhost:8000/logout", config).then((res) => {
      console.log(res);
      if (res.statusText === "OK") {
        Cookies.remove("logged");
        navigate("/login");
      }
      if (res.response.statusText) {
        alert("something went wrong, please relog!");
        Cookies.remove("logged");
        navigate("/login");
      }
    });
  }

  return (
    <>
      <Navbar logout={logout} refreshToken={refreshToken} socket={socket} />
      <div className="toast" ref={toast}>
        <div className="toast-content">
          <i className="fas fa-solid fa-check check"></i>

          <div className="message1">
            <span className="text1 text-1" ref={notifTitle}>Notification</span>
            <span className="text1 text-2" ref={notifMessage}>
              You have some message from Bruce
            </span>
          </div>
        </div>

        <div className="progress" ref={progress}></div>
      </div>
      <span className="contact-name" style={{ color: "red" }}>
        live visitors
      </span>
      <hr />
      <ul className="contact-list">
        {visitors &&
          visitors.map((contact, index) => (
            <li key={index} className="contact-list-item">
              <div className="contact-info">
                <span className="contact-name">{contact.name}</span>
                <div className="contact-location">
                  <span>{contact.country}</span>
                  <span>{contact.city}</span>
                </div>
              </div>
              <div className="contact-action-buttons">
                <button
                  className="chat-button"
                  onClick={() => {
                    refreshToken("privateChat", contact.name);
                  }}
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
export default Dashboard;
