import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './Navigation.css'
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul className="navBar">
    <li className="logo"><Link to={ROUTES.HOME}>Questions</Link></li>
    <li>
      <SignOutButton />
    </li>
    <li>
      <Link to={ROUTES.HOME}>Questions</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Search</Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}

  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navBar">
    <li className="logo"><Link to={ROUTES.SIGN_IN}>Questions</Link></li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Search</Link>
    </li>
  </ul>
);

export default Navigation;
