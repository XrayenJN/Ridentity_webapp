import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import { addDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { ref } from 'firebase/storage';
import { storage } from '../firebase';
import { uploadBytes } from 'firebase/storage';
import { where } from 'firebase/firestore';

const theme = createTheme();

export default function VerifyUser() {
    const [fileUpload, setFileUpload ] = useState("");

    const uploadFile = async () => {

        if (!fileUpload) return;
        const fileFolderRef = ref(storage, `userPictureFiles/${auth.currentUser.uid}`);
        try {
            await uploadBytes(fileFolderRef, fileUpload)
        } catch(e){
            console.log(e)
        }
    }

    const rideCollectionRef = collection(db, "userIdentity");

    const userVerification = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            await addDoc(rideCollectionRef, {
                fullName: data.get('fullName'),
                address: data.get('address'),
                phoneNumber: data.get('phoneNumber'),
                email: auth.currentUser.email
            });

        } catch (e) {
            console.log(e);
        }
        window.location ='/dashboard'
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={userVerification} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="address"
                  id="address"
                  autoComplete="new-address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="phoneNumber"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
            </Grid>
            <input type="file" onChange={((event) => setFileUpload(event.target.files[0]))} />
            <button onClick={uploadFile}>Upload Photo as your Profile Picture</button>
            <Link href='/dashboard'>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} 
                >
                Verify Yourself
                </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}