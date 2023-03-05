import { useAuth } from "../firebase";
import React from "react";
import RegisterRide from "./RegisterRide";
import RideList from "./RideList";
import QRCode from "./QRCode";
import { Button } from "@mui/material";
import { addDoc } from "firebase/firestore";

export default function Dashboard() {
    const currentUser = useAuth();

    return (
        <div className="App">
            <div>
                <a href="/registerRide">
                <Button variant="contained" onClick={''}>Add new Ride</Button>
                </a>
                <RideList />
            </div>
        </div>

    );
}