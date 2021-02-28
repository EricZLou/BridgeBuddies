import React from 'react'

import Firebase from '../Firebase'

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
      return Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
    })

    .then((userCredentials) => {
      console.log(userCredentials);
      const userData = userCredentials.user;
      Firebase.database().ref("/usernames/").update({
        [this.state.username]: userData.uid,
      });
      userData.updateProfile({
        displayName: `${this.state.first_name} ${this.state.last_name}`,
        email: this.state.email,
      });
      const userDetailsPath = '/users/' + userData.uid + '/details';
      Firebase.database().ref(userDetailsPath).set({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
      });
      const userStatsPath = '/users/' + userData.uid + '/stats';
      Firebase.database().ref(userStatsPath).set({
        coins: 0,
        exp: 0,
        games_played: 0,
        level_idx: 0,
        total_exp: 0,
      });
      const userStoreDataPath = '/users/' + userData.uid + '/store';
      Firebase.database().ref(`${userStoreDataPath}/active`).set({
        cardbacks: "red card",
        characters: "Gespade",
        tables: "classic table",
      });
      Firebase.database().ref(`${userStoreDataPath}/owned`).set({
        cardbacks: ["red card"],
        characters: ["Gespade", "Hartley"],
        tables: ["classic table"],
      });

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
        <input name="first_name" type="text" value={this.state.first_name || ""}
               onChange={this.handleFormChange}
               placeholder="First Name"
               pattern="[A-Za-z]*"
               required
        />
        <input name="last_name" type="text" value={this.state.last_name || ""}
               onChange={this.handleFormChange}
               placeholder="Last Name (optional)"
               pattern="[A-Za-z]*"
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
