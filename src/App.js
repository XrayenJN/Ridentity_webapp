import React from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./components/Homepage"
import SignUp from './components/SignUp';
import SignIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import {  useAuth } from './firebase';



function App() {
  const currentUser = useAuth();
  const ProtectedRoute = ({ currentUser, children }) => {
    if (!currentUser){
      return <Navigate to='/login' replace />;
    }

    return children;
  }
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="/createUser" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={
          <ProtectedRoute currentUser={useAuth()}>
            <Dashboard />
          </ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
