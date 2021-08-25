import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Activities from './Activities/Activities';
import './App.css';

function App() {
  const [activities,setActivities]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/activities").then(resp=>{
      console.log("Got activities response");
      if(resp){
        setActivities(resp.data);
      }
    }).catch(err=>{
      console.log("Encountered error while quierying activities");
      console.log(err);
    })
  },[]);
  return (
    <div>
      <header>
        <h3>Reactivities</h3>
        <Activities activities={activities} />
      </header>
    </div>
  );
}

export default App;
