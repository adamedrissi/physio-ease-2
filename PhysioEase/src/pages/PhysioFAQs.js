import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: "How do I register as a physiotherapist?",
      answer: "Select the physiotherapist role on the registration page and complete your details. Once registered, you'll have access to the physio dashboard."
    },
    {
      question: "How can I manage my appointments?",
      answer: "Log in and navigate to the Consultations page to view and manage your patient appointments."
    },
    {
      question: "How do I communicate with patients?",
      answer: "Use the Direct Messages page to send and receive messages with your patients."
    },
    {
      question: "Who do I contact for technical support?",
      answer: "For website-related issues or support, please contact our support team via contact.physioease@gmail.com."
    }
  ];

  return (
    <div className="faq-page">
      <h1>{t('faqs')}</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;