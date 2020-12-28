import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import {connect} from 'react-redux'

import GameScreenOnline from "./screens/GameScreenOnline"
import GameScreenRobot from "./screens/GameScreenRobot"
import HomeScreen from "./screens/HomeScreen"
import LogInScreen from "./screens/LogInScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SettingsScreen from "./screens/SettingsScreen"
import StoreScreen from "./screens/StoreScreen"

import {GAME_TYPES} from "./constants/GameEngine"


class App extends React.Component {
  render() {
    if (!this.props.homeScreenReady) return (
      <Router>
        <Switch>
          <Route exact path="/login"> <LogInScreen/> </Route>
          <Redirect to="/login"/>
        </Switch>
      </Router>
    );
    return (
      <Router>
        <Switch>
          <Route exact path="/"> <HomeScreen/> </Route>
          <Route path="/store"> <StoreScreen/> </Route>
          <Route path="/game" render={(props) => {
            if (props.location.state.type === GAME_TYPES.ONLINE) return <GameScreenOnline/>
            return <GameScreenRobot/>
          }}/>
          <Route path="/me"> <ProfileScreen/> </Route>
          <Route path="/settings"> <SettingsScreen/> </Route>
          <Redirect to="/"/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    homeScreenReady: state.homeScreenReady,
  }
}
export default connect(mapStateToProps)(App);
