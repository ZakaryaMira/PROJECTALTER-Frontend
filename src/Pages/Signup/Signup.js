import { useState } from "react";
import axios from 'axios';
import { Forms } from '../../components';
import { Forminput } from '../../components';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(''); // Initialize error state to ''
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
  });
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:5105/api/User/login", formData);
      console.log(response.data);
      // respond to token an save it in localStorage.
      const token = response.data.token;
      console.log("Extracted token:", token);
      localStorage.setItem('token', token);

      setFormData({ Username: '', Password: '' });
      setError('');
      Navigate('/Main');
    } catch (error) {
      setError('Invalid username or password' || error.message); 
      console.error(error);
    }
  };

  return (
    <div className="centre">
      <Forms heading="Sign in" onSubmit={handleLogin}>
        <Forminput label="Username" type="text" id="Username" name="Username" required={true} placeholder="Enter Your Username" value={formData.Username}onChange={(e) => setFormData({ ...formData, Username: e.target.value })}/>
        <Forminput  label="Password"  type="password"  id="Password"  name="Password"  required={true}  placeholder="Enter Your Password"  value={formData.Password}   onChange={(e) => setFormData({ ...formData, Password: e.target.value })}/>
        <button className="btn-form-two" type="submit">Login</button> {/* Use type="submit" for form submission */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Forms>
    </div>
  );
};

export default Signup;


