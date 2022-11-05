import React,  { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {db, auth} from '../firebase'
import {collection, addDoc, Timestamp, doc, getDoc} from 'firebase/firestore'
import { signInWithRedirect ,signInWithPopup,  GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { Button, Card, Image } from 'react-bootstrap';


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

        checkUserHasAccount(user)


        // ...
        } else {
        // User is signed out
        // ...
        setCurrentUser(false);
        navigate("/");
        }
    });
    }
  
    function checkUserHasAccount(user)
    {
        const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
          .then((data) => {
            if (!data.data())
            {
              navigate("/createacc")
            }
            
             
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

            <h1>Paperhub dashboard</h1>

            
        
        </>
        
    )
}