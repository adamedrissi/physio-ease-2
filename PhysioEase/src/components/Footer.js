import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaTiktok} from 'react-icons/fa6';
import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo512.png';
import trustpilot from '../assets/trustpilot.png';
import agenda2030 from '../assets/sdgs.png';
import sdg3 from '../assets/sdg3.png';
import sdg10 from '../assets/sdg10.png';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const socialLinks = [
  { name: 'Facebook', icon: <FaFacebookF />, url: 'https://www.facebook.com/profile.php?id=61577748822454', bg: '#3b5998', handle: '@Physio Ease' },
  { name: 'X', icon: <FaXTwitter />, url: 'https://x.com/physio3ase', bg: '#55acee', handle: '@physio3ase' },
  { name: 'YouTube', icon: <FaYoutube />, url: 'https://www.youtube.com/@physio3ase', bg: '#cd201f', handle: '@physio3ase' },
  { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/physio3ase/#', bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', handle: '@physio3ase' },
  { name: 'TikTok', icon: <FaTiktok />, url: 'https://www.tiktok.com/@physio3ase', bg: '#000000', handle: '@physio3ase' },
];

function Footer({ path }) {
  const hideLinks = [
    '/faqs1',
    '/faqs2',
    '/legalterms',
    '/privacypolicy',
    '/cookies',
    '/contactus'
  ];
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  return (
    <footer className="footer" footer id="footer">
      <nav className="f-links">
        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} ><FiArrowUp /> {t('backToTop')}</Link>
      </nav>
      <h3>{t('footer1')}</h3>
    <div className="social-container">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-box"
          style={{ background: link.bg }}
        >
          <div className="icon">{link.icon}</div>
          <div className="text">
            <strong>PhysioEase</strong>
            <br />
            <span>{link.handle}</span>
          </div>
        </a>
      ))}
      </div>
      <br/>
      <Link to="https://uk.trustpilot.com/review/physioeaseuk.netlify.app"><img
        src={trustpilot}
        alt="Heading Icon"
        style={{ width: '150px', height: '64.75px' }}
      /></Link>
      <br/>
      <Link to="https://sdgs.un.org/goals"><img
        src={agenda2030}
        alt="Heading Icon"
        style={{ width: '150px', height: '150px' }}
      /></Link>
      <br/>
      <Link to="https://sdgs.un.org/goals/goal3"><img
        src={sdg3}
        alt="Heading Icon"
        style={{ width: '75px', height: '75px' }}
      /></Link>
      <Link to="https://sdgs.un.org/goals/goal10"><img
        src={sdg10}
        alt="Heading Icon"
        style={{ width: '75px', height: '75px' }}
      /></Link>
      <br/>
      <nav className="f-links">
        <Link to="/legalterms">{t('legalTerms')}</Link>
        <span>|</span>
        <Link to="/privacypolicy">{t('privacyPolicy')}</Link>
        <span>|</span>
        <Link to="/cookies">{t('cookies')}</Link>
        <span>|</span>
        <Link to="/contactus">{t('contactUs')}</Link>
        {user?.id && !hideLinks.includes(path) && (
          <>
          <span>|</span>
          <Link to="/faqs">{t('faqs')}</Link>
        </>
      )}
      </nav>
      <h2>© 2024-2025 Copyright PhysioEase · All Rights Reserved</h2>
      <img
        src={logo}
        alt="Heading Icon"
        style={{ width: '100px', height: '100px' }}
        />
    </footer>
  );
}

export default Footer;