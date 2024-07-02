import './OffererName.css';

const OffererName = ({ users, onUserClick, selectedUserId }) => {
  return (
    <div className='offerers'>
      {users.map((user, index) => (
        <div 
          key={index} 
          className={`offerItem ${user.userId === selectedUserId ? 'selected' : ''}`} c
          onClick={() => onUserClick(user.userId)}
        >
          <h1 className='offerersName'>{user.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default OffererName;

