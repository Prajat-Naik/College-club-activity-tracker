import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Components/Layout';
import Login from './Pages/Login';
import Events from './Pages/Events';
import Enroll from './Pages/Enroll';
import MyEvents from './Pages/MyEvents';
import Progress from './Pages/Progress';

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
            <Route path="/events" element={<Events />} />
            <Route path="/enroll/:eventId" element={<Enroll />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
