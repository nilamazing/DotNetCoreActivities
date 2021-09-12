import { ChangeEvent, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import ActivitiesAPI from "../api/agent";
import { Activity } from "../Entities/Activity";
//import Activities from "./Activities";
import { v4 as uuid } from 'uuid';
import './ActivityForm.css';

interface Props {
    activityDetail: Activity | undefined;
    cancelFormMode(displayFormMode: Boolean): void;
    onActivityUpdated(activity: Activity): void;
}

export default function ActivityForm(props: Props) {
    const initialState = props.activityDetail ?? {
        id: '',
        category: '',
        city: '',
        date: '',
        description: '',
        title: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialState);

    function onActivityFieldChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setActivity({ ...activity, [event.target.name]: event.target.value });
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        // console.log("Listing Activity");
        // console.log(activity);
        if (activity.id != '') {
            // Edit Mode call Put
            ActivitiesAPI.edit(activity.id, activity).then(resp => {
                // console.log("Successful Edit Opeartion");
                // console.log(resp);
                props.onActivityUpdated(activity);
            }).catch(err => {
                console.log("Error calling Activity Edit Operation");
                console.log(err);
            })
        }
        else {
            //console.log(event.target.elements.title.value);
            // Create Mode API call
            let activityToCreate: Activity = {
                title: event.target.elements.title.value,
                city: event.target.elements.city.value,
                date: event.target.elements.date.value,
                description: event.target.elements.description.value,
                venue: event.target.elements.venue.value,
                category: event.target.elements.category.value,
                id: uuid()
            };
            ActivitiesAPI.create(activityToCreate).then(resp => {
                props.onActivityUpdated(activity);
            }).catch(err => {
                console.log("Error creating Activity");
                console.log(err);
            })

        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Activity Title</label>
                    <input name="title" value={activity.title} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Activity Date</label>
                    <input name="date" value={activity.date.toString()} type="date" onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Activity Description</label>
                    <textarea name="description" value={activity.description} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <input name="category" value={activity.category.toString()} type="text" onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input name="city" value={activity.city} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input name="venue" value={activity.venue} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Button.Group widths='2'>
                    <Button basic color="green" type="submit" content='Submit'></Button>
                    <Button color="red" floated="right" content="Cancel" onClick={() => props.cancelFormMode(false)} />
                </Button.Group>

            </Form>
        </div>
    );
}