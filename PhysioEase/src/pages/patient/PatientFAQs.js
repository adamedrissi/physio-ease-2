import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('PaQ1'),
      answer: t('PaA1')
    },
    {
      question: t('PaQ2'),
      answer: t('PaA2')
    },
    {
      question: t('PaQ3'),
      answer: t('PaA3')
    },
    {
      question: t('PaQ4'),
      answer: t('PaA4')
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