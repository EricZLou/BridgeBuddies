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
    this.requestTablesInfo = this.requestTablesInfo.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-cream');
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
      let table_div;
      if (this.state.info[room].num_users === 4) {
        table_div = <div className="table full-table" key={room}>
          <div className="table-name">{room}</div>
          <div className="table-num-users">
            {`FULL`}
          </div>
          <div className="table-activity">
            {`Status: ${this.state.info[room].game_state}`}
          </div>
        </div>
      } else {
        table_div = <Link to={{
          pathname: "/game",
          state: {type: GAMETYPES.ONLINE},
        }} className="table join-table"
           onClick={this.joinRoom.bind(this, room)}
           key={room}
        >
          <div className="table-name">{room}</div>
          <div className="table-num-users">
            {`Players: ${this.state.info[room].num_users}`}
          </div>
          <div className="table-activity">
            {`Status: ${this.state.info[room].game_state}`}
          </div>
        </Link>
      }
      tables.push(table_div);
    }

    return (
      <div>
        <Header/>
        <div className="body-width-cap-container"><div className="body-width-cap">
          <div className="title">Choose an Online Table</div>
          <button className="refresh" onClick={this.requestTablesInfo}>Refresh &#x27F3;</button>
          {tables}
        </div></div>
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
