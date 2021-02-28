import React from 'react'
import {connect} from 'react-redux'

import Firebase from '../Firebase'

import {setUserSettings} from '../redux/actions/Core'

import '../css/PopUp.css'
import '../css/Style.css'
import '../css/SettingsScreen.css'


class SettingsScreen extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-sky');
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  render() {
    return (
      <div className="pop-up-container"><div className="pop-up">
        <div
          className="pop-up-X"
          onClick={this.props.onCloseSettings}
        >&#10006;</div>
        <div className="settings-title">SETTINGS</div>
        <div className="settings-items">
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
      </div></div>
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
