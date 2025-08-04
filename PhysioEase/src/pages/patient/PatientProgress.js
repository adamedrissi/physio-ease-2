import React, { useState, useContext, useEffect } from 'react'; 
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';
import { submitFeedback } from '../../services/apiService';
import '../../styles/patient/PatientProgress.css';

function TrackProgress() {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();

  // Persist tracking status using localStorage
  const [trackingCompleted, setTrackingCompleted] = useState(() => {
    const stored = localStorage.getItem('trackingCompleted');
    return stored === 'true';
  });

  // Sync with localStorage and UserContext when changed
  useEffect(() => {
    localStorage.setItem('trackingCompleted', trackingCompleted);
    setUser(prev => ({ ...prev, trackingPlanCompleted: trackingCompleted }));
  }, [trackingCompleted, setUser]);

  const [giveFeedback, setGiveFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    question1: '',  
    question2: '',  
    specificFeedback: ''
  });
  const [feedbackError, setFeedbackError] = useState('');

  const handleCompletedChange = (e) => {
    setTrackingCompleted(e.target.checked);
    if (!e.target.checked) {
      setGiveFeedback(false); // Disable feedback if unchecked again
    }
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelFeedback = () => {
    setFeedback({ question1: '', question2: '', specificFeedback: '' });
    setFeedbackError('');
    setGiveFeedback(false);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.question1 || !feedback.question2 || !feedback.specificFeedback.trim()) {
      setFeedbackError(t('pleaseAnswerAllQuestions'));
      return;
    }
    setFeedbackError('');

    const feedbackData = {
      firstName: user.firstName,
      lastName: user.lastName,
      question1: Number(feedback.question1),
      question2: Number(feedback.question2),
      specificFeedback: feedback.specificFeedback,
      submittedAt: new Date().toISOString()
    };

    try {
      const savedFeedback = await submitFeedback(feedbackData);
      alert(t('feedbackSubmitted') + "\n" + JSON.stringify(savedFeedback, null, 2));
      setFeedback({ question1: '', question2: '', specificFeedback: '' });
      setGiveFeedback(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(t('errorSubmittingFeedback') || "Error submitting feedback. Please try again later.");
    }
  };

  return (
    <div>
      <h1>{t('progressTrack')}</h1>

      <div>
        <label>
          <input 
            type="checkbox" 
            checked={trackingCompleted}
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
            onChange={(e) => setGiveFeedback(e.target.checked)} 
            disabled={!trackingCompleted}
          />
          {t('giveFeedback')}
        </label>
      </div>

      {giveFeedback && (
        <div className="feedback-modal">
          <h2>{t('weekFeedback')}</h2>
          <form onSubmit={handleSubmitFeedback}>
            <div>
              <p>{t('qOne')}</p>
              {['0', '1', '2', '3', '4', '5'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="question1"
                    value={value}
                    checked={feedback.question1 === value}
                    onChange={handleFeedbackChange}
                  /> {value}
                </label>
              ))}
            </div>

            <div>
              <p>{t('qTwo')}</p>
              {['0', '1', '2', '3', '4', '5'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="question2"
                    value={value}
                    checked={feedback.question2 === value}
                    onChange={handleFeedbackChange}
                  /> {value}
                </label>
              ))}
            </div>

            <div>
              <label>{t('qThree')}</label><br />
              <textarea
                name="specificFeedback"
                value={feedback.specificFeedback}
                onChange={handleFeedbackChange}
                rows="4"
                cols="50"
                maxLength={1000}
              />
            </div>

            {feedbackError && <p className="error">{feedbackError}</p>}

            <div>
              <button type="button" onClick={handleCancelFeedback}>{t('cancel')}</button>
              <button type="submit">{t('submit')}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TrackProgress;