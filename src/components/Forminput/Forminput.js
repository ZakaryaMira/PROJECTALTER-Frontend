import './Forminput.css'
const Forminput = ({label, type, id, name, required, placeholder, value, onChange}) => {
  return (
    <div className='form-row'>
      <label htmlFor={id}>{label}</label>
      <input className='input-border' type={type} id={id} name={name} required={required} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  );
};
export default Forminput;
