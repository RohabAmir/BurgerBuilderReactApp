import React,{ Component } from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component { 
    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler= () =>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{ //when state depending on a previous state 
            return { showSideDrawer: !prevState.showSideDrawer}

        });

    }


    render() {
        return(
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticate}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticate}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    } 
};
const mapStateToProps=state =>{
    return{
        isAuthenticate: state.auth.token !== null 
    }
}


export default connect (mapStateToProps,null)(Layout);