import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../components/Header'

import '../css/Style.css'
import '../css/TablesScreen.css'

import {GAMETYPES} from '../constants/GameEngine'


class TablesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }

  componentDidMount() {
    // upon getting tables to join info
    this.props.mySocket.on("tables info", (info) => {
      this.setState({info: info});
    });

    // get info on tables to join
    this.requestTablesInfo();
  }

  requestTablesInfo() {
    this.props.mySocket.emit("request tables info");
  }

  joinRoom(room) {
    this.props.mySocket.emit("join room request", room, this.props.first_name);
  }

  render() {
    let tables = [];
    for (let room in this.state.info) {
      tables.push(
          <Link to={{
            pathname: "/game",
            state: {type: GAMETYPES.ONLINE},
          }} className="join-table"
             onClick={this.joinRoom.bind(this, room)}
             key={room}
          >
          <div className="join-table-text">
            {`${room}: ${this.state.info[room]} users`}
          </div>
        </Link>
      );
    }

    return (
      <div>
        <Header/>
        <div className="join-table-wrapper">
          {tables}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(TablesScreen);
