import React from 'react'
import {connect} from 'react-redux'

import '../css/CurrentGameStats.css'


class CurrentGameStats extends React.Component {
  render() {
    return (
      <div className="current-game-stats">
        {`NS: ${this.props.tricks_won.NS}, EW: ${this.props.tricks_won.EW}, `}
        {`Contract: ${this.props.contract.level}${this.props.contract.suit} by ${this.props.contract.declarer}`}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
    tricks_won: state.tricks_won,
  }
}
export default connect(mapStateToProps)(CurrentGameStats);
