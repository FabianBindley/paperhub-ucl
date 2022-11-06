import React,  { useEffect, useState } from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";
import { doc, getDoc, query, collection, updateDoc,arrayUnion} from "firebase/firestore";
import {db, auth} from '../firebase'
import NavbarPaper from './NavbarPaper'
import { Card, ListGroupItem , ListGroup, Button, Form} from 'react-bootstrap';
import "../styling/paper.css";

export default function AddSubmission(props) {
    const [answerValue, setAnswerValue] = useState("")
    const [URLShareValue, setURLShareValue] = useState("")

    const allLetters = [..."abcdefghijklmnopqrstuvwxyz"]; 
    const allNumbers = [..."0123456789"];

    async function handleSubmitChoice(){
      let paper = props.value[0]
      const paperRef = doc(db, "Papers", paper);
      let userName = props.value[1].FName+" "+props.value[1].LName
      let answerResult = {
        "answer":answerValue,
        "URL":URLShareValue,
        "score":0,
        "submittedBy":userName,
        "answerID":generateAnswerID()
      }
      
      console.log(answerResult)
      
      await updateDoc(paperRef, {
        answers: arrayUnion(answerResult),
            });
      
     setAnswerValue("")
     setURLShareValue("")

     window.location.reload(true);

      

    }

  function generateAnswerID()
  {
   
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          
          let name = ""
          let rand = 0
          for (let i = 0; i < 6; i++)
          {
            rand = getRandomInt(2)
            if (rand)
            {
              rand = getRandomInt(26)
              name+=allLetters[rand]
            }
            else
            {
              rand = getRandomInt(10)
              name+=allNumbers[rand]
            }
          }
          return name
    
  }

    const handleAnswerValueChange = e => 
  {
    setAnswerValue(e.target.value)
    console.log(e.target.value)
    
  }

  const handleURLShareValueChange = e => 
  {
    e.preventDefault()
    setURLShareValue(e.target.value)
    console.log(e.target.value)
    
  }
      
    return (
        <>
        <Card border = "primary">

          <div class = "cardPadding">

          <Form>
                  

                  <Form.Group className="mb-3" controlId="CourseSearch">
                      <Form.Label>Your Answer for {props.value[0]}:</Form.Label>
                      <Form.Control as="textarea" rows={5} value={answerValue} onChange={handleAnswerValueChange} placeholder="EG: 1) 19 + 10 = 29" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="CourseSearch">
                      <Form.Label>Answer PDF document share URL:</Form.Label>
                      <Form.Control as="textarea" rows={1} value={URLShareValue} onChange={handleURLShareValueChange} placeholder="If you have uploaded a pdf or other web accessible version of your answers, please include the share link here" />
                  </Form.Group>

                  <Button onClick = {handleSubmitChoice}>Submit</Button>
                
            </Form>

          </div>

          

        </Card>
          
           

            
        
        </>
        
    )
}