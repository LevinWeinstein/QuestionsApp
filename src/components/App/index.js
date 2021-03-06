import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../MyQuestions';
import AccountPage from '../Search';
import AdminPage from '../Admin';
import TestParams from '../UserPage'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './App.css'

const App = () => (
  <Router>
    <div className="wholeApp">
      <Navigation />

      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.USER_PAGE} component={TestParams} />
    </div>
  </Router>
);

export default withAuthentication(App);
