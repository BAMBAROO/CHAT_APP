import {  useState } from "react";
import "./ChatPage.scss";
// import { useLocation } from "react-router-dom";

const ChatBox = () => {
  const [msg, setMsg] = useState("");
  // const location = useLocation();
  // const me = new URLSearchParams(location.search).get("from")
  // const people = new URLSearchParams(location.search).get("to");

  return (
    <>
      <div className="wrapper">
        <div className="dim"></div>
        <div className="chat">
          <div className="reminder">
            Welcome! Remember to be kind to others&hellip;
          </div>
          <div className="chatbox">
            <div className="messages-wrapper">
              <div className="status">Searching for a partner...</div>
              <div className="you message">
                <div className="avatar"></div>
                <div className="name">bryan</div>
                <div className="text">halooo nama saya bryan</div>
              </div>
              <div className="them message">
                <div className="avatar"></div>
                <div className="name">hunter</div>
                <div className="text">hiii nama saya hunter</div>
              </div>
            </div>
          </div>
          <div className="reply">
            <div className="typing"></div>
            <div className="wrapper">
              <input
                className="usermsg"
                type="text"
                placeholder="Say hello!"
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
              <button
                className="send"
                onClick={() => {
                  console.log(msg);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
