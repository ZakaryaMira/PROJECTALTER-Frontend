import './Infromation.css';

const Informations = ({ onButtonClick, currentDetail, type }) => {
  const buttons = type === 'exchange' ? [
    { type: 'skillDetails', label: 'Skill Detail' },
    { type: 'userCertificate', label: 'User Certificate' },
    { type: 'ShowCase', label: 'Skill Showcase' },
    { type: 'Links', label: 'Links' },
    { type: 'Languges', label: 'Languges' },
    { type: 'UsersFeedback', label: 'Users Feedback' },
    { type: 'wishlist', label: 'wishlist' },
    { type: 'ExchangeButtom', label: 'ExchangeButtom' },
  ] : [
    { type: 'skillDetails', label: 'Request Details' },
    { type: 'RequestOffer', label: 'Request Offer' }
  ];

  return (
    <div className='informations'>
      {buttons.map((button) => (
        <button 
          key={button.type} 
          className={`info-button ${currentDetail === button.type ? 'active' : ''}`} 
          onClick={() => onButtonClick(button.type)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Informations;
