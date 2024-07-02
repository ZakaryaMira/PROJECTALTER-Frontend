import React, { useState } from 'react';
import './CertificationUpload.css';
import axios from 'axios';

const CertificationUpload = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1]; // Remove the data:image/png;base64, part
      try {
        const token = localStorage.getItem('token');
        setIsUploading(true);
        const response = await axios.post('http://localhost:5105/api/Certification/addCertification', {
          certificationPicture: base64Image,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setIsUploading(false);
        onClose();
        console.log('Certification uploaded:', response.data); // Debug log
      } catch (error) {
        setIsUploading(false);
        console.error('Error uploading certification:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="certificationUpload">
      <div className="popupContent">
        <h2 className='UploadCertification'>Upload Certification</h2>
        <input className='uploadCer' type="file" accept="image/*" onChange={handleFileChange} />
        <button className="sendCertificate" onClick={onClose} disabled={isUploading}>Cancel</button>
        <button className="sendCertificate" onClick={onClose} disabled={isUploading}>Upload</button>
      </div>
    </div>
  );
};

export default CertificationUpload;
