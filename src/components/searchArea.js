import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {Form, Button, Input,  FloatingLabel, ButtonGroup, ListGroupItem, ListGroup} from 'react-bootstrap';

//import "../Styling/template.css";


import { GoSearch } from 'react-icons/go';


export default function LandingPage() {
  const [searchBarValue, setSearchBarValue] = useState("")
  const [recommendedListGroup, setRecommendedListGroup] = useState("")
  const [recommendedSelection, setRecommendedSelection] = useState("")

  const [returnedContent, setReturnedContent] = useState("")
  const [response, setResponse] = useState("")

  const navigate = useNavigate()

  const handleSearchBarValueChange = e => 
  {
    setSearchBarValue(e.target.value)
    console.log(e.target.value)
    fetchRecommendedSearchResults(e.target.value)
    
  }

  function fetchRecommendedSearchResults(searchBarValue) {
    if (searchBarValue == "")
    {
      setRecommendedListGroup("")
    }
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchBarValue}&origin=*&format=json&srlimit=8&srwhat=text`)
    .then(response => {
      console.log(response.data.query.search)
      updateRecommendedListGroup(response.data.query.search,searchBarValue)
    })
  }

  function clearListGroup()
  {
    setRecommendedListGroup("")
    setRecommendedSelection("")
    setSearchBarValue("")

    
  }



  function handleSubmitChoice()
  {
    console.log(searchBarValue)
    navigate("/module?module="+searchBarValue)
  }

  const handleSelectRecommended = e => 
  {
    e.preventDefault()
    clearListGroup()
    console.log(e.target.getAttribute('value'))
    navigate("/module?module="+e.target.getAttribute('value'))
  }


  function updateRecommendedListGroup(searchResults, searchBarValue)
  {


      setRecommendedListGroup(
        searchResults.map((result, index) => {
          if (index==searchResults.length-1) {
            return <ListGroupItem value = {result.title} id = "lastautocomplete" onClick={handleSelectRecommended}>{result.title}</ListGroupItem>;
          }
  
          return <ListGroupItem value = {result.title} onClick={handleSelectRecommended}>{result.title}</ListGroupItem>
        })

      )

 
  }



  return (
    <>
   

        <div class = "searchcontainer" >

            <Form>
                
                <Form.Group className="mb-3" controlId="CourseSearch">
                    <Form.Label>Course:</Form.Label>
                    <Form.Control value={searchBarValue} onChange={handleSearchBarValueChange} placeholder="Course ID" />
                </Form.Group>
               
            <Button variant="primary"  onClick={handleSubmitChoice} >Submit</Button> 
        </Form>

        <div class = "autocomplete">
            
            <ListGroup>
                {recommendedListGroup}
            </ListGroup>
            
    
              
              
            

        </div>
          
    </div>
       

        
    </>  
  )
}