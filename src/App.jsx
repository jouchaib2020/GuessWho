import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HistoryPage from './pages/HistoryPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game/:difficulty/:domain" element={<GamePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route
          path="*"
          element={<Navigate to="/home" replace />}
          />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
/*
*/