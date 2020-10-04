import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './SignIn.css'

const SignInPage = () => (
  <div className="outerWrapper">
    <div className="innerPart">
      <SignInGoogle />
    </div>
  </div>
);

/*
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
*/

class SignInGoogleBase extends Component {
  constructor(props){
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(() => {
        this.setState({ error: null});
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault();
  }

  render() { 

    return (
      <form>
          <img className="googleButton" src={require('../../assets/login.png')} alt="Sign In With Google" onClick={this.onSubmit}/>
      </form>
    )
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase)

export default SignInPage;

export { /*SignInForm, */SignInGoogle };
