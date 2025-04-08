import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useTranslation } from 'react-i18next';
import './TrackProgress.css';

function TrackProgress() {
  const { user, setUser } = useContext(UserContext);
  const [giveFeedback, setGiveFeedback] = useState(false);
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({
    question1: '',
    question2: '',
    specificFeedback: ''
  });

  const [feedbackError, setFeedbackError] = useState('');

  const handleCompletedChange = (e) => {
    setUser({ ...user, trackingPlanCompleted: e.target.checked });
  };

  const handleFeedbackCheckbox = (e) => {
    setGiveFeedback(e.target.checked);
    if (!e.target.checked) setFeedbackError('');
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleCancelFeedback = () => {
    setFeedback({
      question1: '',
      question2: '',
      specificFeedback: ''
    });
    setGiveFeedback(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedback.question1 || !feedback.question2 || !feedback.specificFeedback.trim()) {
      setFeedbackError(t('pleaseAnswerAllQuestions'));
      return;
    }
    setFeedbackError('');
    alert('Feedback submitted:\n' + JSON.stringify(feedback, null, 2));
    setFeedback({
      question1: '',
      question2: '',
      specificFeedback: ''
    });
    setGiveFeedback(false);
  };

  /*const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
  
    const feedbackData = {
      userId: user.id, // Assuming user context has the user's id
      improvementRating: ratingValue1,  // Replace with your actual value from the closed question
      videoEffectivenessRating: ratingValue2,  // Replace with your actual value
      specificFeedback: feedbackText,  // The text from the open-ended question
    };
  
    try {
      const savedFeedback = await submitFeedback(feedbackData);
      alert('Feedback submitted successfully!');
      // Optionally clear the form/modal
      closeFeedbackModal();
    } catch (error) {
      alert('Error submitting feedback. Please try again later.');
    }
  };*/

  return (
    <div>
      <h1>{t('progressTrack')}</h1>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={user.trackingPlanCompleted}
            onChange={handleCompletedChange} 
          />
          {t('completeTracking')}
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={giveFeedback}
            onChange={handleFeedbackCheckbox} 
          />
          {t('giveFeedback')}
        </label>
      </div>

      {giveFeedback && (
        <div className="feedback-modal" style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          background: '#f9f9f9'
        }}>
          <h2>{t('weekFeedback')}</h2>
          <form onSubmit={handleSubmitFeedback}>
            <div>
              <p>{t('qOne')}</p>
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
              <p>{t('qTwo')}</p>
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
              <label>{t('qThree')}</label>
              <br />
              <textarea 
                name="specificFeedback" 
                value={feedback.specificFeedback} 
                onChange={handleFeedbackChange} 
                rows="4" 
                cols="50"
              />
            </div>
            {feedbackError && <p className="error">{feedbackError}</p>}
            <div style={{ marginTop: '10px' }}>
              <button type="button" onClick={handleCancelFeedback} style={{ marginRight: '10px' }}>{t('cancel')}</button>
              <button type="submit">{t('submit')}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TrackProgress;