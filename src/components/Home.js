import React,  { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {db, auth} from '../firebase'
import { signInWithRedirect ,signInWithPopup,  GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import {collection, addDoc, Timestamp} from 'firebase/firestore'

import { Button, Card, Image } from 'react-bootstrap';

import { FcGoogle } from 'react-icons/fc';
import { GoSignOut } from 'react-icons/go';

import "../styling/home.css";



export default function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        CheckLogin();
        
      }, []);


    function CheckLogin()
    {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser(user);
        navigate("/dashboard");
        // ...
        } else {
        // User is signed out
        // ...
        setCurrentUser(false);
        navigate("/");
        }
    });
    }
  


    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((re)=>{
            console.log(re);
            //Check if the user has a student or tutor account. if they don't redirect them to create profile
            navigate('/dashboard');
            
            //try to get the user profile
            
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    function SignOut()
    {
        
        signOut(auth).then(() => {
          
        // Sign-out successful.
        window.location.href = '/';
        })
        
    }

    return (
        <>
            

            <div className="row">
              <div className= "title">Welcome to Paperhub</div>
            </div>
            <div className = "row">
              
            </div>
            <div className="signinButton">
                <Button variant="dark"  onClick={signInWithGoogle}>
                    <FcGoogle/> {"\u00a0"} Sign in with Google
                </Button>
            </div>
            <div>
                {(currentUser==null) ? <div></div>: (currentUser==false) ? <h2>Please Sign in</h2> :<h2>Welcome!</h2>}
            </div>
        </>
        
    )
}