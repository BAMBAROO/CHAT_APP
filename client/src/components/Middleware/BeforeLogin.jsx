import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const BeforeLogin = ({ children }) => {
  const cookie = Cookies.get("logged");
  return cookie !== "OK" ? <Navigate to={"/login"}/> : children;
};

export default BeforeLogin;
