import { useState } from 'react';
import axios from 'axios';
import './Feedback.css';
import FeedbackModel from '../FeedbackModel/FeedbackModel';

const Feedback = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        setSuccessMessage('Failed to send feedback. User not authenticated.');
        return;
      }

      const feedbackData = {
        Description: feedback,
      };

      await axios.post(`http://localhost:5105/api/Feedback/sendFeedback/${userId}`, feedbackData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage('Feedback sent successfully!');
      setFeedback('');
      setShowModal(false);
    } catch (error) {
      console.error('Error sending feedback:', error);
      setSuccessMessage('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div className='Feedback'>
      <button className='FeedbackBtn greenBtn' onClick={handleOpenModal}>Send Feedback</button>
      <FeedbackModel 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleSubmit={handleSubmit} 
        feedback={feedback} 
        handleFeedbackChange={handleFeedbackChange} 
      />
      {successMessage && <p className='successMessage'>{successMessage}</p>}
    </div>
  );
};

export default Feedback;
