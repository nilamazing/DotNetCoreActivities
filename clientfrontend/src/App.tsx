import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Activities from './Activities/Activities';
import './App.css';
import { Container, Header } from 'semantic-ui-react';
import { Activity } from './Entities/Activity';
import { NavBar } from './Common/NavBar';
import ActivityDashboard from './Activities/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(resp => {
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
      <NavBar></NavBar>
      <Container style={{marginTop: '7em'}}></Container>
      <ActivityDashboard activities={activities} />
    </div>
  );
}

export default App;
