import React from 'react';

import { withFirebase } from '../Firebase';
import './SignOut.css';

const SignOutButton = ({ firebase }) => (
  <span class="text" onClick={firebase.doSignOut}>Sign Out</span>
);

export default withFirebase(SignOutButton);
