import React from 'react'

import '../css/BidsOnBoard.css'

const {BID_TYPES, BID_UNICODE_MAP, SEATS} = require('../constants/GameEngine');

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
    let bid_rows = [];
    if (this.props.bids.length > 0) {
      const opening_bidder = this.props.bids[0].seat;
      let extra_spaces = 0;
      if (opening_bidder === SEATS.NORTH) extra_spaces = 1;
      else if (opening_bidder === SEATS.EAST) extra_spaces = 2;
      else if (opening_bidder === SEATS.SOUTH) extra_spaces = 3;
      let current_row = [];
      for (let i = 0; i < extra_spaces; i++) {
        current_row.push(<td key={"extra"+i}/>);
      }
      for (let idx in this.props.bids) {
        const bid = this.props.bids[idx];
        current_row.push(<td key={idx}>{this.bidToString(bid.bid)}</td>);
        if (bid.seat === SEATS.SOUTH) {
          bid_rows.push(<tr key={"row"+idx}>{current_row}</tr>);
          current_row = [];
        }
      }
      if (current_row.length > 0) bid_rows.push(<tr key={"last"}>{current_row}</tr>);
    }
    return (
      <div className="bids-on-board-container">
        <table>
          <tbody>
            <tr>
              <th>West</th>
              <th>North</th>
              <th>East</th>
              <th>South</th>
            </tr>
            {bid_rows}
          </tbody>
        </table>
      </div>
    )
  }
};
