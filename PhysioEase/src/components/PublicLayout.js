import React from 'react';
import Footer from './Footer';
import { FiArrowDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/RegisterLogin.css';

function PublicLayout({ children, isCentered = true }) {
  const { t } = useTranslation();

  const scrollToBottom = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="bar">
        <img src="/logo1024.png" alt="PE Logo" className="bar-left" />
        <div className="bar-center">
          <Link to="/"><img src="/PE.png" alt="PE Title" /></Link>
        </div>
        <div className="bar-right">
          <button className="scroll-button" onClick={scrollToBottom}>
            <FiArrowDown /> {t('scrollDown')}
          </button>
        </div>
      </div>

      <div className={isCentered ? "register-login-container" : ""} style={{ paddingTop: '20px', textAlign: 'center', minHeight: '550px' }}>
        {children}
      </div>

      <Footer />
    </>
  );
}

export default PublicLayout;