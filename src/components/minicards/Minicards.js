import './Minicards.css';

const Minicards = ({ title, image, width, height, className, onClick, isSelected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
    // JavaScript pattern used to handle optional values
      className={`services-box-two-one ${className || ''} ${isSelected ? 'selected' : ''}`}
      style={{ width, height }}
      onClick={handleClick}
    >
      <h1 className='service-info-heading'>{title}</h1>
      <img className='services-images' src={image} alt={title} />
    </div>
  );
};

export default Minicards;
