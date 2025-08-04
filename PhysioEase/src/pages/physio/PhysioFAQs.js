import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('PhQ1'),
      answer: t('PhA1')
    },
    {
      question: t('PhQ2'),
      answer: t('PhA2')
    },
    {
      question: t('PhQ3'),
      answer: t('PhA3')
    },
    {
      question: t('PhQ4'),
      answer: t('PhA4')
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