import React from 'react';
import {connect} from 'react-redux'

import Header from '../components/Header'
import LoadingScreen from './LoadingScreen'

import '../css/Style.css';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
    this.waitForDataToLoad = this.waitForDataToLoad.bind(this);
  }

  componentDidMount() {
    if (this.dataLoaded()) this.setState({ready: true});
    else this.interval = setInterval(this.waitForDataToLoad, 500);
  }

  dataLoaded() {
    if (this.props.storeActive !== undefined &&
        this.props.first_name !== "" &&
        this.props.coins !== "" &&
        this.props.exp !== "" &&
        this.props.level !== ""
    ) return true;
    return false;
  }

  waitForDataToLoad() {
    if (this.dataLoaded()) {
      clearInterval(this.interval);
      this.setState({ready: true});
    }
  }

  render() {
    return (<div>
      {!this.state.ready && <LoadingScreen/>}
      {this.state.ready &&
        <div>
          <Header/>
          profile page!
        </div>
      }</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    userDetails: state.userDetails,
    storeActive: state.storeActive,
    first_name: state.userDetails.first_name,
    coins: state.coins,
    exp: state.exp,
    level: state.level_idx,
  }
}
export default connect(mapStateToProps)(ProfileScreen);
