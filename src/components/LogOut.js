import React from "react";
import { useRef, useState } from 'react';

export default function AddVehicle() {
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
        <div className="App">
            <div>
                <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>
            </div>
        </div>

    );
}