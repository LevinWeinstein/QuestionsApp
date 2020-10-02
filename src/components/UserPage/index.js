import React, { useState, Component }  from 'react'
import Firebase, { withFirebase } from '../Firebase'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { withAuthorization } from '../Session'
import './UserPage.css';

class QuestionForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            question: ''
        }
    }
}

const TestComponentInner = props => {

    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const email = props.match.params.username;
    props.firebase
      .users()
      .orderByChild('email')
      .equalTo(email)
      .once('value', snapshot => {
          console.log(snapshot);
          if (snapshot.exists()){
              setUser(true);
          } else {
              setUser(false)
          }
          setLoading(false);
      })

    if (loading){
        return <Spinner animation="border"/>
    }
    return <h3>UserId: {email} Found: {  `${user}` } </h3>
}

const TestComponent = props => {
    return (
        <div class="outer">
            <div class="box">
                <TestComponentInner {...props} />
            </div>
        </div>
    )
}

export default withFirebase(TestComponent);