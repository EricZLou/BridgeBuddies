import React from 'react'

import Firebase from '../Firebase';

import '../css/Style.css';

export default class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A log in was submitted: ' + this.state.username);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={this.state.username}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101"
                 required
          />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password}
                 onChange={this.handleFormChange}
                 required
          />
        </label>

        <input type="submit" value="Sign In" />
      </form>
    )
  }
}
