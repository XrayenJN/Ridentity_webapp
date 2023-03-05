import React from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./components/Homepage"
import SignUp from './components/SignUp';
import SignIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import RegisterRide from './components/RegisterRide';
import { auth } from './firebase';
import { Route, Routes, Navigate } from 'react-router-dom';
import RideDetail from './components/RideDetail';
import VerifyUser from './components/VerifyUser';
import { useState } from 'react';

function App() {

  const ProtectedRoute = ({ currentUser, children }) => {
    if (!currentUser) {
      return <Navigate to='/login' replace />;
    }

    return children;
  }
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Homepage />}>

        <Route path="/dashboard" element={
          <ProtectedRoute currentUser={auth}>
            <Dashboard />
          </ProtectedRoute>}
        />
        <Route path="/verifyUser" element={
          <ProtectedRoute currentUser={auth}>
            <VerifyUser />
          </ProtectedRoute>}
        />
          <Route path='/registerRide' element={
          <ProtectedRoute currentUser={auth}>
            <RegisterRide />
          </ProtectedRoute>}
        />
        <Route path='/rideDetail/:id' element={
          <ProtectedRoute currentUser={auth}>
            <RideDetail />
          </ProtectedRoute>}
        />
      </Route>
    </Routes>
  );
}

export default App;
