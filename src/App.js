import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import {connect} from 'react-redux'


import ComingSoonScreen from "./screens/ComingSoonScreen"
import GameScreen from "./screens/GameScreen"
import HomeScreen from "./screens/HomeScreen"
import LogInScreen from "./screens/LogInScreen"
import StoreScreen from "./screens/StoreScreen"

class App extends React.Component {
  render() {
    const COMING_SOON = false;
    if (COMING_SOON) return <ComingSoonScreen/>;
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
