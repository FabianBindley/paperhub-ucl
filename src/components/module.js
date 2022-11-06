import React,  { useEffect, useState } from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";
import { doc, getDoc, query, collection, } from "firebase/firestore";
import {db, auth} from '../firebase'
import NavbarPaper from './NavbarPaper'
import { Card, ListGroupItem , ListGroup, Button} from 'react-bootstrap';

import "../styling/module.css";

export default function Module(props) {
    const search = useLocation().search;
    const module = new URLSearchParams(search).get('module');

    const navigate = useNavigate();

    
    const [data, setData] = useState("")
    const [moduleCard, setModuleCard] = useState(<h1>Loading</h1>)

    async function getData()
    {

        const docRef = doc(db, "Modules", module);
        getDoc(docRef)
          .then((data) => {
            console.log(data.data())
            if (!data.data())
            {
                noDataAvailable()
            }
            else{
                generateModuleCard(data.data())
            }
        })
            
             


    }

    function noDataAvailable()
    {
        setModuleCard(
            <div class = "cardStyle noDataCard">
            <Card border="danger">
                <Card.Title>Unfortunately we don't have any past papers loaded for {module}.</Card.Title>
                <ListGroupItem>Please try again soon!</ListGroupItem>
                <ListGroupItem><Link to="/dashboard"><Button variant="secondary" size="sm">Go Back</Button></Link></ListGroupItem>
                <br/>
            </Card>
            </div>
            
      
    )
    }

    function generateModuleCard(dataArr)
    {
        console.log(dataArr.years)

        setModuleCard(
   
                <>
                <div class="paperList">
                <Card border="success">
                    <Card.Header>{module}</Card.Header>
                    <Card.Body>
                    <Card.Title>Past Papers for {module}</Card.Title>
                        <ul>
                        {dataArr.years.sort().map((year) => (
                        <li value={year} onClick={handleChoseYear}>{year}</li>
                        )
                        )}
                        </ul>
                    </Card.Body>
                </Card>
                </div>
                </>
          
        )
        console.log("stored ")
    }

    const handleChoseYear = e => 
    {
        e.preventDefault()
        let result = e.target.getAttribute('value')
        let year = result.substring(0, 4);
        let paperNum = result.slice(4);
        navigate("/paper?paper="+year+module+paperNum)
    }

    useEffect(() => {
        getData();
        
      }, []);
      
    return (
        <>
          <NavbarPaper/>
          <div class = "body">
            <div class="mainContent">

                {moduleCard}

            </div>
          </div>
          
           

            
        
        </>
        
    )
}