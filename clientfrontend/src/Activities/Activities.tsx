import { ItemGroup, Segment, Item, Label, Button } from "semantic-ui-react";
import ActivitiesAPI from "../api/agent";
import { Activity } from "../Entities/Activity";
import './Activities.css';

interface Props{
    activities: Activity[];
    onActivityClicked(activityId:string):void;
    onActivityDeleted(activityId:string):void;
}

function Activities(props:Props){
   function onCategoryDetailInitiated(activityId:string){
    console.log("In onCategoryDetailInitiated method");
    props.onActivityClicked(activityId);
   }
   function onActivityDetailDeleted(activityId:string){
       ActivitiesAPI.delete(activityId).then(delResp=>{
        props.onActivityDeleted(activityId);
       }).catch(err=>{
           console.log("Error occured while deleting activity");
           console.log(err);
       })
    
  }
    return(
        <Segment>
            {props.activities.length>0?<ItemGroup divided>
                {props.activities.map(act=>(
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
                                <Button floated="right" content="View" color="blue" onClick={()=>onCategoryDetailInitiated(act.id)}></Button>
                                <Button floated="right" content="Delete" color="red" onClick={()=>onActivityDetailDeleted(act.id)}></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </ItemGroup>:<h4>No activities present</h4>
            }
        </Segment>
    )
}
export default Activities;