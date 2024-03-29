import {useEffect, useRef, useState} from "react";
import "./ChatPage.scss";
import {useLocation} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ChatBox = (props) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const prevMessages = location.state.messages;
  const me = location.state.from;
  const them = location.state.to;
  const socket = props?.socket;
  const inputMessage = useRef();
  const messageView = useRef();

  // let count = 0;

  useEffect(() => {
    console.log(prevMessages)
    // count = count + 1;
    // if (count == 2) {
      setMessages(prevMessages)
      socket.on(me, (data) => {
        setMessages((messageBaru) => [...messageBaru, data]);
      });
    // }
  }, []);

  useEffect(() => {
    messageView.current?.scrollIntoView();
  }, [messages]);

  function enter() {
    if (msg !== "") {
      const data = {
        from: me,
        message: msg,
      };
      socket.emit("message", me, them, data);
      setMessages((messages) => [...messages, data]);
      inputMessage.current.value = "";
      setMsg("");
    }
  }

  return (
    <>
      <Navbar messages={setMessages} socket={socket}/>
      <div className="wrapper">
        <div className="dim"></div>
        <div className="chat">
          <div className="reminder">
            Welcome! Remember to be kind to others&hellip;
          </div>
          <div className="chatbox">
            <div className="messages-wrapper" style={{overflowY: "auto"}}>
              <div className="status">BAMBAROO CHAT APP</div>
              {messages &&
                messages.map((data, index) => {
                  return (
                    <>
                      <div
                        className={
                          data.from === me ? "you message" : "them message"
                        }
                        key={index}
                      >
                        <div className="avatar"></div>
                        <div className="name">{data.from}</div>
                        <div className="text">{data.message}</div>
                      </div>
                    </>
                  );
                })}
              <div ref={messageView}/>
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
    </>
  );
};

export default ChatBox;
