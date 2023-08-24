import React ,{ useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import logout from "./containers/logout/logout";
import * as actions from './store/actions/index';

const Checkout= React.lazy(() =>{ // Applying Lazy Loading to components 
  return import('./containers/Checkout/Checkout');
});
const Orders= React.lazy(() =>{
  return import('./containers/Orders/Orders');
});
const Auth= React.lazy(() =>{
  return import('./containers/Auth/Auth');
});

const App = props => {
  const { onTryAutoSignup } = props;
  useEffect(() =>{
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  //Guarding Routes
    let routes=( //for Unauthenticated Users
      <Switch>
        <Route path="/auth" render={(props)=> <Auth {...props}/>}/>
        <Route path="/"  exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>

    );

    if(props.isAuthenticated){ 
      routes=( //for Authenticated Users
      <Switch>
          <Route path="/checkout" render={(props)=> <Checkout {...props}/>}/>
          <Route path="/orders" render={(props)=> <Orders {...props}/>}/>
          <Route path="/auth" render={(props)=> <Auth {...props}/>}/>
          <Route path="/logout" component={logout}/>
          <Route path="/"  exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>

        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>

      </div>
    );

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
