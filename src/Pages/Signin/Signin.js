import { useState } from 'react';
import axios from 'axios';
import { Forms } from '../../components';
import { Forminput } from '../../components';
import { useNavigate } from "react-router-dom";
import './Signin.css';

const Signin = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Username: '',
    VerificationCode: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailVerificationError, setEmailVerificationError] = useState('');
  const [usernameVerificationError, setUsernameVerificationError] = useState('');

  const handlePasswordValidation = () => {
    if (formData.Password !== formData.ConfirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const nextStep = async () => {
    if (!handlePasswordValidation()) {
      return;
    }
    if (step === 1) {
      const emailData = { email: formData.Email };
      try {
        console.log('Sending email verification request with data:', emailData);
        const emailValidation = await axios.post('http://localhost:5105/api/User/checkEmail', emailData);
        console.log('Email validation response:', emailValidation);

        if (emailValidation.status === 200 || emailValidation.status === 201) {
          setStep(prevStep => prevStep + 1);
        } else if (emailValidation.status === 400) {
          setEmailVerificationError("Email is already taken");
        }
      } catch (error) {
        console.error('Error checking email:', error);
        setEmailVerificationError("Email is already taken");
      }
    }
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    if (step === 2) {
      const usernameVerification = { Username: formData.Username };
      try {
        console.log('Sending username verification request with data:', usernameVerification);
        const codeVerification = await axios.post("http://localhost:5105/api/User/checkUsername", usernameVerification);
        console.log('Username verification response:', codeVerification);

        if (codeVerification.status === 200 || codeVerification.status === 201) {
          console.log("Username checked");
          const response = await axios.post(
            'http://localhost:5105/api/User/register',
            formData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200) {
            console.log('Registration successful', response.data);
            const token = response.data.token;
            console.log("Extracted token:", token);
            localStorage.setItem('token', token);
            navigate('/Wishlist'); // Redirect to Wishlist after successful registration
          } else {
            console.error('Registration failed', response.data);
            setError('Registration failed');
          }
        }
      } catch (error) {
        console.error("Error checking username or registering", error);
        setUsernameVerificationError("Username is already taken");
      }
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="centre">
          <Forms heading="Sign Up" onSubmit={e => e.preventDefault()}>
            <Forminput label="FirstName" type="text" id="FirstName" name="FirstName" required={true} placeholder="Enter Your First name" value={formData.FirstName} onChange={handleChange} />
            <Forminput label="LastName" type="text" id="LastName" name="LastName" required={true} placeholder="Enter Your Last Name" value={formData.LastName} onChange={handleChange} />
            <Forminput label="Email" type="email" id="Email" name="Email" required={true} placeholder="Enter Your Email" value={formData.Email} onChange={handleChange} />
            <Forminput label="Password" type="password" id="Password" name="Password" required={true} placeholder="Enter Your Password" value={formData.Password} onChange={handleChange} />
            <Forminput label="ConfirmPassword" type="password" id="ConfirmPassword" name="ConfirmPassword" required={true} placeholder="Confirm Your Password" value={formData.ConfirmPassword} onChange={handleChange} />
            {error && <p className="error-message">{error}</p>}
            {passwordError && <p className='error-message'>{passwordError}</p>}
            {emailVerificationError && <p className='error-message'>{emailVerificationError}</p>}
            <button className="btn-form-two" type="button" onClick={nextStep}>
              Next
            </button>
          </Forms>
        </div>
      );
    case 2:
      return (
        <div className="centre">
          <Forms heading="Enter Username:" onSubmit={handleSubmit}>
            <Forminput label="Username" type="text" id="Username" name="Username" required={true} placeholder="Enter Your Username" value={formData.Username} onChange={handleChange} />
            {usernameVerificationError && <p className='error-message'>{usernameVerificationError}</p>}
            <div className='rowBtns'>
              <button className="btn-form-two" type="button" onClick={prevStep}>Back</button>
              <button className="btn-form-two" type="submit">Register</button>
            </div>
          </Forms>
        </div>
      );
    default:
      return null;
  }
};

export default Signin;
