import { ChangeEvent, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import ActivitiesAPI from "../api/agent";
import { Activity } from "../Entities/Activity";
//import Activities from "./Activities";
import { v4 as uuid } from 'uuid';
import './ActivityForm.css';
import { useStore } from "../stores/store";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";

// interface Props {
//     activityDetail: Activity | undefined;
//     cancelFormMode(displayFormMode: Boolean): void;
//     onActivityUpdated(activity: Activity): void;
// }

function ActivityForm() {
    const {activityStore}=useStore();
    const initialState = activityStore.activity ?? {
        id: '',
        category: '',
        city: '',
        date: '',
        description: '',
        title: '',
        venue: ''
    }
    //const [activity, setActivity] = useState(initialState);

    function onActivityFieldChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //setActivity({ ...activity, [event.target.name]: event.target.value });
        let activity=activityStore.activity;
        if(!activity){
            activity=initialState;
        }
        activity[event.target.name]=event.target.value;
        activityStore.setActivity(activity);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        // console.log("Listing Activity");
        // console.log(activity);
        if (activityStore.activity.id != '') {
            // Edit Mode call Put
            ActivitiesAPI.edit(activityStore.activity.id, activityStore.activity).then(resp => {
                // console.log("Successful Edit Opeartion");
                // console.log(resp);
                //props.onActivityUpdated(activity);
                activityStore.setIsDisplayCreateForm(false);
                 //activityStore.setActivity(activityUpdated);
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
                //props.onActivityUpdated(activity);
                activityStore.appendActivity(activityToCreate);
                activityStore.setIsDisplayCreateForm(false);
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
                    <input name="title" value={activityStore.activity?activityStore.activity.title:''} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Activity Date</label>
                    <input name="date" value={activityStore.activity?activityStore.activity.date.toString():''} type="date" onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Activity Description</label>
                    <textarea name="description" value={activityStore.activity?activityStore.activity.description:''} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <input name="category" value={activityStore.activity?activityStore.activity.category.toString():''} type="text" onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input name="city" value={activityStore.activity?activityStore.activity.city:''} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input name="venue" value={activityStore.activity?activityStore.activity.venue:''} onChange={onActivityFieldChanged} />
                </Form.Field>
                <Button.Group widths='2'>
                    <Button basic color="green" type="submit" content='Submit'></Button>
                    <Button color="red" floated="right" content="Cancel" onClick={() => activityStore.setIsDisplayCreateForm(false)} />
                </Button.Group>

            </Form>
        </div>
    );
}

export default observer(ActivityForm);