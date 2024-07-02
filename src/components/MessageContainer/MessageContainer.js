const MessageContainer = ({ messages }) => {
  return (
      <div>
          {messages.map((msg, index) => (
              <div key={index}>
                  <p>{`${msg.msg} - ${msg.username}`}</p>
              </div>
          ))}
      </div>
  );
};

  
  export default MessageContainer;
  