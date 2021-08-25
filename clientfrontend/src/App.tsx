import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Activities from './Activities/Activities';
import './App.css';
import { Header } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(resp => {
      console.log("Got activities response");
      if (resp) {
        setActivities(resp.data);
      }
    }).catch(err => {
      console.log("Encountered error while quierying activities");
      console.log(err);
    })
  }, []);
  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      
      <Activities activities={activities} />
    </div>
  );
}

export default App;
