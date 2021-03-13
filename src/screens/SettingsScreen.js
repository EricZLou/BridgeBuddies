import React from 'react'
import {connect} from 'react-redux'
import {Firebase} from '../Firebase'

import {setUserSettings} from '../redux/actions/Core'

import '../css/PopUp.css'
import '../css/SettingsScreen.css'
import '../css/Style.css'


const VIEWS = {
  SETTINGS: "SETTINGS",
  CONTRIBUTORS: "CONTRIBUTORS",
}

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEWS.SETTINGS,
    };
    this.onShowContributorsClick = this.onShowContributorsClick.bind(this);
    this.onShowSettingsClick = this.onShowSettingsClick.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  onShowContributorsClick() {
    this.setState({view: VIEWS.CONTRIBUTORS});
  }
  onShowSettingsClick() {
    this.setState({view: VIEWS.SETTINGS});
  }

  render() {
    return (
      <div>{this.state.view === VIEWS.SETTINGS &&
        <div className="pop-up-container"><div className="pop-up">
          <div
            className="pop-up-X"
            onClick={this.props.onCloseSettings}
          >&#10006;</div>
          <div className="settings-title">SETTINGS</div>
          <div className="settings-items">
            {/* SOUNDS*/}
            <div className="settings-item">
              <div className="settings-item-name">Sounds</div>
              <div
                className={
                  "settings-item-button clicky-button small " +
                  (this.props.user_settings.sounds ? "on" : "off")
                }
                onClick={() => {
                  const new_user_settings = {
                    ...this.props.user_settings, sounds: !this.props.user_settings.sounds
                  };
                  Firebase.database().ref(this.props.user_settings_path).set(
                    new_user_settings
                  ).then(() => {
                    this.props.dispatch(setUserSettings(new_user_settings));
                  });
                }}
              >{
                this.props.user_settings.sounds ? "ON" : "OFF"
              }</div>
            </div>
          </div>
          <div className="settings-credits" onClick={this.onShowContributorsClick}>
            Bridge Buddies thanks our contributors <div className="settings-arrow">&#xbb;</div>
          </div>
        </div></div>
      }
      {this.state.view === VIEWS.CONTRIBUTORS &&
        <div className="pop-up-container"><div className="pop-up">
          <div
            className="pop-up-X"
            onClick={this.props.onCloseSettings}
          >&#10006;</div>
          <div className="settings-title">CONTRIBUTORS</div>
          <div className="settings-items">
            <div className="credits-item">
              <div className="credits-name">Sreya Das</div>
              <div className="credits-area">For the character artwork</div>
            </div>
          </div>
          <div className="settings-credits" onClick={this.onShowSettingsClick}>
            Return to settings <div className="settings-arrow">&#xbb;</div>
          </div>
        </div></div>
      }</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    user_settings: state.userSettings,
    user_settings_path: state.firebasePaths.settings,
  }
}
export default connect(mapStateToProps)(SettingsScreen);
