import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import './Navigation.scss'
import { AuthUserContext } from '../Session'

const Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
)

const NavigationAuth = () => (
    <div className="Navigation">
        <ul className="NavigationList">
            <li className="NavigationItem">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li className="NavigationItem">
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li className="NavigationItem">
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li className="NavigationItem">
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li className="NavigationItem">
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li className="NavigationItem">
                <SignOutButton />
            </li>
        </ul>
    </div>
)

const NavigationNonAuth = () => (
    <div className="Navigation">
        <ul className="NavigationList">
            <li className="NavigationItem">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li className="NavigationItem">
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;