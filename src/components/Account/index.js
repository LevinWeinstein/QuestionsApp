import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import './Account.css'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="centerer">
        <div className="protector">
          <h1>Account</h1>
          {authUser.email}
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
