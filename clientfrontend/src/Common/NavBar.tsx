import { Button, Menu, MenuItem } from "semantic-ui-react";

export function NavBar() {
    return (
        <Menu inverted fixed="top">
            <MenuItem>
                <img src="assets/logo.png" alt="logo"></img>
            </MenuItem>
            <MenuItem name="Activities"></MenuItem>
            <MenuItem>
                <Button positive>Create Activity</Button>
            </MenuItem>
        </Menu>
    );

}