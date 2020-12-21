import React from 'react'
import {connect} from 'react-redux';

import Firebase from '../Firebase';
import {logIn} from '../redux/actions/Core';

import '../css/Style.css';

class LogInForm extends React.Component {
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
    Firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password
    ).then((userCredentials) => {
      this.props.dispatch(logIn(userCredentials.user.uid));
    }).catch((error) => {alert(error)});
  };

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
          Password:
          <input name="password" type="password" value={this.state.password || ""}
                 onChange={this.handleFormChange}
                 required
          />
        </label>

        <input type="submit" value="Sign In" />
      </form>
    )
  }
}

export default connect()(LogInForm);
