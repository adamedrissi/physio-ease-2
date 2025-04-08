import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './PhysioProgress.css';

function PhysioTrackProgress() {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setReports(storedFeedbacks);
  }, []);

  return (
    <div className="physio-track-progress">
      <h1>{t('physioTrackProgress')}</h1>
      {reports.length === 0 ? (
        <p>{t('noReportsFound')}</p>
      ) : (
        <div className="reports-list">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <p>
                <strong>{t('submittedAt')}: </strong>
                {new Date(report.submittedAt).toLocaleString()}
              </p>
              <p>
                <strong>{t('question1')}:</strong> {report.question1}
              </p>
              <p>
                <strong>{t('question2')}:</strong> {report.question2}
              </p>
              <p>
                <strong>{t('specificFeedback')}:</strong> {report.specificFeedback}
              </p>
              {report.trackingPlanCompleted !== undefined && (
                <p>
                  <strong>{t('trackingPlanCompleted')}:</strong>{' '}
                  {report.trackingPlanCompleted ? t('yes') : t('no')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhysioTrackProgress;