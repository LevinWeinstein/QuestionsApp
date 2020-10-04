import React from 'react';

import { withAuthorization } from '../Session';
import { UserPageDisplay } from '../UserPage'
import  { withFirebase } from '../Firebase'
import './MyQuestions.css'

const HomePage = props => {

  const match = {
    params: {
      username: props.authUser.email
    }
  }

  /*
  const [token, setToken] = useState("");
  const result = props
    .firebase
    .auth
    .currentUser
    ?.getIdToken(true)
    .then(newToken => {
      setToken(newToken)
    })
    .catch(error => {
      console.log(error.message)
    })
  */

  //     <h1>Token: {token}</h1>

  return (
  <div>
    <div className="center">
      <div className="case">
        <h1>{} Questions</h1>
        <p>Questions I still have to answer</p>
        <UserPageDisplay match={match} admin={true} />
      </div>
    </div>
  </div>
  )
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(HomePage));
