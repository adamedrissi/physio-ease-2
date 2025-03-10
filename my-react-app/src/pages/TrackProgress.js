import React, { useState } from 'react';

function TrackProgress() {
  const [completed, setCompleted] = useState(false);
  const [giveFeedback, setGiveFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    question1: '',
    question2: '',
    specificFeedback: ''
  });

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  const handleFeedbackCheckbox = (e) => {
    setGiveFeedback(e.target.checked);
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleCancelFeedback = () => {
    // Reset feedback and hide the feedback form
    setFeedback({
      question1: '',
      question2: '',
      specificFeedback: ''
    });
    setGiveFeedback(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Process the feedback (e.g., send to an API)
    alert('Feedback submitted:\n' + JSON.stringify(feedback, null, 2));
    // Reset form and hide feedback window
    setFeedback({
      question1: '',
      question2: '',
      specificFeedback: ''
    });
    setGiveFeedback(false);
  };

  return (
    <div>
      <h1>Track Progress</h1>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={completed}
            onChange={handleCompletedChange} 
          />
          Weekly Tracking Plan Completed?
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={giveFeedback}
            onChange={handleFeedbackCheckbox} 
          />
          Give Feedback?
        </label>
      </div>

      {giveFeedback && (
        <div className="feedback-modal" style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          background: '#f9f9f9'
        }}>
          <h2>Weekly Exercise Plan Feedback</h2>
          <form onSubmit={handleSubmitFeedback}>
            <div>
              <p>1. On a scale from 0 to 5, how much have you improved compared to last week?</p>
              <div>
              <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="0" 
                    checked={feedback.question1 === '0'} 
                    onChange={handleFeedbackChange} 
                  /> 0
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="1" 
                    checked={feedback.question1 === '1'} 
                    onChange={handleFeedbackChange} 
                  /> 1
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="2" 
                    checked={feedback.question1 === '2'} 
                    onChange={handleFeedbackChange} 
                  /> 2
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="3" 
                    checked={feedback.question1 === '3'} 
                    onChange={handleFeedbackChange} 
                  /> 3
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="4" 
                    checked={feedback.question1 === '4'} 
                    onChange={handleFeedbackChange} 
                  /> 4
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="5" 
                    checked={feedback.question1 === '5'} 
                    onChange={handleFeedbackChange} 
                  /> 5
                </label>
              </div>
            </div>
            <div>
              <p>2. On a scale from 0 to 5, how efective were the videos that were given?</p>
              <div>
              <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="0" 
                    checked={feedback.question2 === '0'} 
                    onChange={handleFeedbackChange} 
                  /> 0
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="1" 
                    checked={feedback.question2 === '1'} 
                    onChange={handleFeedbackChange} 
                  /> 1
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="2" 
                    checked={feedback.question2 === '2'} 
                    onChange={handleFeedbackChange} 
                  /> 2
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="3" 
                    checked={feedback.question2 === '3'} 
                    onChange={handleFeedbackChange} 
                  /> 3
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="4" 
                    checked={feedback.question2 === '4'} 
                    onChange={handleFeedbackChange} 
                  /> 4
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="5" 
                    checked={feedback.question2 === '5'} 
                    onChange={handleFeedbackChange} 
                  /> 5
                </label>
              </div>
            </div>
            <div>
              <label>3. Any specific feedback?</label>
              <br />
              <textarea 
                name="specificFeedback" 
                value={feedback.specificFeedback} 
                onChange={handleFeedbackChange} 
                rows="4" 
                cols="50"
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <button type="button" onClick={handleCancelFeedback} style={{ marginRight: '10px' }}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TrackProgress;