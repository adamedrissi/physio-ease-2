import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LegalPages.css';

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <h1>{t('privacyPolicyTitle')}</h1>

      <p>
        {t('effectiveDate')}
      </p>

      <p>
        {t('privacyIntro')}
      </p>

      <h2>{t('whatWeCollect')}</h2>
      <p>
        {t('basicData')}
      </p>

      <h2>{t('howWeUseData')}</h2>
      <p>
        {t('usagePurpose')}
      </p>

      <h2>{t('dataSecurity')}</h2>
      <p>
        {t('securityMeasures')}
      </p>

      <h2>{t('yourRights')}</h2>
      <p>
        {t('rightsText')}
        <a href="mailto:contact.physioease@gmail.com">contact.physioease@gmail.com</a> {t('forRequests')}
      </p>

      <h2>{t('policyUpdates')}</h2>
      <p>
        {t('updateNotice') ||
          `This policy may be updated as the platform evolves. Continued use of PhysioEase after changes implies your acceptance of the updated terms.`}
      </p>
    </div>
  );
}

export default PrivacyPolicy;