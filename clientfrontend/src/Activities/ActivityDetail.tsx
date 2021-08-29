import { Card, Label } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import './ActivityDetail.css'
interface Props {
    activityDetail: Activity
}

export default function ActivityDetail({activityDetail}: Props) {
    return (
        <Card>
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
                <Label>{activityDetail.category}</Label>
            </Card.Content>
        </Card>
    )
}