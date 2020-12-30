import React from 'react'
import {connect} from 'react-redux'

import BidsOnBoard from '../engine/BidsOnBoard'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import HeaderGame from '../components/HeaderGame'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {getNextPlayer, getPrevPlayer, getPartner} from '../engine/utils/GameScreenUtils'
import {clearCardsOnBoard, finishPlaying, setReadyToPlay} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/GameScreen.css'

import table from '../media/store/tables/green2.jpg'

import {GAMESTATES} from '../constants/GameEngine'


class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.me = this.props.me;
  }

  handleClearCardsEvent = (e) => {
    if (this.props.cards_on_board.length === 4) {
      this.props.dispatch(clearCardsOnBoard());
      this.props.dispatch(setReadyToPlay(true));
    }
    if (this.props.tricks_played === 13) {
      this.props.dispatch(finishPlaying());
    }
  }

  render() {
    const partner = getPartner(this.me);
    const next_player = getNextPlayer(this.me);
    const prev_player = getPrevPlayer(this.me);

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
                  <this.props.OpponentType
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
                  <this.props.OpponentType
                    seat={next_player}
                    name={this.props.players[next_player]}
                    visible={next_player === this.props.dummy && this.props.first_card_played}
                    clickable={false}
                  />
                </div>
              </div>
              <div className="middle">
                {this.props.game_state === GAMESTATES.BIDDING && <BidsOnBoard/>}
                {this.props.game_state === GAMESTATES.PLAYING &&
                  <CardsOnBoard me={this.me}/>
                }
              </div>
              <div className="right">
                <div className="game-player">
                  <this.props.OpponentType
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
                  <this.props.PlayerType
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
                    <CurrentGameStats/>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {(this.props.game_state === GAMESTATES.RESULTS) &&
          <ScoreSubScreen/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cards_on_board: state.cards_on_board,
    dummy: state.dummy,
    first_card_played: state.first_card_played,
    game_state: state.game_state,
    tricks_played: state.tricks_won.NS + state.tricks_won.EW,
  }
}
export default connect(mapStateToProps)(GameScreen);
