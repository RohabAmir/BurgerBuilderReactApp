import React from "react";

import Logo from "../../logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';

const sideDrawer=(props) =>{
    //...
    return(
        <div className={classes.SideDrawer}>
            <Logo/>
            <nav>
                <NavigationItems />
            </nav>

        </div>
    );

};
export default  sideDrawer;