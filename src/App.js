import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import {connect} from 'react-redux'


import GameScreen from "./screens/GameScreen"
import HomeScreen from "./screens/HomeScreen"
import LogInScreen from "./screens/LogInScreen"
import StoreScreen from "./screens/StoreScreen"
import LoadingScreen from "./screens/LoadingScreen"

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
          <Route path="/game"> <GameScreen/> </Route>
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
