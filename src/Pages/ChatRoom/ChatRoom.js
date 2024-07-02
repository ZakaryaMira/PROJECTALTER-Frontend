import { useState } from 'react';
import WaitingRoom from '../../components/waitingRoom/WaitingRoom';
import './ChatRoom.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Chat from '../../components/Chat/Chat';

const ChatRoom = () => {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  // Function to handle incoming messages
  const handleReceiveMessage = (sender, message) => {
    console.log("Received message:", message);
    console.log("Sender:", sender); // Check the sender
    // Add your logic to handle the received message here
    setMessages(prevMessages => [...prevMessages, { username: sender, msg: message }]);
  };

  const joinChatRoom = async (username, chatRoom) => {
    try {
      const connection = new HubConnectionBuilder() 
        .withUrl("http://localhost:5105/Chat")
        .configureLogging(LogLevel.Information)
        .build();
      
      connection.on("recivemessage", handleReceiveMessage); // Handling incoming messages

      await connection.start();
      await connection.invoke("JoinSpecificGroup", { username, chatRoom });
      
      setConnection(connection);
    } catch(error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try{
      console.log("Sending message:", message);
      await conn.invoke("SendMessage", message);
    } catch(e){
      console.log(e);
    }
  };

  return (
    !conn 
      ? <WaitingRoom joinChatRoom={joinChatRoom} />
      : <Chat messages={messages} sendMessage={sendMessage} /> // Pass the correct prop name
  );
};

export default ChatRoom;
