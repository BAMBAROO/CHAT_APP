import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AfterLogin = ({ children }) => {
  const cookie = Cookies.get("logged");
  return cookie === "OK" ? <Navigate to={"/"}/> : children;
};

export default AfterLogin;
