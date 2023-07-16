import axios from "axios";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000");

function Home() {
  const [visitors, setVisitors] = useState([]);

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
      }
    });
  }

  function refreshToken(code, to) {
    axios
      .get("http://localhost:8000/token", { withCredentials: true })
      .then((res) => {
        // setDecoded(jwt_decode(res.data.accessToken));
        console.log(jwt_decode(res.data.accessToken));
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
    navigate(`/private?from=${token.name}&to=${to}`);
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
      <nav className="navbar" style={{ marginBottom: "10px" }}>
        <div className="navbar-brand">BAMBAROO</div>
        <div className="navbar-menu">
          <ul>
            <li>
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  refreshToken("getFriends");
                }}
              >
                Friends
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  logout();
                  socket.disconnect();
                }}
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <span className="contact-name">live visitors</span>
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
      <h1>Home</h1>
      <button
        onClick={() => {
          refreshToken("getFriends");
        }}
      >
        friends
      </button>
    </>
  );
}
export default Home;
