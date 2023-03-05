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

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const RegisterRide = () => {
    var count = 0;
    const [rideList, setRideList] = useState([]);
    const [newRideName, setNewRideName] = useState("");
    const [newModel, setNewModelName] = useState("");
    const [newSerial, setNewSerial] = useState("");
    const [rideid, setRideId] = useState("");

    const [fileUpload, setFileUpload] = useState("");

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
        } catch (e) {
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

            console.log(newRideName)
            console.log(newModel)
            console.log(newSerial)

            setRideId(rideRef.id);
            

        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getRideList();
    }, []);

    return (
        <div>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Ride Identification
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Vehicle Name"
                            fullWidth
                            autoComplete="name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="model"
                            name="model"
                            label="model"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="SerialNumber"
                            name="SerialNumber"
                            label="SerialNumber"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
            <div className="RegisterRide" style={{justifyContent:'center', alignItems:'center', height: 100}}>
                {auth.currentUser?.email && (
                    <>
                        <Button variant="contained" onClick={onSubmitRide}>Add new Ride</Button>
                    </>
                )}
                {
                    rideid ?
                        (
                            
                            <div className="container" >
                                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                                <>
                                <Button variant="contained" onClick={() => uploadFile(fileUpload)}>Upload Picture User with the Vehicle</Button>
                                </>
                                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                                <>
                                <Button variant="contained" onClick={() => uploadFile(fileUpload)}>Upload the Front-Side</Button>
                                </>
                                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                                <>
                                <Button variant="contained" onClick={() => uploadFile(fileUpload)}>Upload the Side-view</Button>
                                </>
                                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                                <>
                                <Button variant="contained" onClick={() => uploadFile(fileUpload)}>Upload the Back-Side</Button>
                                </>
                                <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
                                <>
                                <Button variant="contained" onClick={() => uploadFile(fileUpload)}>Upload Additional Picture</Button>
                                </>
                                <Button variant="contained" onClick={onSubmitRide} href='/dashboard'>Form Finished</Button>
                            </div>
                        ) :
                        ""
                }

<>
                    </>

            </div>
        </div>
    );
};

export default RegisterRide;
