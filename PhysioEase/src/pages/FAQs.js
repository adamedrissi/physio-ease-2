import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('faqs')}</h1>
      <p>Here are some common questions and answers...</p>
      {/* Add your FAQ content here */}
    </div>
  );
}

export default FAQs;