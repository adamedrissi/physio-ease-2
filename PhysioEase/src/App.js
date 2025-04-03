import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import FAQs from './pages/FAQs';
import TrackProgress from './pages/TrackProgress';
import Consultations from './pages/Consultations';
import VideoLibrary from './pages/VideoLibrary';
import VideoCategoryPage from './pages/VideoCategoryPage';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import './App.css';
/*import axios from 'axios';

axios.get('http://localhost:8080/api/users/1')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));*/

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/track-progress" element={<TrackProgress />} />
              <Route path="/consultations" element={<Consultations />} />
              <Route path="/video-library" element={<VideoLibrary />} />
              <Route path="/video-library/:category" element={<VideoCategoryPage />} />
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