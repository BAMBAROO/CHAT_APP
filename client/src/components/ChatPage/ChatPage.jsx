import { useEffect, useRef, useState } from "react";
import "./ChatPage.scss";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
// import ReactScrollbleFeed from "react-scrollable-feed";

const ChatBox = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "asd",
      message: "msg",
      time: "time",
    },
  ]);
  const location = useLocation();
  const me = new URLSearchParams(location.search).get("from");
  const them = new URLSearchParams(location.search).get("to");
  const socket = io("http://localhost:8000");
  const inputMessage = useRef();

  let count;

  useEffect(() => {
    count++;
    if (count == 2) {
      if (socket.connected == false) {
        socket.connect();
        console.log("done");
      }
    }
  }, []);

  function enter() {
    if (msg !== "") {
      console.log(msg);
      setMessages([
        ...messages,
        {
          from: me,
          message: msg,
        },
      ]);
      inputMessage.current.value = "";
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="dim"></div>
        <div className="chat">
          <div className="reminder">
            Welcome! Remember to be kind to others&hellip;
          </div>
          <div className="chatbox">
            <div className="messages-wrapper" style={{overflowY:"auto"}}>
              <div className="status">Searching for a partner...</div>
              <div className="you message">
                <div className="avatar"></div>
                <div className="name">{me}</div>
                <div className="text">halooo nama saya bryan</div>
              </div>
              <div className="them message">
                <div className="avatar"></div>
                <div className="name">{them}</div>
                <div className="text">hiii nama saya hunter</div>
              </div>
              {/* <ReactScrollbleFeed> */}
                {messages &&
                  messages.map((data) => {
                    return (
                      <>
                        <div className="you message">
                          <div className="avatar"></div>
                          <div className="name">{data.from}</div>
                          <div className="text">{data.message}</div>
                        </div>
                      </>
                    );
                  })}
              {/* </ReactScrollbleFeed> */}
            </div>
          </div>
          <div className="reply">
            <div className="typing"></div>
            <div className="wrapper">
              <input
                className="usermsg"
                type="text"
                placeholder="Say hello!"
                ref={inputMessage}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    enter();
                  }
                }}
              />
              <button
                className="send"
                onClick={() => {
                  enter();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          console.log(messages);
        }}
      >
        messages
      </button>
    </>
  );
};

export default ChatBox;
