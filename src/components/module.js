import React,  { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import { doc, getDocs, query, collection, } from "firebase/firestore";
import {db, auth} from '../firebase'



export default function Module(props) {
    const search = useLocation().search;
    const module_ = new URLSearchParams(search).get('module');
    
    const [data, setData] = useState("")
    const [modules, setModules] = useState(<h1>Loading</h1>)
/*
    async function getData()
    {
        const q = query(collection(db, "Modules"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id + " " + doc.data());
            dataArr.push(doc.data())
        })
        const docRef = doc(db, "Users", module_);
        getDoc(docRef)
          .then((data) => {
            if (!data.data())
            {
                
            }
            
             
    });
        console.log("dataArr:")
        console.log(dataArr)
        generateModules(dataArr)
        
        
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());

    }

    function generateModules(dataArr)
    {
        setModules(
   
                <>
                <h1>Modules</h1>
                <select>
                {dataArr.map((module) => (
                    <option value={module.ModuleID}>{module.ModuleID}</option>
                )
                )}
                </select>
                </>
          
        )
        console.log("stored ")
    }

    useEffect(() => {
        getData();
        
      }, []);
      */
    return (
        <>
            {module}
        </>
        
    )
}