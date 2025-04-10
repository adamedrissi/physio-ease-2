/*import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import FAQs from './pages/FAQs';
import TrackProgress from './pages/TrackProgress';
import Consultations from './pages/Consultations';
import VideoLibrary from './pages/VideoLibrary';
import VideoCategoryPage from './pages/VideoCategoryPage';
import DirectMessages from './pages/DirectMessages';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import RegisterLogin from './pages/RegisterLogin';

import './App.css';

function AppRoutes() {
  const { user } = useContext(UserContext);
  const isAuthenticated = user && user.id;

  return (
    <Routes>
      <Route path="/login" element={<RegisterLogin />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/faqs" element={isAuthenticated ? <FAQs /> : <Navigate to="/login" />} />
      <Route path="/track-progress" element={isAuthenticated ? <TrackProgress /> : <Navigate to="/login" />} />
      <Route path="/consultations" element={isAuthenticated ? <Consultations /> : <Navigate to="/login" />} />
      <Route path="/video-library" element={isAuthenticated ? <VideoLibrary /> : <Navigate to="/login" />} />
      <Route path="/video-library/:category" element={isAuthenticated ? <VideoCategoryPage /> : <Navigate to="/login" />} />
      <Route path="/messages" element={isAuthenticated ? <DirectMessages /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
      <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <UserContext.Consumer>
            {({ user }) => user && user.id && <Sidebar />}
          </UserContext.Consumer>
          <div className="content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;*/

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';

// Patient pages
import Home from './pages/Home';
import FAQs from './pages/FAQs';
import TrackProgress from './pages/TrackProgress';
import Consultations from './pages/Consultations';
import VideoLibrary from './pages/VideoLibrary';
import VideoCategoryPage from './pages/VideoCategoryPage';
import DirectMessages from './pages/DirectMessages';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

// Physiotherapist pages
import PhysioHome from './pages/PhysioHome';
import PhysioFAQs from './pages/PhysioFAQs';
import PhysioProgress from './pages/PhysioProgress';
import PhysioConsultations from './pages/PhysioConsultations';
import PhysioLibrary from './pages/PhysioLibrary';
import PhysioDirectMessages from './pages/PhysioDirectMessages';
import PhysioProfile from './pages/PhysioProfile';
import PhysioSettings from './pages/PhysioSettings';

import RegisterLogin from './pages/RegisterLogin';

import PatientSidebar from './components/Sidebar';
import PhysioSidebar from './components/PhysioSidebar';
import './App.css';

function PatientLayout() {
  return (
    <div className="app">
      <PatientSidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/video-library" element={<VideoLibrary />} />
          <Route path="/video-library/:category" element={<VideoCategoryPage />} />
          <Route path="/messages" element={<DirectMessages />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function PhysioLayout() {
  return (
    <div className="app">
      <PhysioSidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<PhysioHome />} />
          <Route path="/faqs" element={<PhysioFAQs />} />
          <Route path="/track-progress" element={<PhysioProgress />} />
          <Route path="/consultations" element={<PhysioConsultations />} />
          <Route path="/video-library" element={<PhysioLibrary />} />
          <Route path="/messages" element={<PhysioDirectMessages />} />
          <Route path="/profile" element={<PhysioProfile />} />
          <Route path="/settings" element={<PhysioSettings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useContext(UserContext);
  const isAuthenticated = user && user.id;
  const isPhysio = user && user.role === 'physio';

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/faqs1" element={<FAQs />} />
        <Route path="/faqs2" element={<PhysioFAQs />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return isPhysio ? <PhysioLayout /> : <PatientLayout />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;