import React from 'react'
import {connect} from 'react-redux'

import BidsOnBoard from '../engine/BidsOnBoard'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import GenPlayer from '../engine/players/GenPlayer'
import HeaderGame from '../components/HeaderGame'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {
  isBiddingComplete, getContract
} from '../engine/managers/BridgeGameEngine'
import {
  getNextPlayer, getPrevPlayer, getPartner
} from '../engine/utils/GameScreenUtils'
import {
  clearCardsOnBoard, finishBidding, finishPlaying
} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/GameScreen.css'

import table from '../media/store/tables/green2.jpg'

import {GAMESTATES, GAMETYPES} from '../constants/GameEngine'


class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.me = this.props.me;
  }

  componentDidUpdate() {
    if (this.props.game_state === GAMESTATES.BIDDING) {
      if (isBiddingComplete(this.props.bid_history)) {
        const contract = getContract(this.props.bid_history);
        if (contract.suit === 'pass')
          this.props.dispatch(finishPlaying());
        else
          this.props.dispatch(finishBidding(getContract(this.props.bid_history)));
      }
    }
  }

  handleClearCardsEvent = (e) => {
    if (this.props.cards_on_board.length === 4) {
      this.props.dispatch(clearCardsOnBoard());
    }
    if (this.props.tricks_won.NS + this.props.tricks_won.EW === 13) {
      this.props.dispatch(finishPlaying());
    }
  }

  render() {
    const partner = getPartner(this.me);
    const next_player = getNextPlayer(this.me);
    const prev_player = getPrevPlayer(this.me);

    // const PartnerPlayerType = this.props.player_types[partner];
    // const NextPlayerType = this.props.player_types[next_player];
    // const PrevPlayerType = this.props.player_types[prev_player];
    // const MyPlayerType = this.props.player_types[this.me];

    return (
      <div>
        <HeaderGame/>
        <img src={table} alt="table" className="table-image"/>

        {(this.props.game_state === GAMESTATES.BIDDING ||
          this.props.game_state === GAMESTATES.PLAYING) &&
          <div className="game-container" onMouseUp={this.handleClearCardsEvent}>

            <div className="top">
              <div className="left"/>
              <div className="middle">
                <div className="game-player">
                  <GenPlayer
                    seat={partner}
                    name={this.props.players[partner]}
                    visible={partner === this.props.dummy && this.props.first_card_played}
                    clickable={partner === this.props.dummy && this.props.first_card_played}
                  />
                </div>
              </div>
              <div className="right"/>
            </div>

            <div className="middle">
              <div className="left">
                <div className="game-player">
                  <GenPlayer
                    seat={next_player}
                    name={this.props.players[next_player]}
                    visible={next_player === this.props.dummy && this.props.first_card_played}
                    clickable={false}
                  />
                </div>
              </div>
              <div className="middle">
                {this.props.game_state === GAMESTATES.BIDDING &&
                  <BidsOnBoard/>
                }
                {this.props.game_state === GAMESTATES.PLAYING &&
                  <CardsOnBoard me={this.me} cards_on_board={this.props.cards_on_board}/>
                }
              </div>
              <div className="right">
                <div className="game-player">
                  <GenPlayer
                    seat={prev_player}
                    name={this.props.players[prev_player]}
                    visible={prev_player === this.props.dummy && this.props.first_card_played}
                    clickable={false}
                  />
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="left"/>
              <div className="middle">
                <div className="game-player">
                  <GenPlayer
                    seat={this.me}
                    name={this.props.players[this.me]}
                    visible={true}
                    clickable={this.me !== this.props.dummy}
                  />
                </div>
              </div>
              <div className="right">
                {(this.props.game_state === GAMESTATES.PLAYING) &&
                  <div className="current-game-stats-container">
                    <CurrentGameStats
                      contract={this.props.contract}
                      tricks_won={this.props.tricks_won}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {(this.props.game_state === GAMESTATES.RESULTS) &&
          <ScoreSubScreen
            me={this.me}
            online={this.props.online}
            tricks_won={this.props.tricks_won}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards_on_board: state.cards_on_board,
    contract: state.contract,
    dummy: state.dummy,
    first_card_played: state.first_card_played,
    online: (state.game_info.game_type === GAMETYPES.ONLINE ? true : false),
    game_state: state.game_state,
    player_types: state.player_types,
    tricks_won: state.tricks_won,
  }
}
export default connect(mapStateToProps)(GameScreen);
