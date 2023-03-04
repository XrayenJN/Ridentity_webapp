import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../firebase';
import { logout } from '../firebase';


export default function Navbar() {
    // AUTH PART
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {
                            currentUser ?
                                <div>
                                    <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
                                </div>
                                :
                                <div>
                                    <Link to="/createUser" className="nav-link">Sign Up</Link>
                                    <Link to="/login" className="nav-link">Sign In</Link>
                                </div>

                        }
                        <li className="navbar-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
