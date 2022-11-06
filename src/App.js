import React from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import TestChaitu from "./components/TestChaitu";
import TestTakkers from "./components/TestTakkers";
import Dashboard from "./components/dashboard";
import CreateAccount from "./components/createaccount";
import SearchArea from "./components/searchArea";
import Module from "./components/module";
import TestCors from "./components/testcors"
import Paper from "./components/paper"

export default function App() {
  return (
    <>
      <Router>

          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/test" element={<TestChaitu/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/testtakkers" element={<TestTakkers/>}/>
            <Route exact path="/createacc" element={<CreateAccount/>}/>
            <Route exact path="/search" element={<SearchArea/>}/>
            <Route exact path="/module" element={<Module/>}/>
            <Route exact path="/testcors" element={<TestCors/>}/>
            <Route exact path="/paper" element={<Paper/>}/>
          </Routes>
       
      </Router>
    </>
  
  );
}