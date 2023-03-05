import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { storage } from '../firebase';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { useLocation } from 'react-router-dom'
import {getDocs, doc} from 'firebase/firestore'
import { collection } from "firebase/firestore";
import "./RideDetail.css";

import QRCode from "./QRCode";

const RideDetail = () => {
    const location = useLocation();
    const rideId= location.pathname.split('/')[2];
    
    // const ride = doc(db, "rides", rideid)
    const rideCollectionRef = collection(db, "rides");

    const [rideList, setRideList] = useState([]);
    const [imgUrl, setImgUrls] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            const storageRef = ref(storage, 'pictureFiles/'+rideId);
            const result = await listAll(storageRef);
            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
            Promise.all(urlPromises).then((res) => setImgUrls(res));
        };
        fetchImages();

    }, [])

    return (
        <div className="RegisterRide" style={{justify: "center"}}>
            {auth.currentUser?.email && (
                <>
                <div>
                <QRCode />
                </div>
                    <div>
                        {imgUrl.map((url) => (
                            <img src={url} />
                        ))}
                    </div>

                </>
            )}
        </div>
    );
};

export default RideDetail;
