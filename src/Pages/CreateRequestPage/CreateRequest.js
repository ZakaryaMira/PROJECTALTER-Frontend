import React, { useState } from 'react';
import axios from 'axios';
import { Forms, Forminput, FormSelect } from '../../components'; // Ensure these imports are correct based on your directory structure
import './CreateRequestPage.css';

const CreateRequestPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    requestTitle: '',
    requestDescription: '',
    RequestType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const requestResponse = await axios.post('http://localhost:5105/api/Request/creatRequest', {
        requestTitle: formData.requestTitle,
        requestDescription: formData.requestDescription,
        requestType: formData.RequestType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Request created successfully!');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request');
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className='centreTwo'>
          <Forms heading="Request Information" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
            <Forminput label="Request Title" type="text" id="requestTitle" name="requestTitle" required placeholder="Enter Request Title" value={formData.requestTitle} onChange={handleChange} />
            <div className="form-row">
              <label htmlFor="requestDescription">Request Description</label>
              <textarea className="input-border" id="requestDescription" name="requestDescription" required placeholder="Enter Request Description" value={formData.requestDescription} onChange={handleChange}></textarea>
            </div>
            <FormSelect label="Request Domain" id="RequestType" name="RequestType" required value={formData.RequestType} onChange={handleChange} options={['GameDevelopment', 'MobileDevlopment', 'DesktopApplications' , 'Webdevelopment', "DataAnalysis" , "IA"]} />
            <button className="btn-form-two" type="submit">Next</button>
          </Forms>
          </div>
        );
      case 2:
        return (
          <div className='centreTwo'>
          <Forms heading="Confirm Your Request Details" onSubmit={handleSubmit}>
            <ul>
              <li>Request Title: {formData.requestTitle}</li>
              <li>Request Description: {formData.requestDescription}</li>
            </ul>
            <button className='btn-form-two dezz' type="button" onClick={prevStep}>Back</button>
            <button className='btn-form-two' type="submit">Submit</button>
          </Forms>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-request-page">
      {renderForm()}
    </div>
  );
};

export default CreateRequestPage;
