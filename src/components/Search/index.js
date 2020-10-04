import React, { Component } from 'react';

import './Search.css'
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const INITIAL_STATE = {
  searchTerm: ""
}
class AccountPage extends Component {

  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE }
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/user/${this.state.searchTerm}`)
  }

  render(){
    return (
      <div class="centerer">
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="searchInput" srOnly>
            Search Term
          </Form.Label>
          <Form.Control
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
            className="mb-2 mr-sm-2"
            id="searchInput"
            placeholder="Search for a user!"
          />
          <Button type="submit" className="mb-2">
            Search
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(AccountPage);
