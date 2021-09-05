import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Container, Header } from 'semantic-ui-react';
import { Activity } from './Entities/Activity';
import { NavBar } from './Common/NavBar';
import ActivityDashboard from './Activities/ActivityDashboard';
import ActivitiesAPI from './api/agent';
import LoaderComponent from './Common/Loader';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isDisplayCreateForm, setIsDisplayCreateForm] = useState<{ state: boolean }>({ state: false });
  const [isLoading,setIsLoading]=useState(true);

  function enableCreateFormToggle(createForm: boolean) {
    setIsDisplayCreateForm({ state: createForm });
  }

  function deleteActivityItem(itemId: string) {
    setActivities(activities.filter(act => { return act.id !== itemId }));
  }

  useEffect(() => {
    ActivitiesAPI.list().then(resp => {
      setActivities(resp);
      setIsLoading(false);
    }).catch(err => {
      console.log("Encountered error while quierying activities");
      console.log(err);
    });
  }, []);
  return (
    <div>
      <NavBar enableCreateForm={enableCreateFormToggle}></NavBar>
      <Container style={{ marginTop: '7em' }}></Container>
      {isLoading?
        <LoaderComponent inverted={true} content={"Loading"} />:
        <ActivityDashboard activities={activities} createActivityMode={isDisplayCreateForm} deleteActvity={deleteActivityItem} />
      }
    </div>
  );
}

export default App;
