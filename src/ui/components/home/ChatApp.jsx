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
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <ConnetionManager />
  
        <div className="w-full bg-white border border-gray-600 shadow-md rounded-lg mt-4">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg">
            <h2 className="text-center text-xl font-bold">
              Chat Room <ConnectionState isConnected={isConnected} />
            </h2>
          </div>
          <div
            className="p-4 overflow-y-auto"
            style={{ height: "400px" }}
          >
            <ul className="space-y-2">
              {messages.map((message, index) => (
                <li key={index} className="bg-gray-100 rounded-lg p-2">
                  <div className="flex items-start space-x-2">
                    {!logged && <strong className="text-gray-800">PayForPhoto</strong>}
  
                    {logged && (
                      <img
                        src={message.user.userPhoto}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
  
                    <div>
                      {!logged && <strong className="text-gray-800">Indefinido</strong>}
                      {logged && <strong className="text-gray-800">{message.user.username}</strong>}
                      <span className="text-gray-500 text-sm ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`mt-1 text-gray-700 ${isStatusMessage(message.type)}`}
                  >
                    {message.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t">
            <form onSubmit={onSubmit} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 border rounded-md p-2"
                disabled={isLoading || !isConnected}
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-300 disabled:bg-gray-300"
                disabled={isLoading || !isConnected}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};  