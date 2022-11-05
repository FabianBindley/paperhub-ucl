import { doc, getDocs, query, collection, } from "firebase/firestore";
import {db, auth} from '../firebase'
import React,  { useEffect, useState } from 'react';


export default function TestChaitu() {
    const [data, setData] = useState("")
    const [modules, setModules] = useState(<h1>Loading</h1>)

    async function getData()
    {
        const q = query(collection(db, "Modules"));
        var dataArr = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id + " " + doc.data());
            dataArr.push(doc.data())
        })
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
    

    let posts = [
        {
            title: "Blank",
            score: 4,
            user: "Chaitu",
        },
        {
            title: "Blank",
            score: 5,
            user: "Takuya",
        },
        {
            title: "Blank",
            score: 6,
            user: "Fabian",
        },
    ];
    return (
        <>
            {modules}
        </>
        
    )
}

