import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../firebase';
import { logout } from '../firebase';

const verifyStatus = false;

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
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                    <Link to="/login" className="nav-link">Sign In</Link>
                                </div>

                        }
                        <li className="navbar-item">
                            {
                                verifyStatus ?
                                <div>
                            <Link to="/verifyUser" className="nav-link">VerifyUser</Link>
                                </div>
                                :
                                ""
                            }
                        {
                            currentUser ?
                            <div>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </div>
                            :
                            <div>
                            <Link to="/login" className="nav-link">Dashboard</Link>
                            </div>
                        }
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
