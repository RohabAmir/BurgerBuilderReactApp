import React,{useState} from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
    const[sideDrawerIsVisible, setSideDrawerIsVisible]=useState(false)

    const sideDrawerClosedHandler= () =>{
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler=()=>{
        setSideDrawerIsVisible(!sideDrawerIsVisible); //when state depends on previous state

    }
    return(
            <Aux>
                <Toolbar 
                    isAuth={props.isAuthenticate}
                    drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuthenticate}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
    )
}; 
const mapStateToProps=state =>{
    return{
        isAuthenticate: state.auth.token !== null 
    }
}


export default connect (mapStateToProps,null)(Layout);