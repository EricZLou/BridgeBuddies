import React from 'react'

import Firebase from '../Firebase'

import '../css/Style.css'
import '../css/Form.css'


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
    Firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        this.props.onFormSuccess(uid);
      }).catch((error) => {alert(error)});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="email" type="email" value={this.state.email || ""}
               onChange={this.handleFormChange}
               placeholder="Email"
               required
        />
        <input name="password" type="password" value={this.state.password || ""}
               onChange={this.handleFormChange}
               placeholder="Password"
               required
        />
        <div className="form-space"/>
        <input type="submit" className="clicky-button" value="LOG IN" />
      </form>
    )
  }
}
