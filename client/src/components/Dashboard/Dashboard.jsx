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
  let decoded;

  useEffect(() => {
    count++;
    if (count == 2) {
      refreshToken();
      if (socket.connected == false) {
        socket.connect()
      }
    }
    socket.on("visitors", (res) => {
      setVisitors(res);
    });
  }, []);

  function getInfo() {
    axios.get("http://geoplugin.net/json.gp").then(async (res) => {
      const data = {
        name: decoded.name === undefined ? "anonymous" : decoded.name,
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

  function refreshToken() {
    axios
      .get("http://localhost:8000/token", { withCredentials: true })
      .then((res) => (decoded = jwt_decode(res.data.accessToken)))
      .catch((err) => alert(err))
      .finally(() => getInfo());
  }

  // function getFriends(e) {
  //   e.preventDefault();
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   };
  //   axios
  //     .get("http://localhost:8000/user", config)
  //     .then((res) => console.log(res));
  // };

  const logout = () => {
    const config = {
      withCredentials: true,
    };
    axios.delete("http://localhost:8000/logout", config).then((res) => {
      if (res.statusText === "OK") {
        Cookies.remove("logged");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <nav className="navbar" style={{ marginBottom: "10px" }}>
        <div className="navbar-brand">BAMBAROO</div>
        <div className="navbar-menu">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Friends</a>
            </li>
            <li>
              <a
                href="#"
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
                  className="add-button"
                  onClick={() => {
                    console.log(contact.name);
                  }}
                >
                  Tambah
                </button>
                <button className="chat-button">Chat</button>
              </div>
            </li>
          ))}
      </ul>
      <h1>Home</h1>
      <button onClick={() => console.log(Cookies.get("io"))}>check io</button>
    </>
  );
}

export default Home;
