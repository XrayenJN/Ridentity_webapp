import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import { Warning } from "@mui/icons-material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const RideList = () => {
    const [updateStatus, editUpdateStatus] = useState(false);
    const [rideList, setRideList] = useState([]);

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

    const deleteRide = async (rideid) => {
        const rideDoc = doc(db, "rides", rideid);
        await deleteDoc(rideDoc);
        getRideList();
    };

    useEffect(() => {
        getRideList();
    }, []);

    return (
        <div className="RegisterRide">
            {auth.currentUser?.email && (
                <>
                    <div>
                        {
                            updateStatus ?
                                <a href="https://www.police.vic.gov.au/"><h1>Contact Police Now</h1></a>
                                :
                                ""
                        }
                        {rideList.map((ride) => (
                            (ride.userID == auth.currentUser.uid) ?
                                (
                                    <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image="https://source.unsplash.com/featured?bicycle"
                                                alt="green iguana"
                                            />

                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {ride.name}

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {ride.model}
                                                </Typography>
                                                <div className="">
                                                    <Button
                                                        className="button-edit" onClick={() => editUpdateStatus(!updateStatus)}
                                                    >
                                                        <Warning id="i" />
                                                    </Button>
                                                    <Button className="button-delete" onClick={() => deleteRide(ride.id)}>
                                                        <DeleteIcon id="i" />
                                                    </Button>
                                                    <a href={"/rideDetail/" + ride.id}><VisibilityIcon /></a>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>


                                )
                                : ""
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default RideList;
