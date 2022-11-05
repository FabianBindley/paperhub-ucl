import { auth, db} from '../firebase';
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Button, Card, Alert, Container, CardGroup, Image} from "react-bootstrap";

export default function SignupStudent() {
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();



    //Refs for the form fields
    const FName = React.useRef();
    const LName = React.useRef();
    const Email = React.useRef();
    /*
    const TutorCode = React.useRef();
    var TutorUID = React.useRef();
*/
    const auth = getAuth();
    
    


    function CheckLogin()
    {
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setCurrentUser(user);
          // ...
        } else {
          // User is signed out
          // ...
          navigate("/");
        }
      });
    }

    useEffect(() => {
      CheckLogin();
      
    }, []);

    function SignOut()
    {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }

    function printDone()
    {
      console.log("done")
    }



    const handleStudentSubmit = event => {
      event.preventDefault();
      uploadProfile()
      
      }

    async function uploadProfile()
    {

      //console.log(TutorCode.current.value)
      try {
          await setDoc(doc(db, "Users", currentUser.uid), {
            FName : FName.current.value,
            LName : LName.current.value,
        })
        alert("Added profile successfully!")
        navigate("/dashboard")
    
      } catch {
        alert("Failed to save profile, Please check internet connection and try again");
      }

          
  
    }


    

    return (
      <>
         <div class="SignupContainer">
        <h1> Welcome new Student! </h1>
        <Card >
            <Card.Body>
                <Form>
                    
                    <Form.Group className="mb-3" controlId="StudentFName">
                        <Form.Label>First Name: This cannot be changed later</Form.Label>
                        <Form.Control type="text" placeholder="First Name" ref = {FName} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="StudentLName">
                        <Form.Label>Last Name: This cannot be chanegd later</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" ref = {LName} required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleStudentSubmit}>
                        Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
              
        </div>
        </>
        
    )
}