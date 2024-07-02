import { useState } from "react";

const SendMessageFrom = ({ sendMessage }) => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(msg);
        setMsg('');
    };

    const handleChange = (e) => {
        setMsg(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="messageInput">Chat</label>
                <input
                    type="text"
                    id="messageInput"
                    value={msg}
                    onChange={handleChange}
                    placeholder="Type a message"
                    style={{ marginLeft: '0.5rem' }}
                />
            </div>
            <button type="submit" disabled={!msg}>Send</button>
        </form>
    );
};

export default SendMessageFrom;
