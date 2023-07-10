import axios from "axios";
import io from "socket.io-client";
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
      // call api for get accessToken
      axios.get("http://geoplugin.net/json.gp").then((res) =>
        socket.emit("new_visitor", {
          ip: res.data.geoplugin_request,
          country: res.data.geoplugin_countryName,
          city: res.data.geoplugin_city,
        })
      );
    }
    socket.on("visitors", (res) => {
      setVisitors(res);
    });
  }, [ ]);

  // const refreshToken = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get("http://localhost:8000/token", { withCredentials: true })
  //     .then((res) => setToken(res.data.accessToken));
  // };

  // const getFriends = (e) => {
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

  const contacts = [
    {
      name: "John Doe",
      country: "USA",
      city: "New York",
    },
    {
      name: "Jane Smith",
      country: "Canada",
      city: "Toronto",
    },
  ];

  // create dashborad for list live visitors
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Merk</div>
        <div className="navbar-menu">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Friends</a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="contact-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-list-item">
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <div className="contact-location">
                <span>{contact.country}</span>
                <span>{contact.city}</span>
              </div>
            </div>
            <div className="contact-action-buttons">
              <button className="add-button">Tambah</button>
              <button className="chat-button">Chat</button>
            </div>
          </li>
        ))}
      </ul>
      <h1>Home</h1>
      <button onClick={() => console.log(visitors)}>check visitors</button>
      <button onClick={() => logout()}>logou</button>
      {/* <button onClick={() => deleteSession()}>delete</button> */}
    </>
  );
}

export default Home;
