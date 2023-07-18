import { useEffect, useRef, useState } from "react";
import "./ChatPage.scss";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const ChatBox = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "asd",
      message: "msg",
    },
  ]);
  const location = useLocation();
  const me = location.state.from;
  const them = location.state.to;
  const socket = io("http://localhost:8000");
  const inputMessage = useRef();
  const messageView = useRef();

  let count;

  useEffect(() => {
    count++;
    if (count == 2) {
      console.log(location.state)
    }
    socket.on(me, (data) => {
      setMessages((messageBaru) => [...messageBaru, data])
    });
  }, []);

  useEffect(() => {
    messageView.current?.scrollIntoView()
  },[messages])

  function enter() {
    if (msg !== "") {
      const data = {
        from: me,
        message: msg,
      };
      socket.emit("message", me, them, data);
      setMessages(messages => [...messages, data]);
      inputMessage.current.value = "";
      setMsg("");
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
            <div className="messages-wrapper" style={{ overflowY: "auto" }}>
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
                      <div
                        className={
                          data.from === me ? "you message" : "them message"
                        }
                      >
                        <div className="avatar"></div>
                        <div className="name">{data.from}</div>
                        <div className="text">{data.message}</div>
                      </div>
                    </>
                  );
                })}
              {/* </ReactScrollbleFeed> */}
              <div ref={messageView} />
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
