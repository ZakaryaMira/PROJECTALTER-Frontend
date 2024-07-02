// FormSelect.js
import './FormSelect.css';

const FormSelect = ({ label, id, name, required, value, onChange, options }) => {
  return (
    <div className='form-row'>
      <label htmlFor={id}>{label}</label>
      <select className='input-border' id={id} name={name} required={required} value={value} onChange={onChange}>
        <option value="" disabled>Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
