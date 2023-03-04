import { getAuth } from "firebase/auth";
import { useAuth } from "../firebase";
import React from "react";

export default function Dashboard() {
    const currentUser = useAuth();

    return (
        <div className="App">
            <div>
                <div id="fields">
                    <div>Currently logged in as: { currentUser?.email } </div>
                </div>
            </div>
        </div>

    );
}