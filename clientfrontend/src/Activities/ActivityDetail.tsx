import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Card, Label, Image, ButtonGroup, Button } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import { useStore } from "../stores/store";
import './ActivityDetail.css';
import ActivityForm from "./ActivityForm";

// interface Props {
//     activityDetail: Activity
//     activityDetailCancelled():void;
//     onActivityDetailUpdated(activity:Activity):void;
// }

function ActivityDetail() {
    //const [isDisplayForm, setIsDisplayForm] = useState<Boolean>(false);
    //const [activity, setActivity] = useState<Activity>(activityDetail);
    const {activityStore} = useStore();
    function onActivityItemUpdationSucceeded(activityUpdated:Activity){
        activityStore.setIsDisplayCreateForm(false);
        activityStore.setActivity(activityUpdated);
        //onActivityDetailUpdated(activityUpdated);
    }
    function setDisplayFormView(displayForm: boolean) {
        activityStore.setIsDisplayCreateForm(displayForm);
    }

    return (
        <div>
            {!activityStore.isDisplayCreateForm?
            <Card fluid>
                <Image src={`/assets/categoryImages/${activityStore.activity.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activityStore.activity.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activityStore.activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>{activityStore.activity.description}</div>
                        <div>{activityStore.activity.city} {activityStore.activity.venue}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button basic color="blue" content='Edit' onClick={() => activityStore.setIsDisplayCreateForm(true)}></Button>
                        <Button basic color="grey" content='Cancel' onClick={() => activityStore.setActivity(null)}></Button>
                    </Button.Group>
                </Card.Content>
            </Card>:
            // <ActivityForm cancelFormMode={setDisplayFormView} activityDetail={activityStore.activity} onActivityUpdated={onActivityItemUpdationSucceeded}></ActivityForm>
            <ActivityForm></ActivityForm>
            }
        </div>
    )
}
export default observer(ActivityDetail);