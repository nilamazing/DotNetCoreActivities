import { Button, Menu, MenuItem } from "semantic-ui-react";

interface Props{
    enableCreateForm(createForm:Boolean):void;
}
export function NavBar({enableCreateForm}:Props) {
    return (
        <Menu inverted fixed="top">
            <MenuItem>
                <img src="assets/logo.png" alt="logo"></img>
            </MenuItem>
            <MenuItem name="Activities"></MenuItem>
            <MenuItem>
                <Button positive content="Create Activity" onClick={()=>enableCreateForm(true)}></Button>
            </MenuItem>
        </Menu>
    );

}