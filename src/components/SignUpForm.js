import React from 'react'

import {Firebase} from '../Firebase'

import '../css/Style.css'
import '../css/Form.css'


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

    // check if username exists
    Firebase.database().ref(`/usernames/${this.state.username}`).once('value')

    .then((snapshot) => {
      if (snapshot.val()) {
        throw new Error(
          `${this.state.username} is already being used. Please choose another username!`
        );
      }
    })

    .then(() => {
      return Firebase.auth().createUserWithEmailAndPassword(
        this.state.email, this.state.password
      );
    })

    .then((userCredentials) => {
      const userData = userCredentials.user;
      userData.updateProfile({
        email: this.state.email,
      });
      this.props.initializeFirebaseUser(
        userData.uid, this.state.username, this.state.name
      );
      return userData.uid;
    })

    .then((uid) => {this.props.onFormSuccess(uid);})

    .catch((error) => {alert(error)});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="email" type="email" value={this.state.email || ""}
               onChange={this.handleFormChange}
               placeholder="Email"
               required
        />
        <input name="username" type="text" value={this.state.username || ""}
               onChange={this.handleFormChange}
               placeholder="Username: characters A-Z and digits 0-9"
               minLength="5"
               maxLength="18"
               pattern="[A-Za-z0-9]*"
               required
        />
        <input name="name" type="text" value={this.state.name || ""}
               onChange={this.handleFormChange}
               placeholder="Name"
               required
        />
        <input name="password" type="password" value={this.state.password || ""}
               onChange={this.handleFormChange}
               placeholder="Password"
               minLength="8"
               required
        />
        <div className="form-space"/>
        <input type="submit" className="clicky-button" value="Sign Up" />
      </form>
    )
  }
}
