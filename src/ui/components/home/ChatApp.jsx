import { useEffect, useState, useContext } from "react";
import { faker } from "@faker-js/faker";
import { socket } from "../home/socket";
import { ConnectionState } from "../home/ConnectionState";
import { ConnetionManager } from "../home/ConnetionManager";
import { AuthContext } from "../../../auth";

export const ChatApp = () => {
  const { user, logged } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      const payload = {
        user,
        text: "Joined to the chat room",
        timestamp: new Date().toLocaleTimeString(),
        type: "status",
      };

      socket.emit("chat message", payload);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessages = (value) => {
      setMessages((previous) => [...previous, value]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onMessages);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onMessages);
    };
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (newMessage.trim() !== "") {
      const payload = {
        user,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        type: "msg",
      };

      socket.timeout(5000).emit("chat message", payload, () => {
        setIsLoading(false);
        setNewMessage("");
      });
    }
  };

  const isStatusMessage = (type) => {
    return type === "status" ? "fst-italic fw-light fs-8" : "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <ConnetionManager />

          <div className="card border-primary shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">
                Chat Room <ConnectionState isConnected={isConnected} />
              </h2>
            </div>
            <div
              className="card-body chat-body"
              style={{ height: "400px", overflowY: "auto" }}
            >
              <ul className="list-group list-group-flush">
                {messages.map((message, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex align-items-start mb-2">
                      {!logged && <strong>PayForPhoto</strong>}

                      {logged && (
                        <img
                          src={message.user.userPhoto}
                          className="rounded-circle me-2"
                          alt="Avatar"
                          width="40"
                          height="40"
                        />
                      )}

                      <div className="ms-2">
                        {!logged && <strong>Indefinido</strong>}

                        {logged && <strong>{message.user.username}</strong>}
                        <span className="text-muted small ms-2">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`mb-0 chat-bubble ${isStatusMessage(
                        message.type
                      )}`}
                    >
                      {message.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <form onSubmit={onSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="form-control"
                    disabled={isLoading || !isConnected}
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoading || !isConnected}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
