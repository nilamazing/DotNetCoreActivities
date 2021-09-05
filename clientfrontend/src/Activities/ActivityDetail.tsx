import { useEffect, useState } from "react";
import { Card, Label, Image, ButtonGroup, Button } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import './ActivityDetail.css';
import ActivityForm from "./ActivityForm";

interface Props {
    activityDetail: Activity
    activityDetailCancelled():void;
}

export default function ActivityDetail({ activityDetail,activityDetailCancelled}: Props) {
    const [isDisplayForm, setIsDisplayForm] = useState<Boolean>(false);

    function setDisplayFormView(displayForm: Boolean) {
        setIsDisplayForm(displayForm);
    }

    return (
        <div>
            {!isDisplayForm?
            <Card fluid>
                <Image src={`/assets/categoryImages/${activityDetail.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activityDetail.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activityDetail.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>{activityDetail.description}</div>
                        <div>{activityDetail.city} {activityDetail.venue}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button basic color="blue" content='Edit' onClick={() => setDisplayFormView(true)}></Button>
                        <Button basic color="grey" content='Cancel' onClick={() => activityDetailCancelled()}></Button>
                    </Button.Group>
                </Card.Content>
            </Card>:
            <ActivityForm cancelFormMode={setDisplayFormView} activityDetail={activityDetail}></ActivityForm>
            }
        </div>
    )
}