import React, { useState } from 'react'
import { signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig';
import { TextField, Box, Button } from '@mui/material';
import signInImg from '../images/googleAppSignInImg1.png';
import { setUserToFirebase } from '../firebase/firebaseActions';
import { toast } from 'react-toastify';

const SignInPage = () => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [name, setName] = useState();
    let [signUpControl, setSignUpControl] = useState(false);

    const openSignUpFunc = () => {
        setSignUpControl(!signUpControl);
    }

    const submitFunc = () => {
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setUserToFirebase(userCredentials.user);
                })
                .then(() => {
                    toast.success('Successfully signed in!');
                })
        }
    }

    const signUpFunc = () => {
        if (name && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    updateProfile(userCredentials.user, {
                        displayName: name
                    })
                        .then(() => {
                            setTimeout(() => {
                                setUserToFirebase(userCredentials.user);
                            }, 2000);
                        })
                })
                .then(() => {
                    toast.success(`Welcome, ${name}!`);
                })
        }
    }

    return (
        <div className='signInPage' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
            <div className='shadow p-4 py-5 rounded' style={{ textAlign: "center" }}>
                <img src={signInImg} alt="" style={{ width: "100px", marginBottom: "14px", pointerEvents: 'none' }} />
                <h4>Sign {signUpControl ? 'up' : 'in'}</h4>
                <p className='p-0 m-0' style={{ fontSize: "12px" }}>{signUpControl ? 'Create your Google Account' : 'Use your Email Account'}</p>
                <Box sx={{ my: "30px", width: "400px" }}>
                    {
                        signUpControl ?
                            <TextField fullWidth id="outlined-basic" onChange={(e) => {
                                setName(e.target.value);
                            }} label="Name" variant="outlined" sx={{ mb: "16px" }} />
                            :
                            <></>
                    }
                    <TextField fullWidth id="outlined-basic" onChange={(e) => {
                        setEmail(e.target.value);
                    }} label="Email" variant="outlined" sx={{ mb: "16px" }} />
                    <TextField fullWidth id="outlined-basic" onChange={(e) => {
                        setPassword(e.target.value);
                    }} label="Password" variant="outlined" />
                    <div style={{ width: "100%", textAlign: "left", margin: "10px 0" }}>
                        <Button size='small' sx={{ fontSize: "10px" }}>Forgot Password?</Button>
                    </div>
                </Box>
                <Box sx={{ display: "flex", mt: "50px", justifyContent: "space-between", alignItems: "center" }}>
                    {
                        signUpControl ?
                            <>
                                <Button size='small' sx={{ fontSize: "10px" }} onClick={openSignUpFunc}>Already have an account</Button>
                                <Button size='small' variant='contained' onClick={signUpFunc}>Sign up</Button>
                            </>
                            :
                            <>
                                <Button size='small' sx={{ fontSize: "10px" }} onClick={openSignUpFunc}>Create account</Button>
                                <Button size='small' variant='contained' onClick={submitFunc}>Sign in</Button>
                            </>
                    }
                </Box>
            </div>
        </div>
    )
}

export default SignInPage