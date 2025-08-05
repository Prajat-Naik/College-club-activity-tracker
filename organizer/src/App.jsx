import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ManageEvents from './Pages/ManageEvents';
import EventAttendance from './Pages/EventAttendance';
import Report from './Pages/Report';

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
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/event-attendance/:eventId" element={<EventAttendance />} />
            <Route path="/Report" element={<Report />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
