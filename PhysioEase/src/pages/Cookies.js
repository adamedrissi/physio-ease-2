import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LegalPages.css'; // optional shared styles

function Cookies() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <h1>{t('cookiesPolicy') || 'Cookies Policy'}</h1>

      <p>
        {t('effectiveDate')}
      </p>
      
      <p>
        {t('cookiesIntro')}
      </p>

      <h2>{t('futureUse')}</h2>
      <p>
        {t('cookiesFuture')}
      </p>

      <h2>{t('whatAreCookies')}</h2>
      <p>
        {t('cookiesExplanation')}
      </p>

      <h2>{t('yourControl')}</h2>
      <p>
        {t('cookiesControl')}
      </p>

      <p>
        {t('contactUsMore')}
        <a href="/contactus">{t('contactUs')}</a>.
      </p>
    </div>
  );
}

export default Cookies;