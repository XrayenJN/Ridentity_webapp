import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import Button from '@mui/material/Button';
import QRCode from './QRCode'

const RegisterRide = () => {
    var count = 0;
    const [rideList, setRideList] = useState([]);
    const [newRideName, setNewRideName] = useState("");
    const [newModel, setNewModelName] = useState("");
    const [newSerial, setNewSerial] = useState("");
    const [rideid , setRideId] = useState("");

    const [fileUpload, setFileUpload ] = useState("");

    const rideCollectionRef = collection(db, "rides");
    const getRideList = async () => {
        // reads the data
        const data = await getDocs(rideCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        // set ride list
        setRideList(filteredData);
    };
    const uploadFile = async (file) => {
        if (!file) return;
        const fileFolderRef = ref(storage, `pictureFiles/${rideid}/${count}`);
        count += 1;
        try {
            await uploadBytes(fileFolderRef, file)
        } catch(e){
            console.log(e)
        }
    }

    const onSubmitRide = async (ride) => {
        try {
            const rideRef = await addDoc(rideCollectionRef, {
                name: newRideName,
                model: newModel,
                serial_num: newSerial,
                userID: auth.currentUser.uid
            });

            setRideId(rideRef.id);

        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getRideList();
    }, []);

    return (
        <div className="RegisterRide">
            {auth.currentUser?.email && (
                <>
                    <div className="ride-register">
                        <input
                            type="text"
                            placeholder="name"
                            onChange={(e) => setNewRideName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="model"
                            onChange={(e) => setNewModelName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="serial number"
                            onChange={(e) => setNewSerial(e.target.value)}
                        />
                        <Button variant="contained" onClick={onSubmitRide}>Add new Ride</Button>
                    </div>
                </>
            )}
            {
                rideid ?
                (
                    <div>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                <button onClick={() => uploadFile(fileUpload)}>Upload File front-side</button>
            </div>
                ) :
                ""


            }

            <QRCode />
            
        </div>
    );
};

export default RegisterRide;
