import { Activity } from "../Entities/Activity";

interface Props{
    activities: Activity[]
}

function Activities({activities}:Props){
    return(
        <div>
            {activities.length>0?<ul>
                {activities.map(act=>(
                    <li>{act.title}</li>
                ))}
            </ul>:<h4>No activities present</h4>
            }
        </div>
    )
}
export default Activities;