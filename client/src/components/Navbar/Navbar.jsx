import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const socket = props.socket;
  const logout = props.logout;
  const setMessages = props?.messages
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar" style={{ marginBottom: "10px" }}>
        <div className="navbar-brand">BAMBAROO</div>
        <div className="navbar-menu">
          <ul>
            <li>
              <a
                onClick={() => {
                  setMessages([])
                  navigate("/");
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