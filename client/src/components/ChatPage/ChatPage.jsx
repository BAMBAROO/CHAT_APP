import { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useLocation } from "react-router-dom";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const me = new URLSearchParams(location.search).get("from")
  const people = new URLSearchParams(location.search).get("to")

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, { text: newMessage, sender: "asd" }];
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`message ${message.sender === "me" ? "right" : "left"}`}
      >
        {message.text}
      </div>
    ));
  };

  return (
    <div className="chatbox-container">
    <div className="chatbox">
      <div className="chatbox-header">
        <div className="chatbox-title">{me} -- {people}</div>
        <button className="close-button">&#10005;</button>
      </div>
      <div className="chatbox-content">
        <div className="messages">
          {renderMessages()}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="form-chatpage">
          <input
            className="input-chatpage"
            type="text"
            value={newMessage}
            onChange={handleChange}
            placeholder="Ketik pesan..."
          />
          <button type="submit" className="button-chatpage">Kirim</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ChatBox;
