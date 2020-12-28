import React from 'react'
import {connect} from 'react-redux'

import '../css/CurrentGameStats.css'


class CurrentGameStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tricks_won_NS: this.props.tricks_won_NS,
      tricks_won_EW: this.props.tricks_won_EW,
    }
  }

  render() {
    return (
      <div className="current-game-stats">
        {this.props.tricks_won_NS}
        {this.props.tricks_won_EW}
        {this.props.contract.declarer}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
  }
}
export default connect(mapStateToProps)(CurrentGameStats);
