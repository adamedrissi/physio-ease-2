import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route/*,Navigate*/ } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';

// Patient pages
import Home from './pages/patient/PatientHome';
import FAQs from './pages/patient/PatientFAQs';
import TrackProgress from './pages/patient/PatientProgress';
//import Consultations from './pages/patient/PatientConsultations';
import VideoLibrary from './pages/patient/PatientLibrary';
import VideoCategoryPage from './pages/patient/VideoCategoryPage';
//import DirectMessages from './pages/patient/PatientDirectMessages';
import UserProfile from './pages/patient/PatientProfile';
import Settings from './pages/patient/PatientSettings';

// Physiotherapist pages
import PhysioHome from './pages/physio/PhysioHome';
import PhysioFAQs from './pages/physio/PhysioFAQs';
import PhysioProgress from './pages/physio/PhysioProgress';
//import PhysioConsultations from './pages/physio/PhysioConsultations';
import PhysioLibrary from './pages/physio/PhysioLibrary';
//import PhysioDirectMessages from './pages/physio/PhysioDirectMessages';
import PhysioProfile from './pages/physio/PhysioProfile';
import PhysioSettings from './pages/physio/PhysioSettings';

import RegisterLogin from './pages/RegisterLogin';
import NotFound from './pages/404';
import LegalTerms from './pages/LegalTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import ContactUs from './pages/ContactUs';

// Components
import PatientNavbar from './components/PatientNavbar';
import PhysioNavbar from './components/PhysioNavbar';
import Footer from './components/Footer';
import PublicLayout from './components/PublicLayout';
import ScrollToTop from './components/ScrollUp';

// App Style
import './styles/App.css';

function PatientLayout() {
  return (
    <div className="app">
      <PatientNavbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          {/*<Route path="/consultations" element={<Consultations />} />*/}
          <Route path="/video-library" element={<VideoLibrary />} />
          <Route path="/video-library/:category" element={<VideoCategoryPage />} />
          {/*<Route path="/messages" element={<DirectMessages />} />*/}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/legalterms" element={<LegalTerms />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/contactus" element={<ContactUs />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function PhysioLayout() {
  return (
    <div className="app">
      <PhysioNavbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<PhysioHome />} />
          <Route path="/faqs" element={<PhysioFAQs />} />
          <Route path="/track-progress" element={<PhysioProgress />} />
          {/*<Route path="/consultations" element={<PhysioConsultations />} />*/}
          <Route path="/video-library" element={<PhysioLibrary />} />
          {/*<Route path="/messages" element={<PhysioDirectMessages />} />*/}
          <Route path="/profile" element={<PhysioProfile />} />
          <Route path="/settings" element={<PhysioSettings />} />
          <Route path="/LegalTerms" element={<LegalTerms />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Cookies" element={<Cookies />} />
          <Route path="/ContactUs" element={<ContactUs />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
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
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/faqs1" element={
          <PublicLayout isCentered={false}>
            <FAQs />
          </PublicLayout>
        } />
        <Route path="/faqs2" element={
          <PublicLayout isCentered={false}>
            <PhysioFAQs />
          </PublicLayout>
        } />
        <Route path="/LegalTerms" element={
          <PublicLayout isCentered={false}>
            <LegalTerms />
          </PublicLayout>
        } />
        <Route path="/PrivacyPolicy" element={
          <PublicLayout isCentered={false}>
            <PrivacyPolicy />
          </PublicLayout>
        } />
        <Route path="/Cookies" element={
          <PublicLayout isCentered={false}>
            <Cookies />
          </PublicLayout>
        } />
        <Route path="/ContactUs" element={
          <PublicLayout isCentered={false}>
            <ContactUs />
          </PublicLayout>
        } />
        <Route path="*" element={
          <PublicLayout isCentered={false}>
            <NotFound />
          </PublicLayout>
        } />
      </Routes>
    );
  }

  return isPhysio ? <PhysioLayout /> : <PatientLayout />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;