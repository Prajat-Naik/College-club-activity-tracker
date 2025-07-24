import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import Report from './Pages/Report';
import Login from './Pages/Login';
import ManageStudents from './Pages/ManageStudents';
import ManageClubs from './Pages/ManageClubs';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/students" element={<ManageStudents />} />
            <Route path="/clubs" element={<ManageClubs />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
