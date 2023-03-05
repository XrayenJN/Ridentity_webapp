import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { storage } from '../firebase';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { useLocation } from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'

import QRCode from "./QRCode";

const RideDetail = () => {
    const location = useLocation();
    const rideId= location.pathname.split('/')[2];
    
    // const ride = doc(db, "rides", rideid)
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
        <div className="RegisterRide">
            {auth.currentUser?.email && (
                <>
                <div>
                <QRCode />
                </div>
                    <div>
                        {rideList.map((ride) => (
                            (ride.userID == auth.currentUser.uid) ?
                                (
                                    <div className="container-fluid">
                                        {ride.name}
                                        {ride.model}
                                        {ride.serial_num}
                                        {ride.userID}
                                    </div>
                                )
                                : ""
                        ))}
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
