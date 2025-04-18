import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'
import Home from  './components/Home.jsx'
import RequestForm from './components/RequestForm.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import Donation from './components/Donation.jsx';
import Profile from  './components/Profile.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx';  // ensure correct import path

// A placeholder dashboard component
const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/check', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          console.error("User fetch failed:", data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        {user ? (
          <p>Welcome, <span className="font-semibold">{user.name}</span>!</p>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (

  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/request"    element={<RequestForm/>}/>
        <Route path='/donate'     element = {<Donation/>}></Route>
        <Route path='/profile'    element={<Profile/>}/>
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/"           element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
    
  );
};

export default App;
