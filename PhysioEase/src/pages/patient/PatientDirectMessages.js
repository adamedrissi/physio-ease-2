import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/patient/PatientDirectMessages.css';

function DirectMessages() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({
    name: '',
    email: '',
    issueType: 'error',
    issueDescription: '',
  });

  useEffect(() => {
    setMessages([
      { id: 1, sender: 'Physio', content: 'Hello, how can I help you today?' },
      { id: 2, sender: t('you'), content: 'I have a question about my treatment plan.' },
    ]);
  }, [t]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      sender: t('you'),
      content: input.trim(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setReportData({
      name: '',
      email: '',
      issueType: 'error',
      issueDescription: '',
    });
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Feedback - ${reportData.issueType === 'error' ? 'Error/Bug' : 'Misbehaviour/Abuse'}`
    );
    const body = encodeURIComponent(
      `Name: ${reportData.name}\nEmail: ${reportData.email}\nIssue: ${reportData.issueDescription}`
    );
    const mailtoLink = `mailto:contact.physioease@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    closeReportModal();
  };

  return (
    <div className="direct-messages-page">
      <h1>{t('directMessages')}</h1>
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === t('you') ? 'sent' : 'received'}`}
          >
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="message-form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={t('typeYourMessage')}
          required
        />
        <button type="submit">{t('send')}</button>
      </form>
      <br/>
      <div className="report-container">
        <button onClick={openReportModal} className="report-button">
          {t('reportFeedback')}
        </button>
      </div>
      {isReportModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{t('reportFeedback')}</h2>
            <form onSubmit={handleReportSubmit} className="report-form">
              <div className="form-group">
                <label>{t('name')}</label>
                <input 
                  type="text" 
                  name="name" 
                  value={reportData.name} 
                  onChange={handleReportChange} 
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('email')}</label>
                <input 
                  type="email" 
                  name="email" 
                  value={reportData.email} 
                  onChange={handleReportChange} 
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('reportType')}</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="issueType" 
                      value="error" 
                      checked={reportData.issueType === 'error'} 
                      onChange={handleReportChange} 
                    />
                    {t('errorBug')}
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="issueType" 
                      value="misbehaviour" 
                      checked={reportData.issueType === 'misbehaviour'} 
                      onChange={handleReportChange} 
                    />
                    {t('misbehaviourAbuse')}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>{t('issueDescription')}</label>
                <textarea 
                  name="issueDescription" 
                  value={reportData.issueDescription} 
                  onChange={handleReportChange} 
                  required
                ></textarea>
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={closeReportModal}>{t('cancel')}</button>
                <button type="submit">{t('submit')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectMessages;