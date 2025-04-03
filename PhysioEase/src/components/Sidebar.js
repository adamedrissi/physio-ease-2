import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaChartLine, FaUser } from 'react-icons/fa';
import { MdEventAvailable, MdVideoLibrary } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-container">
        <img src="/logo1024.png" alt="PE Logo" className="logo" />
      </div>
      <div className="toggle-button" onClick={toggleSidebar}>
        {collapsed ? '>' : '<'}
      </div>
      {!collapsed && <h2 className="sidebar-title">PhysioEase</h2>}
      <ul>
        <li>
          <Link to="/">{collapsed ? <AiFillHome size={24} /> : t('home')}</Link>
        </li>
        <li>
          <Link to="/track-progress">{collapsed ? <FaChartLine size={24} /> : t('trackProgress')}</Link>
        </li>
        <li>
          <Link to="/consultations">{collapsed ? <MdEventAvailable size={24} /> : t('consultations')}</Link>
        </li>
        <li>
        <Link to="/video-library">{collapsed ? <MdVideoLibrary size={24} /> : t('videoLibrary')}</Link>
        </li>
        <li>
          <Link to="/profile">{collapsed ? <FaUser size={24} /> : t('userProfile')}</Link>
        </li>
        <li>
          <Link to="/settings">{collapsed ? <FiSettings size={24} /> : t('settings')}</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;