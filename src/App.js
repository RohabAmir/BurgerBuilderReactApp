import React ,{ Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Orders from "./containers/Orders/Orders";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import logout from "./containers/logout/logout";
import * as actions from './store/actions/index';

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    return (
      <div>

        <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={logout}/>
          <Route path="/"  exact component={BurgerBuilder}/>
        </Switch>
        </Layout>

      </div>
    );

  }

}
const mapToDispatchProps= dispatch =>{
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null,mapToDispatchProps)(App));
