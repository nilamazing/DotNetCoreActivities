import { useEffect, useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import Activities from "./Activities";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";

interface Props {
    activities: Activity[];
    createActivityMode: {state:boolean};
    deleteActvity(string):void;
}

export default function ActivityDashboard({ activities, createActivityMode, deleteActvity }: Props) {
    const [activity, setActivity] = useState<Activity>(null as any);
    const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false);
    const [activityList,setActivityList] = useState<Activity[]>(activities);
    function onActivityItemUpdationSucceeded(activityItem?:Activity){
        setIsDisplayForm(false);
        if(activityItem){
            setActivityList(prevList=>{
                return [activityItem,...prevList]
            })
        }
    }
    function setDisplayFormView(displayForm: boolean) {
        console.log("In setDisplayFormView");
        //createActivityMode=displayForm;
        setIsDisplayForm(displayForm);
    }

    function activityItemClicked(itemId: string) {
        let activitiesMatched: Activity[] = activityList.filter((act) => {
            return act.id === itemId;
        })
        if (activitiesMatched && activitiesMatched.length > 0) {
            setDisplayFormView(false);
            setActivity(activitiesMatched[0]);
        }
    }
   
    function activityItemDeleted(itemId: string) {
        console.log("Activity Deletion successful");
        deleteActvity(itemId);
    }
    
    function onActivityDetailUpdated(activityUpdated:Activity){
        setActivity(activityUpdated);
        setActivityList((prevState)=>{
           let index = prevState.findIndex(act=> act.id===activityUpdated.id);
           if(index > -1){
               prevState[index]=activityUpdated;
           }
           console.log(prevState);
           return [...prevState];
        })
    }
    useEffect(()=>{
        console.log("In ActivityDashboard useEffect");
        console.log(createActivityMode);
        setIsDisplayForm(createActivityMode.state);
        setActivityList(activities);
    },[createActivityMode,activities])
      return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={9}>
                    <Activities onActivityClicked={activityItemClicked} activities={activityList} onActivityDeleted={activityItemDeleted}></Activities>
                </Grid.Column>
                <Grid.Column width={3}>
                    {activity !== null && !isDisplayForm && <ActivityDetail activityDetailCancelled={() => setActivity(null as any)} activityDetail={activity} onActivityDetailUpdated={onActivityDetailUpdated}></ActivityDetail>}
                    {isDisplayForm && <ActivityForm activityDetail={undefined} cancelFormMode={setDisplayFormView} onActivityUpdated={onActivityItemUpdationSucceeded}/>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}