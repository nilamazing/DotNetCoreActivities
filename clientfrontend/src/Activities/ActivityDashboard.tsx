import { create } from "domain";
import { useEffect, useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import Activities from "./Activities";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";

interface Props {
    activities: Activity[];
    createActivityMode: {state:boolean};
}

export default function ActivityDashboard({ activities, createActivityMode }: Props) {
    const [activity, setActivity] = useState<Activity>(null as any);
    const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false);


    function setDisplayFormView(displayForm: boolean) {
        console.log("In setDisplayFormView");
        //createActivityMode=displayForm;
        setIsDisplayForm(displayForm);
    }

    function activityItemClicked(itemId: string) {
        let activitiesMatched: Activity[] = activities.filter((act) => {
            return act.id === itemId;
        })
        if (activitiesMatched && activitiesMatched.length > 0) {
            setDisplayFormView(false);
            setActivity(activitiesMatched[0]);
        }
    }


    useEffect(()=>{
        console.log("In ActivityDashboard useEffect");
        console.log(createActivityMode);
        setIsDisplayForm(createActivityMode.state);
    },[createActivityMode])
      return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={9}>
                    <Activities onActivityClicked={activityItemClicked} activities={activities}></Activities>
                </Grid.Column>
                <Grid.Column width={3}>
                    {activity !== null && !isDisplayForm && <ActivityDetail activityDetailCancelled={() => setActivity(null as any)} activityDetail={activity}></ActivityDetail>}
                    {isDisplayForm && <ActivityForm activityDetail={undefined} cancelFormMode={setDisplayFormView} />}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}