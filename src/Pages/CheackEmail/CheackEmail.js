import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'; // Import Axios
import { Forms } from '../../components';
import { Forminput } from '../../components';
import './CheackEmail.css';


const CheackEmail = () => {

  const [formData, setFormData] = useState({
    VerificationCode: '',
  });

      return (
        <Forms heading="Sign Up">
          <Forminput label="FirstName" type="text" id="FirstName" name="FirstName" required={true} placeholder="Enter Your First name" value={formData.FirstName}/>
          <button className="btn-form-two" type="button">Next</button>
        </Forms>
      );
   
};

export default CheackEmail;
