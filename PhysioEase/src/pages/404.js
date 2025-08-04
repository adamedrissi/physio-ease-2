import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import headingImage from '../assets/404.gif';

function NotFound() {

    const { t } = useTranslation();

    return (
  <div style={{ textAlign: 'center', marginTop: '100px' }}>
    <h1>{t('nf404')}</h1>
    <p>{t('nf404p')}</p>
    <Link to="/">← {t('nf404h')}</Link>
    <br/>
    <br/>
    {/*<img
      src={headingImage}
      alt="Heading Icon"
      style={{ width: '165px', height: '293px' }}
    />*/}
  </div>
    );
};

export default NotFound;