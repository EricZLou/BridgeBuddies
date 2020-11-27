import React from 'react'

import {BID_LEVELS, BID_SUITS, BID_SUIT_UNICODE_MAP, BID_OTHERS} from '../constants/Game'

import '../css/Style.css'
import '../css/BiddingBox.css'

export default class BiddingBox extends React.Component {
  render() {
    const BID_SUIT_LIST = [BID_SUITS.CLUBS, BID_SUITS.DIAMONDS, BID_SUITS.HEARTS,
      BID_SUITS.SPADES, BID_SUITS.NOTRUMP];
    let suit_bids = [];
    for (let level of BID_LEVELS) {
      suit_bids.push(
        <div className="row" key={level}>
          {BID_SUIT_LIST.map((suit, idx) => {
            return <div className={"bid " + suit} key={idx}>{level}{BID_SUIT_UNICODE_MAP[suit]}</div>
          })}
        </div>
      );
    }
    let other_bids = [];
    for (var other in BID_OTHERS) {
      other_bids.push(
        <div className={"bid " + other} key={other}>
          {BID_OTHERS[other]}
        </div>
      )
    }

    return (
      <div className="bidding-box">
        <div className="suit-bids">{suit_bids}</div>
        <div className="other-bids">{other_bids}</div>
      </div>
    );
  }
};
