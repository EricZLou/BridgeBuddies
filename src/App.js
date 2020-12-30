import React from 'react'
import {
  BrowserRouter,
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

import {GAMETYPES} from "./constants/GameEngine"


class App extends React.Component {
  render() {
    if (!this.props.homeScreenReady) return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login"> <LogInScreen/> </Route>
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    );
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <HomeScreen/> </Route>
          <Route path="/store"> <StoreScreen/> </Route>
          <Route path="/game" render={(props) => {
            if (props.location.state.type === GAMETYPES.ONLINE) return <GameScreenOnline/>
            return <GameScreenRobot/>
          }}/>
          <Route path="/me"> <ProfileScreen/> </Route>
          <Route path="/settings"> <SettingsScreen/> </Route>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    homeScreenReady: state.homeScreenReady,
  }
}
export default connect(mapStateToProps)(App);
