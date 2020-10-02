import React from 'react';

import { withAuthorization } from '../Session';
import './Home.css'
const HomePage = () => (
  <div className="centerer">
    <div className="case">
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
