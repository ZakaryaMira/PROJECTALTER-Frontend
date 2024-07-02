import { useState } from 'react';

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        joinChatRoom(username, chatRoom);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleChatRoomChange = (e) => {
        setChatRoom(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="ChatRoom"
                    value={chatRoom}
                    onChange={handleChatRoomChange}
                    style={{ marginRight: '10px' }}
                />
            </div>
            <div>
                <hr />
                <button className="btn btn-success" type="submit">Join</button>
                <hr />
            </div>
        </form>
    );
};

export default WaitingRoom;
