import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: "How do I register on PhysioEase?",
      answer: "Click the Register button on the login page, fill in your details, and you'll be able to log in with your email and password."
    },
    {
      question: "How do I book an appointment?",
      answer: "Once logged in, go to the Consultations page, select a physiotherapist, and use the booking form to schedule an appointment."
    },
    {
      question: "How do I update my profile?",
      answer: "Navigate to your User Profile page, make the changes, and click Save to update your information."
    },
    {
      question: "Who do I contact if I have issues with the website?",
      answer: "Contact our support team via contact.physioease@gmail.com."
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