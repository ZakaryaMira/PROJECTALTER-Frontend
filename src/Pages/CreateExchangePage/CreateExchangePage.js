// CreateExchangePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Forms } from '../../components';
import { Forminput, FormSelect } from '../../components'; // Import the new component
import './CreateExchangePage.css';

const CreateExchangePage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skillName: '',
    skillLevel: '',
    skillDescription: '',
    skillType: '',
    links: [],
    newLink: '',
    languages: [],
    newLanguage: '',
    yearsOfExperience: '',
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      video: e.target.files[0],
    }));
  };

  const handleArrayChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], value],
    }));
  };

  const handleArrayDelete = (key, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((_, i) => i !== index),
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

      const skillResponse = await axios.post('http://localhost:5105/api/Skill/CreateSkillListining2', {
        skillName: formData.skillName,
        skillDescription: formData.skillDescription,
        yearsOfExperience: formData.yearsOfExperience,
        skillLevel: formData.skillLevel,
        skillType: formData.skillType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const createdSkill = skillResponse.data;

      await Promise.all(formData.languages.map((language) =>
        axios.post(`http://localhost:5105/api/Skill/AddSkillLanguage/${createdSkill.skillId}`, { languageName: language }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ));

      await Promise.all(formData.links.map((link) =>
        axios.post(`http://localhost:5105/api/Skill/AddSkillLinks/${createdSkill.skillId}`, { linkInformation: link }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ));

      alert('Skill created successfully!');
    } catch (error) {
      console.error('Error creating skill listing:', error);
      alert('Failed to create skill');
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="centreTwo">
            <Forms heading="Skill Information" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <Forminput label="Skill Name" type="text" id="skillName" name="skillName" required placeholder="Enter Skill Name" value={formData.skillName} onChange={handleChange} />
              <FormSelect label="Skill Level" id="skillLevel" name="skillLevel" required value={formData.skillLevel} onChange={handleChange} options={['Intermediate', 'Advanced', 'Expert']} />
              <FormSelect label="Skill Domain" id="skillType" name="skillType" required value={formData.skillType} onChange={handleChange} options={['GameDevelopment', 'MobileDevlopment', 'DesktopApplications' , 'Webdevelopment', "DataAnalysis" , "IA"]} />
              <div className="form-row">
                <label htmlFor="skillDescription">Skill Description</label>
                <textarea className="input-border" id="skillDescription" name="skillDescription" required placeholder="Enter Skill Description" value={formData.skillDescription} onChange={handleChange}></textarea>
              </div>
              <button className="btn-form-two" type="submit">Next</button>
            </Forms>
          </div>
        );
      case 2:
        return (
          <div className="centreTwo">
            <Forms heading="Add Links" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <Forminput label="Link" type="text" id="newLink" name="newLink" placeholder="Enter Link" value={formData.newLink} onChange={handleChange} />
              <button className='btn-form-two' type="button"
                onClick={() => {
                  handleArrayChange('links', formData.newLink);
                  setFormData((prevState) => ({ ...prevState, newLink: '' }));
                }}
              >
                Add Link
              </button>
              {formData.links.map((link, index) => (
                <div key={index} className="form-row newLink">
                  <span className='yoyo'>{link}</span>
                  <button className='btnDelete' type="button" onClick={() => handleArrayDelete('links', index)}>Delete</button>
                </div>
              ))}
              <div className='DessisionKamelOrNo'>
                <button className='btn-form-two' type="button" onClick={prevStep}>Back</button>
                <button className='btn-form-two' type="submit">Next</button>
              </div>
            </Forms>
          </div>
        );
      case 3:
        return (
          <div className="centreTwo">
            <Forms heading="Add Languages" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <Forminput label="Language" type="text" id="newLanguage" name="newLanguage" placeholder="Enter Language" value={formData.newLanguage} onChange={handleChange} />
              <button type="button" className='buttonLanguges'
                onClick={() => {
                  handleArrayChange('languages', formData.newLanguage);
                  setFormData((prevState) => ({ ...prevState, newLanguage: '' }));
                }}
              >
                Add Language
              </button>
              {formData.languages.map((language, index) => (
                <div key={index} className="form-row newLink">
                  <span className='yoyo' >{language}</span>
                  <button type="button" className='btn-form-two' onClick={() => handleArrayDelete('languages', index)}>Delete</button>
                </div>
              ))}
              <div className='DessisionKamelOrNo'>
                <button className='btn-form-two' type="button" onClick={prevStep}>Back</button>
                <button className='btn-form-two' type="submit">Next</button>
              </div>
            </Forms>
          </div>
        );
      case 4:
        return (
          <div className="centreTwo">
            <Forms heading="Years of Experience" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <Forminput label="Years of Experience" type="number" id="yearsOfExperience" name="yearsOfExperience" placeholder="Enter Years of Experience" value={formData.yearsOfExperience} onChange={handleChange} />
              <div className='dez'>
                <button className='btn-form-two' type="button" onClick={prevStep}>Back</button>
                <button className='btn-form-two' type="submit">Next</button>
              </div>
            </Forms>
          </div>
        );
      case 5:
        return (
          <div className="centreTwo">
            <Forms heading="Upload a Video" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="form-row">
                <label htmlFor="video">Video</label>
                <input className="input-border" type="file" accept="video/*" id="video" name="video" onChange={handleFileChange} />
              </div>
              <div className='dez'>
                <button className='btn-form-two' type="button" onClick={prevStep}>Back</button>
                <button className='btn-form-two' type="submit">Next</button>
              </div>
            </Forms>
          </div>
        );
      case 6:
        return (
          <div className="centreTwo">
            <Forms heading="Confirm Your Skill Details" onSubmit={handleSubmit}>
              <ul>
                <li>Skill Name: {formData.skillName}</li>
                <li>Skill Level: {formData.skillLevel}</li>
                <li>Skill Description: {formData.skillDescription}</li>
                <li>Links: {formData.links.join(', ')}</li>
                <li>Languages: {formData.languages.join(', ')}</li>
                <li>Years of Experience: {formData.yearsOfExperience}</li>
                <li>Video: {formData.video ? formData.video.name : 'No video uploaded'}</li>
              </ul>
              <div className='dez'>
                <button className='btn-form-two' type="button" onClick={prevStep}>Back</button>
                <button className='btn-form-two' type="submit">Submit</button>
              </div>
            </Forms>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-exchange-page">
      {renderForm()}
    </div>
  );
};

export default CreateExchangePage;
