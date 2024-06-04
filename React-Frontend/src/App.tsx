import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import QuestionPage from './QuestionPage';
import BoroughPage from './BoroughPage';
import WelcomePage from './WelcomePage';
import SubmitPage from './SubmitPage';
import './index.css';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/borough" element={<BoroughPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
