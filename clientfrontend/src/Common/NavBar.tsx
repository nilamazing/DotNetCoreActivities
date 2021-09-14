import { observer } from "mobx-react-lite";
import { Button, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";

function NavBar() {
    const {activityStore}=useStore();
    function initiateCreateForm(){
        activityStore.setIsDisplayCreateForm(true);
        activityStore.setActivity(null);
    }
    return (
        <Menu inverted fixed="top">
            <MenuItem>
                <img src="assets/logo.png" alt="logo"></img>
            </MenuItem>
            <MenuItem name="Activities"></MenuItem>
            <MenuItem>
                <Button positive content="Create Activity" onClick={initiateCreateForm}></Button>
            </MenuItem>
        </Menu>
    );
}

export default observer(NavBar);