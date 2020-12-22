import React from 'react'
import {connect} from 'react-redux';

import Firebase from '../Firebase';

import '../css/Style.css';

class SignUpForm extends React.Component {
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
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password
    ).then((userCredentials) => {

      const userData = userCredentials.user;
      userData.updateProfile({
        displayName: `${this.state.first_name} ${this.state.last_name}`,
        email: this.state.email,
      });

      const userDetailsPath = '/users/' + userData.uid + '/details';
      Firebase.database().ref(userDetailsPath).set({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      });

      const userStatsPath = '/users/' + userData.uid + '/stats';
      Firebase.database().ref(userStatsPath).set({
        coins: 0,
        exp: 0,
        level_idx: 0,
      });

      const userStoreDataPath = '/users/' + userData.uid + '/store';
      Firebase.database().ref(`${userStoreDataPath}/active`).set({
        cardback: "red card",
        character: "Gespade",
        table: "classic table",
      });
      Firebase.database().ref(`${userStoreDataPath}/owned`).set({
        cardbacks: ["red card"],
        characters: ["Gespade"],
        tables: ["classic table"],
      });
      return userData.uid
    }).then((uid) => {
      this.props.onFormSuccess(uid);
    }).catch((error) => {alert(error)});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input name="email" type="email" value={this.state.email || ""}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101@gmail.com"
                 required
          />
        </label>
        <label>
          <abbr title="Only use characters A-Z and digits 0-9.">User Name:</abbr>
          <input name="username" type="text" value={this.state.username || ""}
                 onChange={this.handleFormChange}
                 placeholder="Ex: ericlou101"
                 minLength="5"
                 maxLength="18"
                 pattern="[A-Za-z0-9]*"
                 required
          />
        </label>
        <label>
          First Name:
          <input name="first_name" type="text" value={this.state.first_name || ""}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Eric"
                 pattern="[A-Za-z]*"
                 required
          />
        </label>
        <label>
          Last Name:
          <input name="last_name" type="text" value={this.state.last_name || ""}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Lou"
                 pattern="[A-Za-z]*"
                 required
          />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password || ""}
                 onChange={this.handleFormChange}
                 minLength="8"
                 required
          />
        </label>

        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

export default connect()(SignUpForm);
