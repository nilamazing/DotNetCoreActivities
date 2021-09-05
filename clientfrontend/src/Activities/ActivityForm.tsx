import { ChangeEvent, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Activity } from "../Entities/Activity";
import './ActivityForm.css';

interface Props {
    activityDetail: Activity | undefined;
    cancelFormMode(displayFormMode: Boolean): void;
}

export default function ActivityForm(props: Props) {
    const initialState=props.activityDetail ?? {
        id: '',
        category: '',
        city: '',
        date: '',
        description: '',
        title: '',
        venue: ''
    }
    const [activity,setActivity]=useState(initialState);

    function onActivityFieldChanged(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setActivity({...activity, [event.target.name]:event.target.value});
    }

    function handleSubmit(){
        console.log("Listing Activity");
        console.log(activity);
    }

    return (
        <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Activity Title</label>
                        <input name="title" value={activity.title}  onChange={onActivityFieldChanged} />
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
                        <label>City</label>
                        <input name="city" value={activity.city} onChange={onActivityFieldChanged} />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" value={activity.venue} onChange={onActivityFieldChanged}/>
                    </Form.Field>
                    <Button.Group widths='2'>
                        <Button basic color="green" type="submit" content='Submit'></Button>
                        <Button color="red" floated="right" content="Cancel" onClick={() => props.cancelFormMode(false)} />
                    </Button.Group>

                </Form>
        </div>
    );
}