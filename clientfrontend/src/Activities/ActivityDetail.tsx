import { useEffect, useState } from "react";
import { Card, Label, Image, ButtonGroup, Button } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import './ActivityDetail.css';
import ActivityForm from "./ActivityForm";

interface Props {
    activityDetail: Activity
    activityDetailCancelled():void;
    onActivityDetailUpdated(activity:Activity):void;
}

export default function ActivityDetail({ activityDetail,activityDetailCancelled, onActivityDetailUpdated}: Props) {
    const [isDisplayForm, setIsDisplayForm] = useState<Boolean>(false);
    const [activity, setActivity] = useState<Activity>(activityDetail);

    function onActivityItemUpdationSucceeded(activityUpdated:Activity){
        setIsDisplayForm(false);
        setActivity(activityUpdated);
        onActivityDetailUpdated(activityUpdated);
    }
    function setDisplayFormView(displayForm: Boolean) {
        setIsDisplayForm(displayForm);
    }

    return (
        <div>
            {!isDisplayForm?
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>{activity.description}</div>
                        <div>{activity.city} {activity.venue}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button basic color="blue" content='Edit' onClick={() => setDisplayFormView(true)}></Button>
                        <Button basic color="grey" content='Cancel' onClick={() => activityDetailCancelled()}></Button>
                    </Button.Group>
                </Card.Content>
            </Card>:
            <ActivityForm cancelFormMode={setDisplayFormView} activityDetail={activity} onActivityUpdated={onActivityItemUpdationSucceeded}></ActivityForm>
            }
        </div>
    )
}