import React from 'react'

import '../css/Style.css';

export default class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    if (this.state.email.length < 5) return false;
    return true;
  }

  handleEmailChange(event) {

  }

  handleSubmit(event) {
    if (!this.validate()) {
      this.setState({invalid: true});
      return;
    }
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email}
                 onChange={this.handleEmailChange}
                 placeholder="Ex: ericlou101@gmail.com"
                 required
          />
        </label>
        <input type="submit" value="Submit" />
        {this.state.invalid && "Invalid login!"}
      </form>
    )
  }
}
