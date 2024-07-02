import './Listinings.css';
import { useNavigate } from 'react-router-dom';

const Listinings = ({ listing, type, isCurrentUser, onDetailsClick }) => {
  const { skillId, skillName, skillLevel, skillDescription, info, requestId, requestTitle, requestDescription } = listing;
  const cardClass = type === 'exchange' ? 'card exchange' : 'card offers';
  const navigate = useNavigate();
  const maxLength = 82;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (isCurrentUser) {
      navigate(`/Offers/${requestId}`);
    } else {
      onDetailsClick(listing);
    }
  };

  return (
    <div className={cardClass}>
      <div className="card-body">
        {type === 'exchange' ? (
          <>
            <h2 className="card-title">{skillName}</h2>
            <h4 className="card-subtitle mb-2 card-level">{skillLevel}</h4>
            <h6 className="card-subtitle mb-2 skill-description">{truncateText(skillDescription, maxLength)}</h6>
            <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); onDetailsClick(listing); }}>
              {isCurrentUser ? 'Edit' : 'Details'}
            </a>
          </>
        ) : (
          <>
            <h2 className="card-title">{requestTitle}</h2>
            <h6 className="card-subtitle mb-2 text-body-secondary">{truncateText(requestDescription, maxLength)}</h6>
            <p className="card-text">{info}</p>
            <a href="#" className="card-link" onClick={handleLinkClick}>
              {isCurrentUser ? 'Show Offers' : 'Details'}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Listinings;
