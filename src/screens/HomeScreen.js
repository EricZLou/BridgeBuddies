import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../components/Header'

import '../css/Style.css';
import '../css/HomeScreen.css';

import store_image from '../media/buttons/store.png';
import cover from '../media/cover.png';

class HomeScreen extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="body-container">
          <div className="main-nav">
            <div className="container">
              <Link to="/game" ><button>PLAY</button></Link>
              <Link to="/store" ><button>DAILY CHALLENGE</button></Link>
              <Link to="/store" ><button>TOURNAMENTS</button></Link>
              <Link to="/store" ><button>LEADERBOARDS</button></Link>
            </div>
          </div>
          <div className="mid-space">
            <img src={cover} alt="Characters" className="characters"/>
          </div>
          <div className="side-nav">
            <div className="container">
              <div className="title">MY FRIENDS</div>
              <hr className="hr-black"/>
              <div className="friends">{`Hello ${this.props.userDetails.first_name}!`}</div>
            </div>
            <Link to="/store" className="store-link">
              <img src={store_image} alt="Store" className="store"/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    userID: state.userID,
    userDetails: state.userDetails,
  }
}
export default connect(mapStateToProps)(HomeScreen);
