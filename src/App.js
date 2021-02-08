import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import {connect} from 'react-redux'

import GameScreenDaily from "./screens/GameScreenDaily"
import GameScreenOnline from "./screens/GameScreenOnline"
import GameScreenRobot from "./screens/GameScreenRobot"
import HomeScreen from "./screens/HomeScreen"
import LogInScreen from "./screens/LogInScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SettingsScreen from "./screens/SettingsScreen"
import StoreScreen from "./screens/StoreScreen"
import TablesScreen from "./screens/TablesScreen"

import {GAMETYPES} from "./constants/GameEngine"


class App extends React.Component {
  render() {
    if (!this.props.userID) return (
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
          <Route path="/tables"> <TablesScreen/> </Route>
          <Route path="/game" render={(props) => {
            switch (props.location.state.type) {
              case GAMETYPES.ONLINE:
                return <GameScreenOnline/>
              case GAMETYPES.DAILY:
                return <GameScreenDaily
                         date_str={props.location.state.date_str}
                       />
              default:
                return <GameScreenRobot/>
            }
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
    userID: state.userID,
  }
}
export default connect(mapStateToProps)(App);
