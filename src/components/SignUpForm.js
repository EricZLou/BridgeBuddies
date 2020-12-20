import React from 'react'

import '../css/Style.css';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
          User Name:
          <input name="username" type="text" value={this.state.username}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101"
                 minlength="5"
                 maxlength="18"
                 required
          />
        </label>
        <label>
          First Name:
          <input name="firstname" type="text" value={this.state.firstname}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Eric"
                 required
          />
        </label>
        <label>
          Last Name:
          <input name="lastname" type="text" value={this.state.lastname}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Lou"
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

        <input type="submit" value="Submit" />
      </form>
    )
  }
}
