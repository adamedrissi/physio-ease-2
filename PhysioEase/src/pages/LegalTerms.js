import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LegalPages.css';

function LegalTerms() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <h1>{t('legalTermsTitle')}</h1>

      <p>
        {t('effectiveDate')}
      </p>

      <p>
        {t('legalIntro')}
      </p>

      <h2>{t('useOfService')}</h2>
      <p>
        {t('useDescription')}
      </p>

      <h2>{t('userResponsibilities')}</h2>
      <p>
        {t('userTerms')}
      </p>

      <h2>{t('intellectualProperty')}</h2>
      <p>
        {t('ipNotice')}
      </p>

      <h2>{t('changesToTerms')}</h2>
      <p>
        {t('termsChange')}
      </p>

      <h2>{t('contactClause')}</h2>
      <p>
        {t('questionsClause')}
        <a href="/contactus">{t('contactUs')}</a>.
      </p>
      <br/>
      <h3>{t('credits')}</h3>
      <p style={{ fontSize: '12px' }}>
        {t('createdBy')}
      </p>
      <p style={{ fontSize: '12px' }}>
        {t('madeWith')}
      </p>
    </div>
  );
}

export default LegalTerms;