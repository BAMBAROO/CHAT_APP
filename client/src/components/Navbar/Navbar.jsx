import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Navbar(props) {
  const socket = props?.socket;
  const navigate = useNavigate();

  function logout() {
    const config = {
      withCredentials: true,
    };
    axios.delete("http://localhost:8000/logout", config).then((res) => {
      if (res?.statusText === "OK") {
        Cookies.remove("logged");
        navigate("/login");
      }
      if (res.response?.statusText) {
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
                  window.location.reload();
                }}
              >
                Dashboard
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
    </>
  );
}

export default Navbar