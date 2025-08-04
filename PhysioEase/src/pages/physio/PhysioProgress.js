import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchFeedbackReports, deleteFeedback } from '../../services/apiService';
import '../../styles/physio/PhysioProgress.css';

function PhysioTrackProgress() {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchFeedbackReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching feedback reports:', error);
      }
    };
  
  loadReports();
  }, []);

  const handleDeleteReport = async (id) => {
    try {
      await deleteFeedback(id);
      setReports(prev => prev.filter(report => report.id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback.");
    }
  };

  return (
    <div className="physio-track-progress">
      <h1>{t('physioTrackProgress')}</h1>
      {reports.length === 0 ? (
        <p>{t('noReportsFound')}</p>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <p>
                <strong>{t('name')}</strong> {report.firstName} {report.lastName}
              </p>
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
              <button onClick={() => handleDeleteReport(report.id)}>
                {t('remove')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhysioTrackProgress;