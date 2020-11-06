import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header'

import '../css/Style.css';
import '../css/HomeScreen.css';

import store_image from '../media/buttons/store.png';
import cover from '../media/cover.png';

export default function HomeScreen() {
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
          </div>
          <Link to="/store" >
            <img src={store_image} alt="Store" className="store"/>
          </Link>
        </div>
      </div>
    </div>
  );
};
