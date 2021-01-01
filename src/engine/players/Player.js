import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../BiddingBox'
import Hand from '../Hand'
import PlayerTitle from '../../components/PlayerTitle'

import '../../css/Player.css'

import {GAMESTATES} from '../../constants/GameEngine'


class Player extends React.Component {
  render() {
    return (
      <div>
        <Hand
          cards={this.props.cards}
          seat={this.props.seat}
          handleCardPlay={this.props.handleCardPlay}
          visible={this.props.visible}
          clickable={this.props.clickable}
        />
        <div className="player-title">
          <PlayerTitle
            seat={this.props.seat}
            name={this.props.name}
            curr_player={this.props.curr_player}
          />
        </div>
        {this.props.game_state === GAMESTATES.BIDDING &&
          this.props.curr_player === this.props.seat &&
          this.props.show_bidding_box &&
          <div className="bidding-box-container">
            <BiddingBox handleBidPlay={this.props.handleBidPlay}/>
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    curr_player: state.curr_player,
    game_state: state.game_state,
  }
}
export default connect(mapStateToProps)(Player);
