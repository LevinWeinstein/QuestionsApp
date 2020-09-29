import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext } from '../Session'
const AccountPage = () => (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <AccountPageLoggedIn /> : <AccountPageLoggedOut />
      }
    </AuthUserContext.Consumer>
)

const AccountPageLoggedIn = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

const AccountPageLoggedOut = () => (
    <div>
        <h1>Must be logged in to modify your account!</h1>
    </div>
)



export default AccountPage;