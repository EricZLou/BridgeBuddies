import React from 'react'
import {connect} from 'react-redux'

import BidsOnBoard from '../engine/BidsOnBoard'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import HeaderGame from '../components/HeaderGame'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {game_engine} from '../engine/managers/BridgeGameEngine'
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

  componentDidMount() {
    game_engine.reset();
  }

  handleClearCardsEvent = (e) => {
    if (game_engine.isTrickOver()) {
      game_engine.clearTrick();
      this.props.dispatch(clearCardsOnBoard());
      this.props.dispatch(setReadyToPlay(true));
    }
    if (game_engine.isGameOver()) {
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
                  {partner === game_engine.dummy && this.props.first_card_played &&
                    <this.props.PlayerType
                      seat={partner}
                      name={this.props.players[partner]}
                      visible={partner === game_engine.dummy && this.props.first_card_played}
                      clickable={partner === game_engine.dummy && this.props.first_card_played}
                    />
                  }
                  {!(partner === game_engine.dummy && this.props.first_card_played) &&
                    <this.props.OpponentType
                      seat={partner}
                      name={this.props.players[partner]}
                      visible={partner === game_engine.dummy && this.props.first_card_played}
                      clickable={partner === game_engine.dummy && this.props.first_card_played}
                    />
                  }
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
                    visible={next_player === game_engine.dummy && this.props.first_card_played}
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
                    visible={prev_player === game_engine.dummy && this.props.first_card_played}
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
                    clickable={this.me !== game_engine.dummy}
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
    first_card_played: state.first_card_played,
    game_state: state.game_state,
  }
}
export default connect(mapStateToProps)(GameScreen);
