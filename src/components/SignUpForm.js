import React from 'react'
import {connect} from 'react-redux';

import Firebase from '../Firebase';
import {logIn} from '../redux/actions/Core';

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
        displayName: `${this.state.firstname} ${this.state.lastname}`,
        email: this.state.email,
      });

      const userDetailsPath = '/users/' + userData.uid + '/details';
      Firebase.database().ref(userDetailsPath).set({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      });

      const userStatsPath = '/users/' + userData.uid + '/stats';
      Firebase.database().ref(userStatsPath).set({
        coins: 0,
        level: "novice",
        exp: 0,
      });

      const userStoreDataPath = '/users/' + userData.uid + '/storedata';
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
      return userData
    }).then((userData) => {
      this.props.dispatch(logIn(userData.uid));
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
          <input name="firstname" type="text" value={this.state.firstname || ""}
                 onChange={this.handleFormChange}
                 placeholder="Ex: Eric"
                 pattern="[A-Za-z]*"
                 required
          />
        </label>
        <label>
          Last Name:
          <input name="lastname" type="text" value={this.state.lastname || ""}
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
