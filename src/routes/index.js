import React from 'react'
import { Router, Route, IndexRoute, NotFoundRoute, DefaultRoute, Redirect } from 'react-router'
// CoreLayout must not async
import CoreLayout from 'layouts/CoreLayout'
import Home from 'bundle?lazy!views/Home'
import Cashier from 'bundle?lazy!views/Cashier'
import Agreement from 'bundle?lazy!views/Agreement'
import CreateAccount from 'bundle?lazy!views/CreateAccount'
import AddCard from 'bundle?lazy!views/CreateAccount/AddCard'
import Verification from 'bundle?lazy!views/CreateAccount/Verification'
import ConfirmPassword from 'bundle?lazy!views/CreateAccount/ConfirmPassword'
import AloneAddCard from 'bundle?lazy!views/BindingCard/AddCard'
import AloneVerification from 'bundle?lazy!views/BindingCard/Verification'
import NotFound from 'bundle?lazy!views/NotFound'
import Fail from 'bundle?lazy!views/Home/fail'

const loadContainerAsync = bundle => (location, cb) => {
  bundle(component => {
    cb(null, component)
  })
}

export default class Routers extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <Router history={this.props.history}>
        <Route component={CoreLayout} path='/'>
          <IndexRoute getComponent={loadContainerAsync(Cashier)} />
          <Route path='/fuck' getComponent={loadContainerAsync(Home)} />
          <Route path='/fail' getComponent={loadContainerAsync(Fail)} />
          <Route path='/createAccount' getComponent={loadContainerAsync(CreateAccount)} />
          <Route path='/agreement' getComponent={loadContainerAsync(Agreement)} />
          <Route path='/createAccount/confirmPassword' getComponent={loadContainerAsync(ConfirmPassword)} />
          <Route path='/createAccount/addCard' getComponent={loadContainerAsync(AddCard)} />
          <Route path='/createAccount/verification' getComponent={loadContainerAsync(Verification)} />
          <Route path='/binding/addCard' getComponent={loadContainerAsync(AloneAddCard)} />
          <Route path='/binding/verification' getComponent={loadContainerAsync(AloneVerification)} />
          <Route path='/404' getComponent={loadContainerAsync(NotFound)} />
          <Route path='*' getComponent={loadContainerAsync(NotFound)} />
        </Route>
      </Router>
    )
  }
}
