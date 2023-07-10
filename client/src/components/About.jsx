import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:3000/about", { withCredentials: true })
      .then((res) => 
        res.data.message === "block" ? navigate('/') : setResponse(res.data)
      )
  }, [])

  return (
    <>
      <h1>About</h1>
      <button onClick={() => console.log(response)}>message</button>
    </>
  );
}

export default About;
