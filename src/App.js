import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import TopHeadlines from './components/TopHeadlines.js';
import Everything from "./components/Everything.js";

const EverythingWrapper = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  return <Everything onBack={handleBack} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopHeadlines />} />
        <Route path="/everything" element={<EverythingWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
