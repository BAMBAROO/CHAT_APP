// import { useEffect, useRef, useState } from "react";
import "./ChatPage.scss";
// import { useLocation } from "react-router-dom";

const ChatBox = () => {
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
            </div>
          </div>
          <div className="reply">
            <div className="typing"></div>
            <div className="wrapper">
              <input
                className="usermsg"
                type="text"
                placeholder="Say hello!"
              />
              <button className="send">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
