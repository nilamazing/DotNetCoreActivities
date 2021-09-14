import { observer } from "mobx-react-lite";
import { ItemGroup, Segment, Item, Label, Button } from "semantic-ui-react";
import ActivitiesAPI from "../api/agent";
import { Activity } from "../Entities/Activity";
import { useStore } from "../stores/store";
import './Activities.css';

// interface Props{
//     activities: Activity[];
//     onActivityClicked(activityId:string):void;
//     onActivityDeleted(activityId:string):void;
// }

function Activities(){
   const {activityStore}=useStore();

   function onCategoryDetailInitiated(activityClicked:Activity){
    console.log("In onCategoryDetailInitiated method");
    activityStore.setIsDisplayCreateForm(false);
    activityStore.setActivity(activityClicked);
    //props.onActivityClicked(activityId);
   }
   function onActivityDetailDeleted(activity:Activity){
       ActivitiesAPI.delete(activity.id).then(delResp=>{
        activityStore.deleteActivity(activity);
        //props.onActivityDeleted(activityId);
       }).catch(err=>{
           console.log("Error occured while deleting activity");
           console.log(err);
       })
    
  }
    return(
        <Segment>
            {activityStore.activities.length>0?<ItemGroup divided>
                {activityStore.activities.map(act=>(
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header>{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                <div>{act.city} {act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Label>{act.category}</Label>
                                <Button floated="right" content="View" color="blue" onClick={()=>onCategoryDetailInitiated(act)}></Button>
                                <Button floated="right" content="Delete" color="red" onClick={()=>onActivityDetailDeleted(act)}></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </ItemGroup>:<h4>No activities present</h4>
            }
        </Segment>
    )
}
export default observer(Activities);