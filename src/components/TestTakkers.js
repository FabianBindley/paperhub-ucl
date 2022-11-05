import React,  { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestTakkers() {
    fetch("https://uclapi.com/timetable/data/departments?token=uclapi-3d65f6b03a6c422-7f8fb188a8eecf8-7a29d5e5be4c716-302b6d9da3b36a5re", {mode: 'cors'})
        .then(response => response.json())//{
        .then(data => console.log(data));
       // json = response.json
        //console.log(json)
    //})
    //.then(function(response) {
      //  console.log(response)
    //})

    //let f = await fetch("https://uclapi.com/timetable/data/departments?token=uclapi-3d65f6b03a6c422-7f8fb188a8eecf8-7a29d5e5be4c716-302b6d9da3b36a5re")
    //var React = require('react');
    //var ReactDOMServer = require('react-dom/server');

    //var a = ReactDOMServer.renderToString(React.createElement('f',null,'Element rendered from Server'));

    //console.log(a);
    //.then((response) => {
	     //return response.json() 
      //  console.log(response)
    //})
    //.then((json) => {
	  //   console.log(json);
    //})
}
/*
export async function TestTakkers2(dept) {
    fetch("https://uclapi.com/timetable/data/courses?token=uclapi-3d65f6b03a6c422-7f8fb188a8eecf8-7a29d5e5be4c716-302b6d9da3b36a5&department="+dept)
    .then((response) => {
	     //return response.json() 
         console.log(response)
    })
    //.then((json) => {
	  //   console.log(json);
    //})
}
*/