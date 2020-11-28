import React from 'react';

import '../css/CurrentGameStats.css';

export default class CurrentGameStats extends React.Component {
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
