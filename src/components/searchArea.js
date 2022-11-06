import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signInWithRedirect ,signInWithPopup,  GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import {db, auth} from '../firebase'
import {collection, addDoc, Timestamp, doc, getDoc} from 'firebase/firestore'
import {Form, Button, Input,  FloatingLabel, ButtonGroup, ListGroupItem, ListGroup} from 'react-bootstrap';

import "../styling/search.css";


import { GoSearch } from 'react-icons/go';


export default function LandingPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allModulesArr, setAllModulesArr] = useState("")

  const [sorted, setSorted] = useState(false)

  const [searchBarValue, setSearchBarValue] = useState("")
  const [recommendedListGroup, setRecommendedListGroup] = useState("")
  const [recommendedSelection, setRecommendedSelection] = useState("")

  const [returnedContent, setReturnedContent] = useState("")
  const [response, setResponse] = useState("")

  const navigate = useNavigate()


  useEffect(() => {
    CheckLogin();
    getModules();
    
    
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
              navigate("/")
            }
            
             
          })
  }

  function getModules()
  {
    
    var modulesArr = []
    var departmentsArr = []

    //console.log(modulesArr)
    axios.get(`http://localhost:3001/departments`)
    .then(response => {
      var departments = response.data.departments
      departmentsArr = departmentsArr.concat(departments)
      //var departments = ["COMPS_ENG","ECONS_SHS"]
      for (let i = 0; i < departments.length; i++)
      {
        
        //Iterate over the departments, and for each one get the modules
        axios.get(`http://localhost:3001/modules?module=`+departments[i].department_id)
        .then(response => {
          var modules = response.data.modules
          //console.log(modules)
          var moduleKeys = Object.keys(response.data.modules)
          var moduleValues = Object.values(response.data.modules)
          
          
          for (let j = 0; j < moduleKeys.length; j++)
          {
            modulesArr.push({"module":moduleKeys[j], "information":moduleValues[j]})
          }
          //modulesArr = modulesArr.concat(moduleKeys)

          setAllModulesArr(modulesArr)

        })
        
        
        
      }
      
      

        

      
    })
    

    

    
    
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

  const handleSearchBarValueChange = e => 
  {
    setSearchBarValue(e.target.value.toUpperCase())
    //console.log(e.target.value)
    fetchRecommendedSearchResults(e.target.value)
    
  }

    


  function fetchRecommendedSearchResults(searchBarValue) {
    if (!sorted)
    {
      setAllModulesArr(allModulesArr.sort(GetSortOrder("module")))
      setSorted(true)
      
    }

    let searchResults = []
    //Array is sorted, could use some sort of binary search but im lazy
    for (let i = 0; i < allModulesArr.length; i++)
    {
      //console.log(allModulesArr[i].module)
      let mod= allModulesArr[i].module
      let info = allModulesArr[i].information
      
      if (mod.includes(searchBarValue.toUpperCase()))
      {
        //console.log(allModulesArr[i])
        searchResults.push(allModulesArr[i])
      }
    }
    searchResults = searchResults.slice(0, 10);
    searchResults = searchResults.sort(GetSortOrder("module"))
    updateRecommendedListGroup(searchResults, searchBarValue)
    

    

      //console.log(response.data.query.search)
      //updateRecommendedListGroup(response.data.query.search,searchBarValue)
    
  }

  function clearListGroup()
  {
    setRecommendedListGroup("")
    setRecommendedSelection("")
    setSearchBarValue("")

    
  }

  function showModules()
  {
    console.log(allModulesArr)
  }



  function handleSubmitChoice()
  {
    //console.log(searchBarValue)
    navigate("/module?module="+searchBarValue)
  }

  const handleSelectRecommended = e => 
  {
    e.preventDefault()
    clearListGroup()
    //console.log(e.target.getAttribute('value'))
    navigate("/module?module="+e.target.getAttribute('value'))
  }


  function updateRecommendedListGroup(searchResults, searchBarValue)
  {


      setRecommendedListGroup(
        <>
          <div class = "result">

          <ListGroup>
          <ul >
          {searchResults.map((result, index) => {
          if (index==searchResults.length-1) {
            return <><li value = {result.module} id = "lastautocomplete" onClick={handleSelectRecommended}>{result.module}</li></>;
          }
  
          return <><li value = {result.module} onClick={handleSelectRecommended}>{result.module}</li><hr/></>
        })}
          </ul>
          </ListGroup>


            
            


          </div>
        </>
        

      )

 
  }



  return (
    <>

        <div class = "searchContainer" >

          <Form onSubmit={handleSubmitChoice}>
                
                <Form.Group className="mb-3" controlId="CourseSearch">
                    <Form.Label>Please enter your module code, then click on your desired module below:</Form.Label>
                    <Form.Control value={searchBarValue} onChange={handleSearchBarValueChange} placeholder="EG: COMP0005" />
                </Form.Group>
               
          </Form>

        
        {recommendedListGroup}
          
    </div>

       

        
    </>  
  )
}