import React from 'react'

import Firebase from '../Firebase';

import '../css/Style.css';

export default class SignUpForm extends React.Component {
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
    alert('A user was signed up: ' + this.state.username);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input name="email" type="email" value={this.state.email}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101@gmail.com"
                 required
          />
        </label>
        <label>
          <abbr title="Only use characters A-Z and digits 0-9.">User Name:</abbr>
          <input name="username" type="text" value={this.state.username}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101"
                 minlength="5"
                 maxlength="18"
                 pattern="[A-Za-z0-9]*"
                 required
          />
        </label>
        <label>
          First Name:
          <input name="firstname" type="text" value={this.state.firstname}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Eric"
                 pattern="[A-Za-z]*"
                 required
          />
        </label>
        <label>
          Last Name:
          <input name="lastname" type="text" value={this.state.lastname}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Lou"
                 pattern="[A-Za-z]*"
                 required
          />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password}
                 onChange={this.handleFormChange}
                 minlength="8"
                 required
          />
        </label>

        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}
