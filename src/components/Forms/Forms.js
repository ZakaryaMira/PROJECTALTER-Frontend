import './Forms.css';

const Forms = ({ heading, onSubmit , children }) => {
  return (
    <div className='container form-container form-wrapper'>
      <h1 className='form-heading '>{heading}</h1>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Forms; 