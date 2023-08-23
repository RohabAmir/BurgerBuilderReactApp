import React ,{ Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import logout from "./containers/logout/logout";
import * as actions from './store/actions/index';

const asynCheckout= asyncComponent(() =>{ // Applying Lazy Loading to components 
  return import('./containers/Checkout/Checkout');
});
const asynOrders= asyncComponent(() =>{
  return import('./containers/Orders/Orders');
});
const asynAuth= asyncComponent(() =>{
  return import('./containers/Auth/Auth');
});

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){ //Guarding Routes
    let routes=( //for Unauthenticated Users
      <Switch>
        <Route path="/auth" component={asynAuth}/>
        <Route path="/"  exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>

    );

    if(this.props.isAuthenticated){ 
      routes=( //for Authenticated Users
      <Switch>
          <Route path="/checkout" component={asynCheckout}/>
          <Route path="/orders" component={asynOrders}/>
          <Route path="/auth" component={asynAuth}/>
          <Route path="/logout" component={logout}/>
          <Route path="/"  exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );

    }
    return (
      <div>

        <Layout>
          {routes}
        </Layout>

      </div>
    );

  }

}
const mapstateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null

  };
};
const mapToDispatchProps= dispatch =>{
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapstateToProps,mapToDispatchProps)(App));
