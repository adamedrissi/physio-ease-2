import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import TrackProgress from './pages/TrackProgress';
import Consultations from './pages/Consultations';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/track-progress" element={<TrackProgress />} />
              <Route path="/consultations" element={<Consultations />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;