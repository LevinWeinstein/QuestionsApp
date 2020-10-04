import React, { useState, Component }  from 'react'
import { withFirebase } from '../Firebase'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import './UserPage.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


const UserPageForm = props => {

    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        if (input.length > 0) {

            setLoading(true);
            props.firebase.questions().push({
                question: input,
                user: props.match.params.username
            }).then(() => {
                setInput("");
                setLoading(false);
            })
        }
    }

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

    if (!user){
        return <p>User <strong>{email}</strong> Not Found</p>
    }

    return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicQuestion">
                        <Form.Label>Question</Form.Label>
                        <Form.Control type="text" value={input} onChange={event => setInput(event.target.value)} placeholder="Enter your question here" />
                        <Form.Text className="text-muted">
                            Ask a question to { email }!
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
    )
}

const UserPageList = props => {
    const [questions, setQuestions] = useState([]);
    props
      .firebase
      .questions()
      .orderByChild('user')
      .equalTo(props.match.params.username)
      .once('value', snapshot => {
          const data = snapshot.val();
          if (data != null && props.admin){
            const questionKeys = Object.keys(data)
                .map(key => <ListGroup.Item>{data[key].question}<EditButton {...props} id={key} data={data[key]} /> <DeleteButton {...props } id={key} /></ListGroup.Item>)
            setQuestions(questionKeys);
          } else if (data != null){
              const questionKeys = Object.keys(data)
                  .map(key => <ListGroup.Item>{data[key].question}</ListGroup.Item>)
              setQuestions(questionKeys);
          } else {
              setQuestions([]);
          }
      })

    return (<ListGroup>{ questions.reverse() }</ListGroup>)
}

const UserPage = props => {
    return (
        <div>
            <div className="outer">
                <UserPageForm {...props} />
            </div>
            <br />
            <br />
            <div className="outer">
                <UserPageList {...props} />
            </div>
        </div>
    )
}
const EditButton = props => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div>
            <button onClick={() => setModalShow(true)} type="button" class="close" aria-label="Close">
                <span aria-hidden="true">✎</span>
            </button>
        <Modal
            {...props}
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Question
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <EditForm {...props} hideModal={() => setModalShow(false)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

class EditFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editText: props.data.question,
            user: props.data.user
         }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.firebase.question(this.props.id).set({
            question: this.state.editText,
            user: this.props.data.user
        }).then(() => this.props.hideModal())
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <Form.Label htmlFor="editInput" srOnly>
                    Question to edit
                </Form.Label>
                <Form.Control
                    name="editText"
                    value={this.state.editText}
                    onChange={this.onChange}
                    className="mb-2 mr-sm-2"
                    id="editInput"
                    placeholder="Add a question here!"
                />
                <Button type="submit" className="mb-2">
                    Search
                </Button>
            </Form>
        )
    }
}

const EditForm = withFirebase(EditFormBase);
const DeleteButton = props => {
    const doDelete = () => {
        props
            .firebase
            .question(props.id)
            .remove()
            .then(() => {

            })
            .catch(error => {
                console.error("Error with remove:", error.message)
            })

    }
    return <button onClick={() => doDelete(props.id) } type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
}
export default withFirebase(UserPage);

const UserPageDisplay = withFirebase(UserPageList);
export { UserPageDisplay }