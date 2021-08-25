import { List, ListItem } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";

interface Props{
    activities: Activity[]
}

function Activities({activities}:Props){
    return(
        <div>
            {activities.length>0?<List>
                {activities.map(act=>(
                    <ListItem>{act.title}</ListItem>
                ))}
            </List>:<h4>No activities present</h4>
            }
        </div>
    )
}
export default Activities;