import { useAuth } from "../firebase";
import React from "react";
import RegisterRide from "./RegisterRide";
import RideList from "./RideList";
import QRCode from "./QRCode";

export default function Dashboard() {
    const currentUser = useAuth();

    return (
        <div className="App">
            <div>
                <div id="fields">
                    <div>Currently logged in as: { currentUser?.email } </div>
                    <QRCode />
                </div>
            </div>
            <div>
                <a href="/registerRide">
                    <button >Add New Ride Register</button>
                </a>
                <RideList />
            </div>
        </div>

    );
}