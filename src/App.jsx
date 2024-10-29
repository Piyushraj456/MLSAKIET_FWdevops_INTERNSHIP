// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AllBlogs from './components/AllBlogs';
import AboutUs from "./components/AboutUs";
import ProtectedRoute from './components/ProtectedRoute'; 
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allblogs"
            element={
              <ProtectedRoute>
                <AllBlogs />
              </ProtectedRoute>
            }
          />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
