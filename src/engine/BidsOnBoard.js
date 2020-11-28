import React from 'react';

import {BID_TYPES, BID_UNICODE_MAP} from '../constants/Game'

import '../css/BidsOnBoard.css';

export default class BidsOnBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids_on_board: this.props.bids,
    }
  }

  bidToString(bid) {
    if (bid.type === BID_TYPES.SUIT) return `${bid.level}${BID_UNICODE_MAP[bid.suit]}`;
    else return BID_UNICODE_MAP[bid.type];
  }

  render() {
    const bids_list = this.props.bids.map((bid_play, idx) => {
      return (
        <div className="bid" key={idx}>
          {this.bidToString(bid_play.bid)}
        </div>
      );
    });
    return (
      <div className="bids-on-board-container">
        {bids_list}
      </div>
    )
  }
};
