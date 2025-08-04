import React, { useContext /*,useState*/ } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaChartLine, FaUser } from 'react-icons/fa';
import { /*MdEventAvailable,*/ MdVideoLibrary } from 'react-icons/md';
import { FiSettings, FiArrowDown, FiLogOut, /*FiMessageSquare*/ } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
import '../styles/physio/PhysioNavbar.css';

function Navbar() {
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const scrollToBottom = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="navbar2">
      <div className="logo-container2">
        <img src="/logo1024.png" alt="PE Logo" className="logo2" />
        <img src="/PE.png" alt="PE Title" className="logo" />
      </div>
      <ul className="nav-links2">
        <li><Link to="/"><AiFillHome /> {t('home')}</Link></li>
        <li><Link to="/track-progress"><FaChartLine /> {t('trackPatients')}</Link></li>
        {/*<li><Link to="/consultations"><MdEventAvailable /> {t('consultations')}</Link></li>*/}
        <li><Link to="/video-library"><MdVideoLibrary /> {t('videoLibrary')}</Link></li>
        {/*<li><Link to="/messages"><FiMessageSquare /> {t('messages')}</Link></li>*/}
        <li><Link to="/profile"><FaUser /> {t('physioProfile')}</Link></li>
        <li><Link to="/settings"><FiSettings /> {t('settings')}</Link></li>
        <li><Link onClick={scrollToBottom}><FiArrowDown /> {t('scrollDown')}</Link></li>
        <li><Link onClick={() => {setUser({});localStorage.removeItem('userProfile');}} to="/"><FiLogOut /> {t('logout')}</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;