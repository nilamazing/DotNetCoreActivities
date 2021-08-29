import { useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import Activities from "./Activities";
import ActivityDetail from "./ActivityDetail";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
    const [activity, setActivity] = useState<Activity>(null as any);

    function activityItemClicked(itemId: string) {
        console.log("Logging Activity Id");
        console.log(itemId);
        let activitiesMatched: Activity[] = activities.filter((act) => {
            return act.id === itemId;
        })
        if (activitiesMatched && activitiesMatched.length > 0) {
            setActivity(activitiesMatched[0]);
        }
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={9}>
                    <Activities onActivityClicked={activityItemClicked} activities={activities}></Activities>
                </Grid.Column>
                <Grid.Column width={3}>
                    {activity !== null && <ActivityDetail activityDetail={activity}></ActivityDetail>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}