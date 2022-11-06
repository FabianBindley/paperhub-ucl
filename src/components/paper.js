import React,  { useEffect, useState } from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";
import { doc, getDoc, query, collection, updateDoc} from "firebase/firestore";
import {db, auth} from '../firebase'
import { signInWithRedirect ,signInWithPopup,  GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import NavbarPaper from './NavbarPaper'
import AddSubmission from './AddSubmission'
import { Card, ListGroupItem , ListGroup, Button} from 'react-bootstrap';
import { FaArrowAltCircleUp,FaArrowAltCircleDown } from 'react-icons/fa';

import "../styling/paper.css";
import "../styling/main.css";

export default function Paper(props) {
    const search = useLocation().search;
    const paper = new URLSearchParams(search).get('paper');

    const navigate = useNavigate();

    var answersArr = ""
    var currentUser = ""
    const [URL, setURL] = useState("")
    const [paperCard, setPaperCard] = useState("")
    
    
    const [currentUserData, setCurrentUserData] = useState(null)
    const [showAddSubmission, setShowAddSubmission] = useState(false)

    

    useEffect(() => {
        CheckLogin();
        
      }, []);

    function addSubmission(){
        return(
            <>
                <h1>Add a submission!</h1>
            </>
        )
    }

    function CheckLogin() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                currentUser = user;
                console.log(user);
                getUserData(user);
                // ...
            } else {
                // User is signed out
                // ...
                currentUser = false;
                navigate("/");
            }
        });
    }

    async function getUserData(user) {
        const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
          .then((data) => {
            console.log(data.data())
            if (!data.data())
            {
                console.log('error with user data');
            }
            else{
                setCurrentUserData(data.data())
                
            }
        })
    }

    async function getData()
    {
        const docRef = doc(db, "Papers", paper);
        getDoc(docRef)
          .then((data) => {
            console.log(data.data())
            if (!data.data())
            {
                noDataAvailable()
            }
            else{
                answersArr = data.data().answers
                console.log(data.data().URL)
                setURL(data.data().URL)
                generatePaperCard(data.data().answers)
                
            }
        })
            
             


    }

    function noDataAvailable()
    {
        setPaperCard(
            <div class = "cardStyle noDataCard">
            <Card border="danger">
                <Card.Title>Something went wrong loading {paper}.</Card.Title>
                <ListGroupItem>Please try again</ListGroupItem>
            </Card>
            </div>
            
      
    )
    }

    async function checkVote(id)
    {

        const userRef = doc(db, "Users", currentUser.uid);
        return getDoc(userRef)
          .then((data) => {
            if (data.data()) {
                var voted = data.data().votedAnswers;
                console.log('voted asnwer');
                console.log(voted);             
                return voted;
            }
        })
    }



    /*
    function handleDownvote(id)
    {
        //Check if already voted on this question. 
        let votes = checkVote(id)
        console.log(votes)
        var downvoted = votes[0]
        var upvoted = votes[1]
        var alreadyVoted = false
        if (downvoted.includes(id))
        {
            alreadyVoted = true
        }
        //If already voted down, then cannot vote again.
        if(alreadyVoted)
        {
            alert("You have already downvoted, you cannot downvote again!")
        }
        
        else{

            if (upvoted.includes(id))
            {
                upvoted = upvoted.remove(id)
            }
            for (let i = 0; i < answersArr.length; i++)
            {
                if (answersArr[i].answerID == id)
                {
                    answersArr[i].score=parseInt(answersArr[i].score)-1
                }
            }
            downvoted = downvoted.push(id)
            generatePaperCard(answersArr)
            updateDatabaseRecord(answersArr,"down", votes)
        }
        
    }*/

    function handleDownvote(id)
    {
        checkVote(id).then((voted) => {
            let voted_answer = voted[id];
            if (voted_answer == undefined) {
                voted_answer = 0;
            }
            console.log('downvote');
            console.log(voted_answer);
            console.log(answersArr)
            for (let i = 0; i < answersArr.length; i++)
            {
                if (answersArr[i].answerID == id)
                {
                    if (voted_answer == 1)
                        answersArr[i].score=parseInt(answersArr[i].score)-2
                    else if (voted_answer == 0)
                        answersArr[i].score=parseInt(answersArr[i].score)-1
                    else if (voted_answer == -1) { // remove downvote
                        answersArr[i].score=parseInt(answersArr[i].score)+1
                        generatePaperCard(answersArr)
                        updateDatabaseRecord(answersArr,0,id,voted)
                        return;
                    }
                }
            }
            generatePaperCard(answersArr)
            updateDatabaseRecord(answersArr,-1,id,voted)

        });
    }


    function handleUpvote(id)
    {
        checkVote(id).then((voted)=> {
            let voted_answer = voted[id];
            if (voted_answer == undefined) {
                voted_answer = 0;
            }
            console.log('data');
            console.log(voted_answer);
            console.log(answersArr);
            for (let i = 0; i < answersArr.length; i++)
            {
                if (answersArr[i].answerID == id)
                {
                    if (voted_answer == -1)
                        answersArr[i].score=parseInt(answersArr[i].score)+2
                    else if (voted_answer == 0)
                        answersArr[i].score=parseInt(answersArr[i].score)+1
                    else if (voted_answer == 1) { // remove upvote
                        answersArr[i].score=parseInt(answersArr[i].score)-1
                        generatePaperCard(answersArr)
                        updateDatabaseRecord(answersArr,0,id,voted)
                        return;
                    }
                }
            }
            generatePaperCard(answersArr);
            updateDatabaseRecord(answersArr,1,id,voted);
        });
        
    }

    async function updateDatabaseRecord(answersArr,directionVoted,id,voted){
        console.log(answersArr)
        const paperRef = doc(db, "Papers", paper);
        const userRef = doc(db, "Users", currentUser.uid);

        voted[id] = directionVoted;
        
        await updateDoc(paperRef, {
        answers: answersArr
        });

        await updateDoc(userRef, {
        votedAnswers: voted
        })
        /*

        await updateDoc(paperRef, {
        downvotedAnswers: votes[0]
            });

        await updateDoc(paperRef, {
        upvotedAnswers: votes[1]
        });*/
    }

    function toggleShowAddSubmission()
    {
        if (showAddSubmission){
            setShowAddSubmission(false)
        }
        else{
            setShowAddSubmission(true)
        }
    }
    
    function generatePaperCard(answersIn)
    {
        let answers = answersIn.sort(GetSortOrder("score")).reverse()
        setPaperCard(
   
                <>
      
                   
                    
                        <ListGroup>
                        {answers.map((answer) => (
                            <>
                        <Card border="primary">
                            <Card.Header>{answer.submittedBy}</Card.Header>
                            
                            

                            <div class="row">
                                <div class="col-9">
                                    <ListGroupItem>{answer.answer}</ListGroupItem>
                                    {(answer.URL) ? <ListGroupItem><a href={answer.URL}>Link to document</a></ListGroupItem>:<br></br>}
                                    
                                </div>
                                <div class="col-3">
                                  
                                        <ListGroupItem>{answer.score} Votes</ListGroupItem>
                                        <Button variant = "success" onClick={()=>handleUpvote(answer.answerID)}><FaArrowAltCircleUp/></Button> 
                                            
                                        <Button variant = "danger"  onClick={()=>handleDownvote(answer.answerID)}><FaArrowAltCircleDown/></Button> 
                                    
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </Card>
                        
                        </>
                        )
                        )}
                        </ListGroup>
                 
             
                </>
          
        )
    }

    const handleChoseYear = e => 
    {
        e.preventDefault()
        navigate("/paper?module="+e.target.getAttribute('value'))
    }

    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }

    useEffect(() => {
        getData();
        
      }, []);
      
    return (
        <>
          <NavbarPaper/>
          
            <div class="mainContent">
                <div class="titlePaper">Answers for: <a href={URL}>{paper}</a></div>
                
                {paperCard}
                
                <div class = "addSubmissionArea">
                    <Button onClick = {toggleShowAddSubmission}>+ Add a submission</Button>

                    {(showAddSubmission) ? <AddSubmission value={[paper,currentUserData]}/>:<br></br>}
                </div>

                

            </div>
   
          
           

            
        
        </>
        
    )
}