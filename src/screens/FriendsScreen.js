import React from 'react'
import {connect} from 'react-redux'
import Firebase from '../Firebase'

import '../css/FriendsScreen.css'
import '../css/Style.css'


class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends_info: [],
    };
  }

  componentDidMount() {
    this.updateFriendsInfo();
  }
  componentDidUpdate(prevProps, prevState) {
    let good = true;
    if (prevProps.userFriends.length !== this.props.userFriends.length) good = false;
    if (prevProps.userFriendsLoggedIn.length !== this.props.userFriendsLoggedIn.length) good = false;
    if (prevState.friends_info.length !== this.state.friends_info.length) good = false;
    else {
      for (let i = 0; i < prevState.friends_info.length; i++) {
        if (prevState.friends_info[i].online !== this.state.friends_info[i].online) good = false;
      }
    }
    if (!good) this.updateFriendsInfo();
  }
  updateFriendsInfo() {
    const friends_promises = this.props.userFriends.map((uid) =>
      Firebase.database().ref(`/users/${uid}/details/username`).once('value')
      .then((snapshot) => {
        return snapshot.val()
      })
    );
    Promise.all(friends_promises).then((friends_usernames) => {
      let friends_info = [];
      for (let i = 0; i < friends_usernames.length; i++) {
        let uid = this.props.userFriends[i];
        let username = friends_usernames[i];
        let online = this.props.userFriendsLoggedIn.includes(uid);
        friends_info.push({username: username, online: online});
      }
      this.setState({friends_info: friends_info});
    });
  }

  render() {
    return (
      <div>{this.state.friends_info.map((info) =>
        <div className="friend-container" key={info.username}>
          <div className={`friend-activity ${info.online ? "online" : "offline"}`}/>
          <div className="friend-username">{info.username}</div>
        </div>
      )}</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    userFriends: state.userFriends,
    userFriendsLoggedIn: state.userFriendsLoggedIn,
  }
}
export default connect(mapStateToProps)(FriendsScreen);
