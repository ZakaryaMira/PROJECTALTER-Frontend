import React from 'react';
import './FeedbackModel.css';

const FeedbackModel = ({ show, handleClose, handleSubmit, feedback, handleFeedbackChange }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className='modal-content'>
        <span className='close' onClick={handleClose}>&times;</span>
        <h2 className='FeedbackHeading'>Send Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='TextAreaFeedback'
            placeholder='Enter Your Feedback'
            value={feedback}
            onChange={handleFeedbackChange}
            required
          ></textarea>
          <button type='submit' className='FeedbackBtn2'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModel;

